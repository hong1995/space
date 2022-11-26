import { Injectable } from '@nestjs/common';
const users: User[] = [
  { id: 1, name: '유저1' },
  { id: 2, name: '유저2' },
  { id: 3, name: '유저3' },
];
@Injectable()
export class UserService {
  onCreateUser(id: number, name: string): User[] {
    return users.concat({ id, name });
  }

  getUserAll(): User[] {
    return users;
  }

  findByUserOne(id: number): User {
    return users.find((data) => data.id == id);
  }

  setUser(id: number, name: string): User {
    return users.find((data) => {
      if (data.id == id) return (data.name = name);
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
