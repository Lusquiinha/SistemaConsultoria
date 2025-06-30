import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, FindOptionsWhere, Repository } from 'typeorm';
import { Question, QuestionStatus } from './question.entity';
import { err, ok, Result } from 'neverthrow';
import { UUID } from 'node:crypto';
import { User } from 'src/users/user.entity';
import { CreateQuestionDto } from './dto/create.question.dto';
import { QuestionResponseDto } from './dto/question.response.dto';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionsRepository: Repository<Question>,
    ) {}

    findAll(): Promise<Result<QuestionResponseDto[], Error>> {
        return this.questionsRepository.find({
            relations: ['client', 'consultant'],
        })
            .then((questions) => ok(questions.map((q) => new QuestionResponseDto(q))))
            .catch((error) => err(new Error('Error finding questions: ' + error.message)));
    }

    findAllBy(filter: FindOptionsWhere<Question>): Promise<Result<QuestionResponseDto[], Error>> {
        return this.questionsRepository.find({
            where: filter,
            relations: ['client', 'consultant'],
        })
            .then((questions) => {
                if (questions.length > 0) {
                    return ok(questions.map((q) => new QuestionResponseDto(q)));
                }
                return err(new Error('Questions not found'));
            })
            .catch((error) => err(new Error('Error finding questions by filter: ' + error.message)));
    }

    findByStatus(status: QuestionStatus): Promise<Result<QuestionResponseDto[], Error>> {
        return this.findAllBy({ status });
    }

    findByClientId(userId: UUID): Promise<Result<QuestionResponseDto[], Error>> {
        return this.findAllBy({ client: { id: userId } });
    }

    createQuestion(question: CreateQuestionDto): Promise<Result<QuestionResponseDto, Error>> {
        const newQuestion = this.questionsRepository.create(question.toPartialQuestion());
        return this.questionsRepository.save(newQuestion)
            .then((savedQuestion) => ok(new QuestionResponseDto(savedQuestion)))
            .catch((error) => err(new Error('Error creating question: ' + error.message)));
    }

}