import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.prismaService.user.create({ data: createUserDto });
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
    return this.prismaService.user.update({
      where: { id: id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.user.delete({ where: { id: id } });
  }
}
