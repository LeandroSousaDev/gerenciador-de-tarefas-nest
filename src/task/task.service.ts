import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskStatusEnum } from './task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
    private tasks: TaskDto[] = []

    constructor(private prisma: PrismaService) { }

    async create(task: TaskDto) {
        task.status = TaskStatusEnum.TO_DO
        task.expirationDate = new Date(task.expirationDate)

        return this.prisma.task.create({
            data: task
        })
    }

    findById(id: string) {
        return this.prisma.task.findUnique({
            where: { id }
        })
    }

    findAll() {
        return this.prisma.task.findMany()

    }

    uptade(id: string, task: TaskDto) {
        task.expirationDate = new Date(task.expirationDate)

        return this.prisma.task.update({
            where: { id },
            data: task
        })
    }

    remove(id: string) {
        return this.prisma.task.delete({
            where: { id }
        })
    }
}
