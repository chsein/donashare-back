import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Card } from './card.entity';
import { CreateCardDto } from './dto/createCard.dto';

@Injectable()
export class CardRepository extends Repository<Card> {
  constructor(dataSource: DataSource) {
    super(Card, dataSource.createEntityManager());
  }

  async createCard(createCardDto: CreateCardDto) {
    const { imgUrl, title, memo } = createCardDto;

    const card = this.create({
      imgUrl,
      title,
      memo,
    });
    await this.save(card);
    return card;
  }
}
