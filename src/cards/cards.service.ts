import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardRepository } from './card.repository';
import { CreateCardDto } from './dto/createCard.dto';
import { Card } from './card.entity';
import { GetAllCardDto } from './dto/getAllCards.dto';
import { GetPresignedUrlDto } from './dto/getPresignedUrl.dto';
import { AwsS3Service } from 'src/aws/aws-s3.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardRepository)
    private cardRepository: CardRepository,
    private readonly awsS3Service: AwsS3Service,
  ) {}

  async getAllCards(): Promise<GetAllCardDto[]> {
    return this.cardRepository.find();
  }

  async createCard(createCardDto: CreateCardDto): Promise<CreateCardDto> {
    return this.cardRepository.createCard(createCardDto);
  }

  async getPresignedUrl(
    getPresignedUrlDto: GetPresignedUrlDto,
  ): Promise<string> {
    const signedUrl = await this.awsS3Service.getSignedUrl(getPresignedUrlDto);
    return signedUrl;
  }
}
