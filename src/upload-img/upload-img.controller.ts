import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadImgService } from './upload-img.service';

@Controller('upload')
export class UploadImgController {
  @Post('')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, callback) => {
          const filename = `${Date.now()}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File) {
    console.log('Received file:', file);
    const fileUrl = `http://localhost:5000/uploads/${file.filename}`;
    console.log('Generated file URL:', fileUrl);
    return { fileUrl }; // 클라이언트에게 이미지 URL 반환
  }
}
