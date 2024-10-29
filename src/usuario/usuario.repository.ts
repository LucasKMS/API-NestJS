import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioRepository {
  constructor(private prismaService: PrismaService) {}

  async obterTodosUsuarios() {
    return this.prismaService.usuario.findMany();
  }

  async obterPorId(usuarioId: number) {
    const existeUsuario = await this.prismaService.usuario.findUnique({
      where: {
        id: usuarioId,
      },
    });

    if (!existeUsuario) throw new NotFoundException('Usuário não encontrado!');

    return existeUsuario;
  }

  async obterPorEmailRota(email: string) {
    const existeEmail = await this.prismaService.usuario.findUnique({
      where: {
        email,
      },
    });
    if (!existeEmail)
      throw new NotFoundException('Usuário com esse email não encontrado!');
    return existeEmail;
  }

  async obterPorEmail(email: string) {
    return await this.prismaService.usuario.findUnique({
      where: {
        email,
      },
    });
  }

  async criar(usuario: CreateUsuarioDto) {
    const userEmail = await this.obterPorEmail(usuario.email);

    if (userEmail)
      throw new ConflictException('Usuário com email já cadastrado!');

    return this.prismaService.usuario.create({
      data: usuario,
    });
  }

  async atualizar(usuarioId: string, usuario: UpdateUsuarioDto) {
    const existeUsuario = await this.obterPorId(+usuarioId);

    if (!existeUsuario) throw new NotFoundException('Usuário não encontrado!');

    if (usuario.email) {
      const userEmail = await this.prismaService.usuario.findUnique({
        where: { NOT: { id: +usuarioId }, email: usuario.email },
      });

      if (userEmail) throw new ConflictException('Email já está cadastrado!');
    }

    return this.prismaService.usuario.update({
      where: {
        id: +usuarioId,
      },
      data: usuario,
    });
  }

  async deletar(usuarioId: number) {
    const existeUsuario = await this.obterPorId(+usuarioId);

    if (!existeUsuario) throw new NotFoundException('Usuário não encontrado!');

    return this.prismaService.usuario.delete({
      where: {
        id: usuarioId,
      },
    });
  }
}
