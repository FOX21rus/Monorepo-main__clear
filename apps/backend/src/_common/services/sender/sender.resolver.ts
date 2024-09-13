import { Mutation, Resolver } from '@nestjs/graphql';
import { SenderService } from './sender.service';

@Resolver()
export class SenderResolver {
  constructor(private readonly mailerService: SenderService) {}
}
