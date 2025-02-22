import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { FindAllParameters, TaskDto } from './task.dto';


@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    create(@Body() task: TaskDto) {
        return this.taskService.create(task)
    }

    @Get("/:id")
    findById(@Param("id") id: string) {
        return this.taskService.findById(id)
    }

    @Get("/:id/user")
    findAll(@Param("id") id: string) {
        return this.taskService.findAllByUser(id)
    }

    @Patch("/:id")
    update(@Param("id") id: string, @Body() task: TaskDto) {
        return this.taskService.uptade(id, task)
    }

    @Delete("/:id")
    delete(@Param("id") id: string) {
        return this.taskService.remove(id)
    }

}
