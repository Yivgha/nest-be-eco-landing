import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { Deal } from './entities/deal.entity';
import * as fs from 'fs-extra';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal) private readonly dealsRepository: Repository<Deal>,
  ) {}

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

    // Check if file exists and is not empty
    if (file && file.buffer.length > 0) {
      // Save the file to a specified location on the server
      const filePath = `uploads/${file.originalname}`;
      await fs.writeFile(filePath, file.buffer);
      deal.deal_img_path = filePath; // Assign the file path to the deal_img_path field
    }

    return this.dealsRepository.save(deal);
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
    return this.dealsRepository.save(deal);
  }

  removeDeal(id: number): Promise<{ affected?: number }> {
    return this.dealsRepository.delete(id);
  }
}
