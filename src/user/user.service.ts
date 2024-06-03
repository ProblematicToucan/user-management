import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const passwordHash = await hash(createUserDto.password);
    return this.prismaService.user.create({
      data: { ...createUserDto, password: passwordHash },
    });
  }

  async findAll(): Promise<UserEntity[] | []> {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number): Promise<UserEntity | null> {
    return this.prismaService.user.findUnique({ where: { id: id } });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) return null;

    const updateData: UpdateUserDto = {};
    if (updateUserDto.name) updateData.name = updateUserDto.name;
    if (updateUserDto.email) updateData.email = updateUserDto.email;
    if (updateUserDto.password)
      updateData.password = await hash(updateUserDto.password);

    return this.prismaService.user.update({
      where: { id: id },
      data: updateData,
    });
  }

  async remove(id: number): Promise<UserEntity | null> {
    return this.prismaService.user.delete({ where: { id: id } });
  }
}
