import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto, TaskStatusEnum } from './task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TaskService {
    private tasks: TaskDto[] = []

    constructor(private prisma: PrismaService) { }

    async create(task: TaskDto) {

        try {
            const user = await this.prisma.user.findUniqueOrThrow({ where: { id: task.userId } })

            task.status = TaskStatusEnum.TO_DO
            task.expirationDate = new Date(task.expirationDate)

            return this.prisma.task.create({
                data: task
            })

        } catch (PrismaClientKnownRequestError) {
            throw new NotFoundException("usuario não encontrado")
        }
    }

    async findById(id: string) {

        const tasks = await this.prisma.task.findUnique({
            where: { id }
        })

        if (!tasks) {
            throw new NotFoundException("tarefa não encontrada")
        } else {
            return tasks
        }
    }

    async findAllByUser(id: string) {

        const tasks = await this.prisma.task.findMany({
            where: {
                userId: id
            }
        })

        if (tasks.length == 0) {
            throw new NotFoundException("usuario não encontrado")
        } else {
            return tasks
        }

    }

    async uptade(id: string, task: TaskDto) {
        try {
            await this.prisma.user.findUniqueOrThrow({ where: { id: task.userId } })

            task.expirationDate = new Date(task.expirationDate)

            return await this.prisma.task.update({
                where: { id },
                data: task
            })
        } catch (PrismaClientKnownRequestError) {
            throw new NotFoundException("tarefa ou usuario não foi localizada")
        }

    }

    async remove(id: string) {
        try {
            return await this.prisma.task.delete({
                where: { id }
            })
        } catch (PrismaClientKnownRequestError) {
            throw new NotFoundException("tarefa não foi localizada")
        }


    }
}
