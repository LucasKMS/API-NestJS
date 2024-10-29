import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [UsuarioModule, DbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
