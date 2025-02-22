import { Injectable } from '@nestjs/common';
import { hashSync as bcryptHashSync } from 'bcrypt'
import { UserDTO } from './user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    private users: UserDTO[] = []

    constructor(private prisma: PrismaService) { }

    public create(newUser: UserDTO) {

        newUser.password = bcryptHashSync(newUser.password, 10)
        this.users.push(newUser)

        return this.prisma.user.create({
            data: newUser
        })
    }

    public findAll() {
        return this.prisma.user.findMany()
    }
}
