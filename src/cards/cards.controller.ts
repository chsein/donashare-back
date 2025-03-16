import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { Card } from './card.entity';
import { CreateCardDto } from './dto/createCard.dto';
import { create } from 'domain';
import { GetAllCardDto } from './dto/getAllCards.dto';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}
  private logger: Logger = new Logger('CardsController');

  @Get()
  getAllCards(): Promise<GetAllCardDto[]> {
    return this.cardsService.getAllCards();
  }

  @Post('/post')
  createCard(@Body() createCardDto: CreateCardDto): Promise<CreateCardDto> {
    return this.cardsService.createCard(createCardDto);
  }
}
