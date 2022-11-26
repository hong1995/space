import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create_user')
  onCreateUser(@Body('id') id: number, @Body('name') name: string): User[] {
    return this.userService.onCreateUser(id, name);
  }

  @Get('/user_all')
  getUserAll(): User[] {
    return this.userService.getUserAll();
  }

  @Get('/user/:id')
  findByUserOne(@Param('id') id: number): User {
    return this.userService.findByUserOne(id);
  }

  @Patch('/user/:id')
  setUser(@Param('id') id: number, @Body('name') name: string): User {
    return this.userService.setUser(id, name);
  }

  @Put('/user/update')
  setAllUser(@Body('id') id: number, @Body('name') name: string): User[] {
    return this.userService.setAllUser(id, name);
  }

  @Delete('/user/delete')
  deleteUser(@Query('id') id: number): User[] {
    return this.userService.deleteUser(id);
  }
}
