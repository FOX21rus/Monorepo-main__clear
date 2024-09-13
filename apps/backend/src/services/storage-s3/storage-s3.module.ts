import { Module } from '@nestjs/common';
import { StorageS3Service } from './storage-s3.service';
import { StorageS3Controller } from './storage-s3.controller';
import { StorageS3Resolver } from './storage-s3.resolver';

@Module({
  providers: [StorageS3Service, StorageS3Resolver],
  controllers: [StorageS3Controller],
  exports: [StorageS3Service],
})
export class StorageS3Module {}
