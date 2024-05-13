import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { Deal } from './entities/deal.entity';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal) private readonly dealsRepository: Repository<Deal>,
  ) {}
  storage = new Storage();

  async createDeal(
    createDealDto: CreateDealDto,
    file: Express.Multer.File,
  ): Promise<Deal> {
    const deal: Deal = new Deal();

    deal.name = createDealDto.name;
    deal.total_dhs = createDealDto.total_dhs;
    deal.yield_amount = createDealDto.yield_amount;
    deal.sold = createDealDto.sold;
    deal.ticket_dhs = createDealDto.ticket_dhs;
    deal.days_left = createDealDto.days_left;

    if (file && file.buffer.length > 0) {
      const fileName = file.originalname;
      const objectName = `uploads/${fileName}`;

      const bucketName = 'fastapi-python-be-test-uploads-folder';
      const fileUpload = this.storage.bucket(bucketName).file(objectName);
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      stream.on('error', (err) => {
        console.error('Error uploading image:', err);
        throw new InternalServerErrorException('Error uploading image');
      });

      stream.on('finish', async () => {
        deal.deal_img_path = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        await this.dealsRepository.save(deal);
      });

      stream.end(file.buffer);
    } else {
      await this.dealsRepository.save(deal);
    }

    return deal;
  }

  findAllDeals(): Promise<Deal[]> {
    return this.dealsRepository.find();
  }

  viewDeal(id: number): Promise<Deal> {
    return this.dealsRepository.findOneBy({ id });
  }

  updateDeal(id: number, updateDealDto: UpdateDealDto): Promise<Deal> {
    const deal: Deal = new Deal();
    deal.name = updateDealDto.name;
    deal.total_dhs = updateDealDto.total_dhs;
    deal.yield_amount = updateDealDto.yield_amount;
    deal.sold = updateDealDto.sold;
    deal.ticket_dhs = updateDealDto.ticket_dhs;
    deal.days_left = updateDealDto.days_left;
    deal.id = id;
    deal.deal_img_path = updateDealDto.deal_img_path;

    return this.dealsRepository.save(deal);
  }

  removeDeal(id: number): Promise<{ affected?: number }> {
    return this.dealsRepository.delete(id);
  }
}
