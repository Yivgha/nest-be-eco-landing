import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateDealDto {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  total_dhs: string;

  @IsString()
  @IsNotEmpty()
  yield_amount: string;

  @IsString()
  @IsNotEmpty()
  sold: string;

  @IsString()
  @IsNotEmpty()
  ticket_dhs: string;

  @IsString()
  @IsNotEmpty()
  days_left: string;

  deal_img_path: string;
}
