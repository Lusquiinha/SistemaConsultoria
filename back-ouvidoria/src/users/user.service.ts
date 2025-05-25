import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { err, ok, Result } from 'neverthrow';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<Result<User[], Error>> {
        return this.usersRepository.find()
            .then((users) => ok(users))
            .catch((error) => err(new Error('Error finding users: ' + error.message)));
    }

    findOne(id: number): Promise<Result<User, Error>> {
        return this.usersRepository.findOneBy({ id })
            .then(user => {
                if (!user) {
                    return err(new Error('User not found'));
                }
                return ok(user);
            })
            .catch(error => err(new Error('Error finding user: ' + error.message)));
    }

    async remove(id: number): Promise<Result<void, Error>> {
        const user = await this.findOne(id);
        if (user.isErr()) {
            return err(user.error);
        }
        await this.usersRepository.remove(user.value);
        return ok();
    }
    
    createUser(user: CreateUserDto): Promise<Result<User, Error>> {
        const newUser = this.usersRepository.create(user)
        return this.usersRepository.save(newUser)
            .then((savedUser) => ok(savedUser))
            .catch((error => err(new Error('Error saving user: ' + error.message ))));      
    }

    findByEmail(email: string): Promise<Result<User, Error>> {
        return this.usersRepository.findOneBy({ email })
            .then(user => {
                if (!user) {
                    return err(new Error('User not found'));
                }
                return ok(user);
            })
            .catch(error => err(new Error('Error finding user: ' + error.message)));
    }

    async updateUser(id: number, user: Partial<User>): Promise<Result<User, Error>> {
        const existingUser = await this.findOne(id);
        if (existingUser.isErr()) {
            return err(existingUser.error);
        }
        Object.assign(existingUser.value, user);
        return this.usersRepository.save(existingUser.value)
            .then((savedUser) => ok(savedUser))
            .catch((error) => err(new Error('Error updating user: ' + error.message)));
    }
}