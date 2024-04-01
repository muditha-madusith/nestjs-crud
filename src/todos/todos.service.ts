import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DeepPartial, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {

  constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,){}

  async create(createTodoDto: CreateTodoDto) {
    const todo = this.todoRepository.create(createTodoDto as DeepPartial<Todo>);
    return await this.todoRepository.save(todo)
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOneById(id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.findOne(id);
    return await this.todoRepository.save({ ...todo, ...updateTodoDto });
  }

  async remove(id: number) {
    const todo = await this.findOne(id);
    return await this.todoRepository.remove(todo);
  }
}
