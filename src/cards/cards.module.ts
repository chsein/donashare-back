import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardRepository } from './card.repository';

@Module({
  controllers: [CardsController],
  providers: [CardsService, CardRepository],
})
export class CardsModule {}
