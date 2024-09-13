import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrescoBaseModule } from './use-cases/cresco/cresco-base/cresco-base.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { CrescoMutationsModule } from './use-cases/resolvers/cresco/cresco-mutations/cresco-mutations.module';
import { CrescoAdminQueriesModule } from './use-cases/resolvers/cresco/cresco-admin-queries/cresco-admin-queries.module';
import { CrescoCustomerQueriesModule } from './use-cases/resolvers/cresco/cresco-customer-queries/cresco-customer-queries.module';
import { StorageS3Module } from './services/storage-s3/storage-s3.module';
import { HuobiModule } from './services/huobi/huobi.module';
import { AuthTelegramWebappModule } from './services/auth-telegram-webapp/auth-telegram-webapp.module';
import { AuthMutationsModule } from './use-cases/resolvers/common/auth-mutations/auth-mutations.module';
import { AuthQueriesModule } from './use-cases/resolvers/common/auth-queries/auth-queries.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CrescoGenerateReportCryptoModule } from './services/cresco-generate-report-crypto/cresco-generate-report-crypto.module';
import {BianceModule} from "./services/biance/biance.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CrescoBaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql', './**/*.gql'],
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql.ts'),
      //   outputAs: 'class',
      // },
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('db.mongo.connectionString'),
      }),
      inject: [ConfigService],
    }),

    CrescoMutationsModule,
    CrescoAdminQueriesModule,
    CrescoCustomerQueriesModule,
    StorageS3Module,
    HuobiModule,
    AuthMutationsModule,
    AuthQueriesModule,
    StorageS3Module,
    AuthTelegramWebappModule,
    CrescoGenerateReportCryptoModule,
      BianceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
