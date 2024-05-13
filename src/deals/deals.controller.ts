import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
  UsePipes,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
} from '@nestjs/common';
import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('deals')
@UsePipes(new ValidationPipe())
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('deal_img'))
  async create(
    @UploadedFile() deal_img: Express.Multer.File,
    @Body() createDealDto: CreateDealDto,
  ) {
    const deal = await this.dealsService.createDeal(createDealDto, deal_img);
    return deal;
  }

  @Get()
  findAll() {
    return this.dealsService.findAllDeals();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealsService.viewDeal(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDealDto: UpdateDealDto) {
    return this.dealsService.updateDeal(+id, updateDealDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dealsService.removeDeal(+id);
  }
}
