import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@crm/shared';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const SAFE_SELECT = {
  id: true,
  email: true,
  name: true,
  avatar: true,
  role: true,
  tenantId: true,
  isTwoFactorEnabled: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto, tenantId: string) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
        role: dto.role,
        tenantId,
      },
      select: SAFE_SELECT,
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.user.findMany({
      where: { tenantId },
      select: SAFE_SELECT,
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string, tenantId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, tenantId },
      select: SAFE_SELECT,
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto, tenantId: string) {
    await this.findById(id, tenantId);
    return this.prisma.user.update({
      where: { id },
      data: dto,
      select: SAFE_SELECT,
    });
  }

  async remove(id: string, tenantId: string, requestingUserId: string) {
    if (id === requestingUserId) {
      throw new BadRequestException('You cannot delete your own user');
    }
    await this.findById(id, tenantId);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  }
}
