import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

//PartialType pega tudo que tem no CreateUsuarioDto e deixa Opcional
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
