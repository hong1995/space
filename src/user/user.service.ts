import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entity/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  /**
   * @description 유저 생성
   *
   * @param createUserDto 유저 데이터
   *
   * @returns {User[]} users
   */
  onCreateUser(createUserDto: CreateUserDto): Promise<boolean> {
    return this.userRepository.onCreate(createUserDto);
  }

  /**
   * @description 모든 유저 조회
   *
   * @returns {User[]} users
   */
  getUserAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  /**
   * @description 단일 유저 조회
   *
   * @param id 유저 고유 아이디
   * @returns {User} users
   */
  findByUserOne(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  /**
   * @description 단일 유저 수정
   *
   * @param id 유저 고유 아이디
   * @param updateUserDto 유저 정보
   *
   * @returns {Promise<boolean>} true
   */
  setUser(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    return this.userRepository.onChnageUser(id, updateUserDto);
  }

  /**
   * @description 전체 유저 수정
   *
   * @param updateUserDto 유저 정보
   *
   * @returns {Promise<boolean>} true
   */
  setAllUser(updateUserDto: UpdateUserDto[]): Promise<boolean> {
    return this.userRepository.onChnageUsers(updateUserDto);
  }

  /**
   * @description 유저 삭제
   *
   * @param id
   * @returns {Promise<boolean>} true
   */
  deleteUser(id: string): Promise<boolean> {
    return this.userRepository.onDelete(id);
  }

  getHelloWorld(): string {
    return 'Hello World!!';
  }
}
