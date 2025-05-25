import { IsString, IsUUID} from 'class-validator';
import { QuestionStatus } from '../question.entity';

export class CreateUserDto {
    @IsString()
    content: string;
    
    @IsUUID()
    clientId: number;
}