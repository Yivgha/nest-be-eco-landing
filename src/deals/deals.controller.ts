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
// import { extname } from 'path';
// import { diskStorage } from 'multer';

@Controller('deals')
@UsePipes(new ValidationPipe())
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  // @Post()
  // @UseInterceptors(FileInterceptor('deal_img'))
  // create(@Body() createDealDto: CreateDealDto, @UploadedFile() file: any) {
  //   return this.dealsService.createDeal(createDealDto, file);
  // }
  // create(@Body() createDealDto: CreateDealDto) {
  //   return this.dealsService.createDeal(createDealDto);
  // }

  @Post()
  @UseInterceptors(FileInterceptor('deal_img'))
  async create(
    @UploadedFile() deal_img: Express.Multer.File,
    @Body() createDealDto: CreateDealDto,
  ) {
    // 'file' is of type MulterFile
    console.log(deal_img); // This will log information about the uploaded file

    // Now you can use the 'file' object to get information about the uploaded file
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
