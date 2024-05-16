import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ActionMessageEnum,
  StatusMessageEnum,
  TypeActionEnum,
} from '../../detail-message/entities/detail-message.entity';

export class CreateMessageDto {
  @IsNotEmpty()
  sender: string;

  @IsNotEmpty()
  receiver: string;

  @IsBoolean()
  isRead: boolean;

  @IsNotEmpty()
  @IsEnum(ActionMessageEnum)
  action: ActionMessageEnum;

  @IsOptional()
  @IsString()
  bannerUri: string;

  @IsOptional()
  @IsString({ each: true })
  commission: string[];

  @IsOptional()
  @IsString({ each: true })
  userIds: string[];

  @IsNotEmpty()
  @IsEnum(TypeActionEnum)
  typeAction: TypeActionEnum;

  @IsOptional()
  @IsNumber()
  targetUserId: number;

  @IsOptional()
  @IsNumber()
  refUserId: number;

  @IsOptional()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsEnum(StatusMessageEnum)
  status: StatusMessageEnum;
}
