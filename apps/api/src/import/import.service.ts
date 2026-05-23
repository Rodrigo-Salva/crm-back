import { Injectable } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import { Readable } from 'stream';
const csv = require('csv-parser');

@Injectable()
export class ImportService {
  constructor(private readonly prisma: PrismaService) {}

  async importContacts(buffer: Buffer, ownerId: string, tenantId: string) {
    const results: any[] = [];
    const errors: { row: number; message: string }[] = [];
    let rowIndex = 0;

    const stream = Readable.from(buffer.toString());
    const parser = stream.pipe(csv());

    for await (const row of parser) {
      rowIndex++;
      try {
        const contact = await this.prisma.contact.create({
          data: {
            name: row.name || row.Name || row.nombre || row.Nombre || '',
            email: row.email || row.Email || row.email || '',
            phone: row.phone || row.Phone || row.telefono || '',
            companyName: row.company || row.Company || row.empresa || '',
            position: row.position || row.Position || row.cargo || '',
            ownerId,
            tenantId,
          },
        });
        results.push(contact);
      } catch (err: any) {
        errors.push({ row: rowIndex, message: err.message });
      }
    }

    return { imported: results.length, errors, total: rowIndex };
  }

  async importCompanies(buffer: Buffer, ownerId: string, tenantId: string) {
    const results: any[] = [];
    const errors: { row: number; message: string }[] = [];
    let rowIndex = 0;

    const stream = Readable.from(buffer.toString());
    const parser = stream.pipe(csv());

    for await (const row of parser) {
      rowIndex++;
      try {
        const company = await this.prisma.company.create({
          data: {
            name: row.name || row.Name || row.nombre || row.Nombre || '',
            industry: row.industry || row.Industry || row.industria || '',
            website: row.website || row.Website || row.sitio || '',
            phone: row.phone || row.Phone || row.telefono || '',
            address: row.address || row.Address || row.direccion || '',
            ownerId,
            tenantId,
          },
        });
        results.push(company);
      } catch (err: any) {
        errors.push({ row: rowIndex, message: err.message });
      }
    }

    return { imported: results.length, errors, total: rowIndex };
  }

  async importDeals(buffer: Buffer, ownerId: string, tenantId: string) {
    const results: any[] = [];
    const errors: { row: number; message: string }[] = [];
    let rowIndex = 0;

    const stream = Readable.from(buffer.toString());
    const parser = stream.pipe(csv());

    for await (const row of parser) {
      rowIndex++;
      try {
        const deal = await this.prisma.deal.create({
          data: {
            title: row.title || row.Title || row.name || row.Name || '',
            value: parseFloat(row.value || row.Value || '0') || 0,
            stage: row.stage || row.Stage || 'lead',
            contactId: row.contactId || row.contact_id || '',
            ownerId,
            tenantId,
          },
        });
        results.push(deal);
      } catch (err: any) {
        errors.push({ row: rowIndex, message: err.message });
      }
    }

    return { imported: results.length, errors, total: rowIndex };
  }

  async importProducts(buffer: Buffer, _ownerId: string, tenantId: string) {
    const results: any[] = [];
    const errors: { row: number; message: string }[] = [];
    let rowIndex = 0;

    const stream = Readable.from(buffer.toString());
    const parser = stream.pipe(csv());

    for await (const row of parser) {
      rowIndex++;
      try {
        const product = await this.prisma.product.create({
          data: {
            name: row.name || row.Name || row.nombre || '',
            price: parseFloat(row.price || row.Price || row.precio || '0') || 0,
            description: row.description || row.Description || row.descripcion || '',
            category: row.category || row.Category || row.categoria || '',
            sku: row.sku || row.Sku || row.SKU || '',
            tenantId,
          },
        });
        results.push(product);
      } catch (err: any) {
        errors.push({ row: rowIndex, message: err.message });
      }
    }

    return { imported: results.length, errors, total: rowIndex };
  }
}
