import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create_user')
  @UsePipes(ValidationPipe)
  onCreateUser(@Body() createUserDto: CreateUserDto): User[] {
    return this.userService.onCreateUser(createUserDto);
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
  @UsePipes(ValidationPipe)
  setUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): User {
    return this.userService.setUser(id, updateUserDto);
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
