import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTodoListDto } from './dtos/create-todo-list.dto';
import { UpdateTodoListDto } from './dtos/update-todo-list.dto';
import { TodoList } from './entities/todo-list.entity';
import { TodoListsService } from './todo-lists.service';
import { AddTodoItemDto } from './dtos/add-todo-item.dto';
import { TodoItem } from './entities/todo-item.entity';
import { UpdateTodoItemDto } from './dtos/update-todo-item.dto';

@Controller('api/todo-lists')
@ApiTags('Todo-Lists')
export class TodoListsController {
  constructor(private todoListsService: TodoListsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a todo list',
  })
  @ApiBody({ type: CreateTodoListDto })
  @ApiCreatedResponse({ description: 'The created todo list', type: TodoList })
  create(@Body() dto: CreateTodoListDto): TodoList {
    return this.todoListsService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all todo lists',
  })
  @ApiOkResponse({ description: 'An array of todo lists', type: [TodoList] })
  findAll(): TodoList[] {
    return this.todoListsService.findAll();
  }

  @Get('/:todoListId')
  @ApiOperation({
    summary: 'Get a todo list by id',
  })
  @ApiParam({
    name: 'todoListId',
    description: 'The id of the todo list',
    type: Number,
  })
  @ApiOkResponse({ description: 'A todo list', type: TodoList })
  findOne(@Param() param: { todoListId: number }): TodoList {
    return this.todoListsService.findOne(param.todoListId);
  }

  @Put('/:todoListId')
  @ApiOperation({
    summary: 'Update a todo list by id',
  })
  @ApiParam({
    name: 'todoListId',
    description: 'The id of the todo list',
    type: Number,
  })
  @ApiBody({ type: UpdateTodoListDto })
  @ApiOkResponse({ description: 'The updated todo list', type: TodoList })
  update(
    @Param() param: { todoListId: number },
    @Body() dto: UpdateTodoListDto,
  ): TodoList {
    return this.todoListsService.update(param.todoListId, dto);
  }

  @Delete('/:todoListId')
  @ApiOperation({
    summary: 'Delete a todo list by id',
  })
  @ApiParam({
    name: 'todoListId',
    description: 'The id of the todo list',
    type: Number,
  })
  @ApiOkResponse({
    description: 'Successfully deleted the requested todo list',
  })
  @HttpCode(204)
  delete(@Param() param: { todoListId: number }): void {
    this.todoListsService.delete(param.todoListId);
  }

  @Put('/:todoListId/reorder')
  @ApiOperation({ summary: 'Reorder todo items in a specific todo list' })
  @ApiParam({
    name: 'todoListId',
    description: 'The ID of the todo list to reorder items in',
    type: Number,
    example: 1,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        order: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              order: { type: 'number', example: 0 },
            },
          },
        },
      },
      example: {
        order: [
          { id: 1, order: 0 },
          { id: 2, order: 1 },
          { id: 3, order: 2 },
        ],
      },
    },
  })
  @ApiOkResponse({
    description: 'Returns the updated list of todo items after reordering',
    type: [TodoItem],
  })
  reorderTodoItems(
    @Param() param: { todoListId: number },
    @Body() body: { order: { id: number; order: number }[] },
  ): TodoItem[] {
    return this.todoListsService.reorderTodoItems(param.todoListId, body.order);
  }

  /**
  --------------------------------------------------------------------
  # Todo Lists Items
  --------------------------------------------------------------------
  **/

  @Post('/:todoListId/todo-items')
  @ApiOperation({
    summary: 'Add a todo item to a todo list',
  })
  @ApiParam({
    name: 'todoListId',
    description: 'The id of the todo list',
    type: Number,
  })
  @ApiBody({ type: AddTodoItemDto })
  @ApiCreatedResponse({ description: 'The created todo item', type: TodoItem })
  createTodoItem(
    @Param() param: { todoListId: number },
    @Body() dto: AddTodoItemDto,
  ): TodoItem {
    return this.todoListsService.addTodoItem(param.todoListId, dto);
  }

  @Get('/:todoListId/todo-items/')
  @ApiOperation({
    summary: 'Get all todo items of a todo list',
  })
  @ApiParam({
    name: 'todoListId',
    description: 'The id of the todo list',
    type: Number,
  })
  @ApiOkResponse({ description: 'An array of todo items', type: [TodoItem] })
  findAllTodoItems(@Param() param: { todoListId: number }): TodoItem[] {
    return this.todoListsService.findAllTodoItems(param.todoListId);
  }

  @Get('/:todoListId/todo-items/:todoItemId')
  @ApiOperation({
    summary: 'Get a todo item by id',
  })
  @ApiParam({
    name: 'todoListId',
    description: 'The id of the todo list',
    type: Number,
  })
  @ApiParam({
    name: 'todoItemId',
    description: 'The id of the todo item',
    type: Number,
  })
  @ApiOkResponse({ description: 'A todo item', type: TodoItem })
  findOneTodoItem(
    @Param() param: { todoListId: number; todoItemId: number },
  ): TodoItem {
    return this.todoListsService.findOneTodoItem(
      param.todoListId,
      param.todoItemId,
    );
  }

  @Put('/:todoListId/todo-items/:todoItemId')
  @ApiOperation({
    summary: 'Update a todo item by id',
  })
  @ApiParam({
    name: 'todoListId',
    description: 'The id of the todo list',
    type: Number,
  })
  @ApiParam({
    name: 'todoItemId',
    description: 'The id of the todo item',
    type: Number,
  })
  @ApiBody({ type: UpdateTodoItemDto })
  @ApiOkResponse({ description: 'The updated todo item', type: TodoItem })
  updateTodoItem(
    @Param() param: { todoListId: number; todoItemId: number },
    @Body() dto: UpdateTodoItemDto,
  ): TodoItem {
    return this.todoListsService.updateTodoItem(
      param.todoListId,
      param.todoItemId,
      dto,
    );
  }

  @Delete('/:todoListId/todo-items/:todoItemId')
  @ApiOperation({
    summary: 'Delete a todo item by id',
  })
  @ApiParam({
    name: 'todoListId',
    description: 'The id of the todo list',
    type: Number,
  })
  @ApiParam({
    name: 'todoItemId',
    description: 'The id of the todo item',
    type: Number,
  })
  @ApiOkResponse({
    description: 'Successfully deleted the requested todo item',
  })
  @HttpCode(204)
  deleteTodoItem(
    @Param() param: { todoListId: number; todoItemId: number },
  ): void {
    this.todoListsService.removeTodoItem(param.todoListId, param.todoItemId);
  }
}
