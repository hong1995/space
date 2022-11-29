import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
const users: User[] = [
  { id: 1, name: '유저1' },
  { id: 2, name: '유저2' },
  { id: 3, name: '유저3' },
];
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  onCreateUser(createUserDto: CreateUserDto): User[] {
    return users.concat({ id: createUserDto.id, name: createUserDto.name });
  }

  getUserAll(): User[] {
    return users;
  }

  findByUserOne(id: number): User {
    return users.find((data) => data.id == id);
  }

  setUser(id: number, updateUserDto: UpdateUserDto): User {
    return users.find((data) => {
      if (data.id == id) return (data.name = updateUserDto.name);
    });
  }

  setAllUser(id, name): User[] {
    return users.map((data) => {
      if (data.id == id) {
        data.name = name;
      }

      return {
        id: data.id,
        name: data.name,
      };
    });
  }

  deleteUser(id: number): User[] {
    return users.filter((data) => data.id != id);
  }
}
