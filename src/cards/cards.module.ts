import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardRepository } from './card.repository';
import { AwsS3Module } from 'src/aws/aws-s3.module';

@Module({
  imports: [AwsS3Module],
  controllers: [CardsController],
  providers: [CardsService, CardRepository],
})
export class CardsModule {}
