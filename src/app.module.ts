import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { TypeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadImgModule } from './upload-img/upload-img.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    CardsModule,
    UploadImgModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // 'uploads' 폴더를 정적 파일 제공 경로로 설정
      serveRoot: '/uploads', // '/uploads' 경로를 통해 파일에 접근
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
