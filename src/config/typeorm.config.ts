import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'chltpdls',
  database: 'card-DB',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
