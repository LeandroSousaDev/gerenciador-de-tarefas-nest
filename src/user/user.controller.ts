import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body() user: UserDTO) {
        return this.userService.create(user)
    }

    @Get()
    findAll() {
        return this.userService.findAll()
    }

}
