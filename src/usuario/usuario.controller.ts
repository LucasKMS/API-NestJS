import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private repo: UsuarioRepository) {}

  @Post()
  async criar(@Body() usuario: CreateUsuarioDto) {
    return await this.repo.criar(usuario);
  }

  @Patch(':id')
  async atualizar(@Param('id') id: string, @Body() usuario: UpdateUsuarioDto) {
    return await this.repo.atualizar(id, usuario);
  }

  @Get()
  async obterTodos() {
    return await this.repo.obterTodosUsuarios();
  }

  @Get('email/:email')
  async obterPorEmail(@Param('email') email: string) {
    return await this.repo.obterPorEmailRota(email);
  }

  @Get(':id')
  async obterPorId(@Param('id') id: string) {
    return await this.repo.obterPorId(+id);
  }

  @Delete(':id')
  async deletar(@Param('id') id: string) {
    await this.repo.deletar(+id);
  }
}
