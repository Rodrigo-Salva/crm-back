import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UploadsService {
  private uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');

  constructor(private readonly prisma: PrismaService) {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async upload(file: Express.Multer.File, entity: string, entityId: string, userId: string, tenantId: string) {
    const fileName = `${uuid()}${path.extname(file.originalname)}`;
    const filePath = path.join(this.uploadDir, fileName);
    fs.writeFileSync(filePath, file.buffer);

    return this.prisma.fileAttachment.create({
      data: {
        fileName,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        entity,
        entityId,
        uploadedById: userId,
        tenantId,
      },
    });
  }

  async findByEntity(entity: string, entityId: string, tenantId: string) {
    return this.prisma.fileAttachment.findMany({
      where: { entity, entityId, tenantId },
      include: { uploadedBy: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getFile(id: string, tenantId: string) {
    const file = await this.prisma.fileAttachment.findFirst({
      where: { id, tenantId },
    });
    if (!file) throw new NotFoundException('File not found');
    const filePath = path.join(this.uploadDir, file.fileName);
    if (!fs.existsSync(filePath)) throw new NotFoundException('File not found on disk');
    return { file, stream: fs.createReadStream(filePath) };
  }

  async remove(id: string, tenantId: string) {
    const file = await this.prisma.fileAttachment.findFirst({
      where: { id, tenantId },
    });
    if (!file) throw new NotFoundException('File not found');

    const filePath = path.join(this.uploadDir, file.fileName);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    return this.prisma.fileAttachment.delete({ where: { id } });
  }
}
