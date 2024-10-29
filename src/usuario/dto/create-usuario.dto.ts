import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'O nome é obrigatório!' })
  @IsString({ message: 'O nome precisa ser um texto!' })
  nome: string;

  @IsNotEmpty({ message: 'O email é obrigatório!' })
  @IsEmail({}, { message: 'O email é inválido!' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatório!' })
  @IsString({ message: 'A senha precisa ser um texto!' })
  @Length(3, 10, { message: 'A senha deve conter entre 3 e 10 caracteres' })
  senha: string;
}
