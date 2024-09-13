import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { S3 } from 'aws-sdk';

interface UploadPublicFile {
  dataBuffer: Buffer;
  filename: string;
  prefix?: string;
  hideWithUuid: boolean;
}
export interface FileUploadedData {
  ETag: string;
  Location: string;
  key: string;
  Key: string;
  Bucket: string;
}

@Injectable()
export class StorageS3Service {
  private accessKeyId;
  private bucketName;
  private secretKey;
  private endpoint;
  constructor(private readonly configService: ConfigService) {
    this.endpoint = this.configService.get('storage.s3.endpoint');
    this.bucketName = this.configService.get('storage.s3.bucketName');
    this.accessKeyId = this.configService.get('storage.s3.accessKeyId');
    this.secretKey = this.configService.get('storage.s3.secretKey');
  }

  async uploadPublicFile(params: UploadPublicFile): Promise<FileUploadedData> {
    const s3 = new S3({
      endpoint: this.endpoint,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretKey,
      },
    });
    const cleanPrefix = params.prefix
      ? (params.prefix?.replace('/', '') ?? '') + '/'
      : '';
    const createUri = params.hideWithUuid
      ? `${cleanPrefix}${params.filename}/${randomUUID()}/${params.filename}`
      : params.filename;

    console.log('createUri', createUri);
    const res = await s3
      .upload({
        Bucket: this.bucketName,
        Body: params.dataBuffer,
        Key: createUri,
        ACL: 'public-read',
      })
      .promise();
    return res as FileUploadedData;
  }
}
