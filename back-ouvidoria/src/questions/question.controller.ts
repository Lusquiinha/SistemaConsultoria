import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { UUID } from 'node:crypto';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create.question.dto';
import { QuestionStatus } from './question.entity';
import { QuestionResponseDto } from './dto/question.response.dto';


@Controller("question")
export class QuestionController {
    constructor(private readonly questionService: QuestionService ) {}

    @Get()
    async getAll(@Res() response: Response) {
        const questions = await this.questionService.findAll();
        if (questions.isErr()) {
            return response.status(HttpStatus.NOT_FOUND).json({ message: questions.error.message });
        }
        response.status(HttpStatus.OK).json(questions.value);
    }

    @Post()
    async createQuestion(@Body() question: CreateQuestionDto, @Res() response: Response) {
        const newQuestion = await this.questionService.createQuestion(question);
        if (newQuestion.isErr()) {
            return response.status(HttpStatus.BAD_REQUEST).json({ message: newQuestion.error.message });
        }
        response.status(HttpStatus.CREATED).json(newQuestion.value);
    }

    @Get('status/:status')
    async getByStatus(@Param('status') status: QuestionStatus, @Res() response: Response) {
        const questions = await this.questionService.findByStatus(status);
        if (questions.isErr()) {
            return response.status(HttpStatus.NOT_FOUND).json({ message: questions.error.message });
        }
        response.status(HttpStatus.OK).json(questions.value);
    }

    @Get('client/:id')
    async getByClientId(@Param('id') id: UUID, @Res() response: Response) {
        const questions = await this.questionService.findByClientId(id);
        if (questions.isErr()) {
            return response.status(HttpStatus.NOT_FOUND).json({ message: questions.error.message });
        }
        response.status(HttpStatus.OK).json(questions.value);
    }

}