import { Injectable } from '@nestjs/common';
import { PrismaService } from '@crm/shared';

@Injectable()
export class AiAssistantService {
  constructor(private readonly prisma: PrismaService) {}

  async getSuggestions(entity: string, entityId: string, tenantId: string) {
    if (entity === 'lead' || entity === 'deal') {
      return this.getLeadSuggestions(entityId, tenantId);
    }
    return [];
  }

  private async getLeadSuggestions(leadId: string, tenantId: string) {
    const lead = await this.prisma.lead.findFirst({
      where: { id: leadId, tenantId },
    });
    if (!lead) return [];

    const stages = await this.prisma.pipelineStage.findMany({
      where: { tenantId },
      orderBy: { order: 'asc' },
    });

    const currentIdx = stages.findIndex((s) => s.name === lead.status);
    const nextStage = stages[currentIdx + 1];

    const suggestions: { action: string; reason: string; category: string }[] = [];

    if (nextStage) {
      suggestions.push({
        action: `Mover a etapa "${nextStage.name}"`,
        reason: `La oportunidad "${lead.name}" está lista para avanzar en el pipeline`,
        category: 'pipeline',
      });
    }

    const lastActivity = await this.prisma.activity.findFirst({
      where: { leadId, tenantId },
      orderBy: { createdAt: 'desc' },
    });

    if (!lastActivity || this.daysSince(lastActivity.createdAt) > 7) {
      suggestions.push({
        action: 'Agendar seguimiento',
        reason: 'No hay actividad registrada en los últimos 7 días',
        category: 'engagement',
      });
    }

    if (lead.email) {
      suggestions.push({
        action: `Enviar correo a ${lead.name}`,
        reason: 'Mantener contacto con el cliente para avanzar la negociación',
        category: 'communication',
      });
    }

    return suggestions;
  }

  async summarizeNote(content: string): Promise<string> {
    const lines = content.split('\n').filter(Boolean);
    if (lines.length <= 3) return content;
    const first = lines[0];
    const keywords = content.match(/\b(acordó|decidió|próximo|pendiente|fecha|entregar|cobrar|pagar|reunión|llamada|seguimiento)\b/gi) || [];
    const keywordStr = keywords.length > 0 ? `Palabras clave: ${[...new Set(keywords)].slice(0, 5).join(', ')}` : '';
    return `${first}\n\n${keywordStr}\n\nLíneas: ${lines.length} | Resumen automático generado.`;
  }

  private daysSince(date: Date): number {
    return Math.floor((Date.now() - date.getTime()) / 86400000);
  }
}
