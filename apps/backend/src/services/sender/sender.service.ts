import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

//SendBox credentials
// const config = {
//   client_id: '24a4ffa6cad2f9f997b473cd8b4f7ef4',
//   client_secret: 'c71de20c8bf6afb5461a135cf2264482',
//   grant_type: 'client_credentials',
// };

@Injectable()
export class SenderService {
  constructor(private readonly configService: ConfigService) {}

}
