import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardRepository } from './card.repository';
import { CreateCardDto } from './dto/createCard.dto';
import { Card } from './card.entity';
import { GetAllCardDto } from './dto/getAllCards.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardRepository)
    private cardRepository: CardRepository,
  ) {}

  async getAllCards(): Promise<GetAllCardDto[]> {
    return this.cardRepository.find();
  }

  async createCard(createCardDto: CreateCardDto): Promise<CreateCardDto> {
    return this.cardRepository.createCard(createCardDto);
  }
}
