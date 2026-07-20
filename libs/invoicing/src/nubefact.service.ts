import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { UpsertNubefactConfigDto } from './dto/nubefact-config.dto';

const NUBEFACT_URL_PROD = 'https://api.nubefact.com/api/v1';
const NUBEFACT_URL_SANDBOX = 'https://demo-facturacion.nubefact.com/api/v1';

@Injectable()
export class NubefactService {
  private readonly logger = new Logger(NubefactService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getConfig(tenantId: string) {
    return this.prisma.nubefactConfig.findUnique({ where: { tenantId } });
  }

  async setConfig(dto: UpsertNubefactConfigDto, tenantId: string) {
    const existing = await this.getConfig(tenantId);
    if (!existing && !dto.token) {
      throw new BadRequestException('El token de Nubefact es requerido la primera vez');
    }

    const data: any = {
      ruc: dto.ruc,
      serieFactura: dto.serieFactura ?? 'F001',
      serieBoleta: dto.serieBoleta ?? 'B001',
      sandbox: dto.sandbox ?? true,
    };
    if (dto.token) data.token = dto.token;

    return this.prisma.nubefactConfig.upsert({
      where: { tenantId },
      create: { ...data, ruc: dto.ruc, token: dto.token!, tenantId },
      update: data,
    });
  }

  async issueInvoice(invoiceId: string, tenantId: string) {
    const invoice = await this.prisma.invoice.findFirst({
      where: { id: invoiceId, tenantId },
      include: {
        subscription: { include: { contract: { include: { lead: { include: { account: true } } } } } },
        quote: { include: { lead: { include: { account: true } }, items: true } },
      },
    });
    if (!invoice) return;

    const config = await this.getConfig(tenantId);
    if (!config) {
      await this.prisma.invoice.update({ where: { id: invoice.id }, data: { fiscalStatus: 'not_configured' } });
      return;
    }

    const lead = invoice.subscription?.contract?.lead ?? invoice.quote?.lead;
    const company = lead?.account;
    const isFactura = invoice.docType === 'factura' && !!company?.ruc;

    const items = invoice.quote?.items?.length
      ? invoice.quote.items.map((item) => ({
          unidad_de_medida: 'NIU',
          codigo: item.productId ?? 'ITEM',
          descripcion: item.description,
          cantidad: item.quantity,
          valor_unitario: item.unitPrice,
          precio_unitario: item.unitPrice,
          subtotal: item.total,
          tipo_de_igv: 1,
          igv: 0,
          total: item.total,
          anticipo_regularizacion: false,
        }))
      : [{
          unidad_de_medida: 'NIU',
          codigo: 'SERV',
          descripcion: `Servicio ${invoice.number}`,
          cantidad: 1,
          valor_unitario: invoice.amount,
          precio_unitario: invoice.amount,
          subtotal: invoice.amount,
          tipo_de_igv: 1,
          igv: 0,
          total: invoice.amount,
          anticipo_regularizacion: false,
        }];

    const payload = {
      operacion: 'generar_comprobante',
      tipo_de_comprobante: isFactura ? 1 : 2,
      serie: isFactura ? config.serieFactura : config.serieBoleta,
      numero: invoice.correlative ?? 1,
      sunat_transaction: 1,
      cliente_tipo_de_documento: isFactura ? 6 : 1,
      cliente_numero_de_documento: isFactura ? company?.ruc : '00000000',
      cliente_denominacion: company?.name ?? lead?.name ?? 'Cliente',
      fecha_de_emision: new Date().toISOString().slice(0, 10),
      moneda: invoice.currency === 'USD' ? 2 : 1,
      total: invoice.amount,
      items,
    };

    const baseUrl = config.sandbox ? NUBEFACT_URL_SANDBOX : NUBEFACT_URL_PROD;

    try {
      const res = await fetch(baseUrl, {
        method: 'POST',
        headers: { Authorization: `Token token=${config.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || data.errors) {
        await this.prisma.invoice.update({
          where: { id: invoice.id },
          data: { fiscalStatus: 'rejected', sunatResponse: JSON.stringify(data.errors ?? data) },
        });
        return;
      }

      await this.prisma.invoice.update({
        where: { id: invoice.id },
        data: {
          fiscalStatus: data.aceptada_por_sunat ? 'accepted' : 'pending',
          sunatResponse: data.sunat_description ?? null,
          pdfUrl: data.enlace_del_pdf ?? null,
          xmlUrl: data.enlace_del_xml ?? null,
          cdrUrl: data.enlace_del_cdr ?? null,
        },
      });
    } catch (err: any) {
      this.logger.error(`Nubefact issue error: ${err.message}`);
      await this.prisma.invoice.update({
        where: { id: invoice.id },
        data: { fiscalStatus: 'rejected', sunatResponse: err.message },
      });
    }
  }
}
