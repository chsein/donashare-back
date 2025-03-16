import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetPresignedUrlDto } from 'src/cards/dto/getPresignedUrl.dto';

@Injectable()
export class AwsS3Service {
  constructor(
    @Inject('S3_CLIENT')
    private readonly s3Client: S3Client,
    private readonly configService: ConfigService,
  ) {}

  // presignedUrl을 발급받는 함수
  // Dto에 담겨야할 것들 - fileName, contentType -> 선택사항이다. 솔직히 필요없다.
  async getSignedUrl(getPresignedUrlDto: GetPresignedUrlDto): Promise<string> {
    // 저장될 파일 이름 - 해당 presigned url로 업로드한 파일은 모두 해당 파일명으로 저장된다.
    // 같은 presigned url로 여러번 업로드해도 마지막에 등록한 파일 1개만 업로드된다.
    // fileName = `profile/image/${fileName}`; 과 같이 등록하면 버킷의 profile폴더의 image폴더 안에 파일이 저장된다.
    // 폴더가 없으면 만들어준다.
    const fileName = `${Date.now()}${getPresignedUrlDto.fileName}`;

    // Put. 즉, s3에 데이터를 집어넣는 작업에 대한 url 생성
    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_BUCKET'),
      Key: fileName,
    });

    // Expires 속성 대신, 여기다가 expiresIn 속성을 사용해주자.
    const signedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: 60, // seconds
    });

    return signedUrl;
  }
}
