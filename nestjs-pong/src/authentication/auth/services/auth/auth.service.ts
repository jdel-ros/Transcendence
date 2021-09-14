import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../typeorm';
import { UserDetails } from '../../../utils/type';
import { AuthenticationProvider } from './auth';

@Injectable()
export class AuthService implements AuthenticationProvider {
    constructor (@InjectRepository(User) private userRepo: Repository<User>) {}

    async validateUser(details: UserDetails) {
        const { username } = details;
        const user = await this.userRepo.findOne({ username });
        console.log(user);
        if (user) return user;
        return this.createUser(details);
    }

    createUser(details: UserDetails) {
        console.log('Creating User');
        const user = this.userRepo.create(details);
        return this.userRepo.save(user);
    }
    findUser(username: string): Promise<User | undefined> {
        return this.userRepo.findOne({ username });
    }
}

