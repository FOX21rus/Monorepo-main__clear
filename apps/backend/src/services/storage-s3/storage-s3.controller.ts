import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageS3Service } from './storage-s3.service';

@Controller('api')
export class StorageS3Controller {
  constructor(private readonly storageS3Service: StorageS3Service) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log('StorageS3Controller', file);
    return this.storageS3Service.uploadPublicFile({
      dataBuffer: file.buffer,
      filename: file.originalname,
      hideWithUuid: false,
    });
  }

  // @Post('/resize')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadAndResize(@UploadedFile() file: Express.Multer.File) {
  //     return this.storageS3Service.uploadPublicFile(
  //         file.buffer,
  //         file.originalname,
  //         false,
  //         true,
  //     );
  // }
}
