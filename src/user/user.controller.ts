import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from 'src/entity/user.entity';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @description @Body 방식 - @Body 어노테이션 여러개를 통해 요청 객체를 접근할 수 있습니다.
   *
   * CreateUserDto를 사용해서 @Body 전달 방식을 변경합니다.
   *
   * @param id 유저 고유 아이디
   * @param name 유저 이름
   */
  @Post('/create_user')
  @UsePipes(ValidationPipe)
  onCreateUser(@Body() createUserDto: CreateUserDto): Promise<boolean> {
    return this.userService.onCreateUser(createUserDto);
  }

  /**
   * @description 전체 유저 조회
   */
  @Get('/user_all')
  getUserAll(): Promise<User[]> {
    return this.userService.getUserAll();
  }

  /**
   * @description @Query 방식 - 단일 유저 조회
   *
   * @param id 유저 고유 아이디
   */
  @Get('/user')
  findByUserOne1(@Query('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.findByUserOne(id);
  }

  /**
   * @description @Param 방식 - 단일 유저 조회
   *
   * @param id 유저 고유 아이디
   */
  @Get('/user/:id')
  findByUserOne2(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.findByUserOne(id);
  }

  /**
   * @description @Param & @Body 혼합 방식 - 단일 유저 수정
   *
   * @param id 유저 고유 아이디
   * @param name 유저 이름
   */
  @Patch('/user/:id')
  @UsePipes(ValidationPipe)
  setUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    return this.userService.setUser(id, updateUserDto);
  }

  /**
   * @description @Body 방식 - 전체 유저 수정
   *
   * @param updateUserDto 유저 정보
   */
  @Put('/user/update')
  @UsePipes(ValidationPipe)
  setAllUser(@Body() updateUserDto: UpdateUserDto[]): Promise<boolean> {
    return this.userService.setAllUser(updateUserDto);
  }

  /**
   * @description @Query 방식 - 단일 유저 삭제
   *
   * @param id 유저 고유 아이디
   */
  @Delete('/user/delete')
  deleteUser(@Query('id', ParseUUIDPipe) id: string): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    console.log('Login Route');

    return req.user;
  }
}
