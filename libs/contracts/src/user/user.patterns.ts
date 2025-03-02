import { UserCreateDto } from './user.create.dto';
import { UserUpdateDto } from './user.update.dto';

export const USER_CLIENT = 'USER_CLIENT';

export const USER_PATTERNS = {
  GET_USER: 'getUser',
  CREATE_USER: 'createUser',
  UPDATE_USER: 'updateUser',
  DELETE_USER: 'deleteUser',
} as const;

export type UserPatterns = typeof USER_PATTERNS;

export interface UserPatternData {
  [USER_PATTERNS.GET_USER]: { id: string };
  [USER_PATTERNS.CREATE_USER]: UserCreateDto;
  [USER_PATTERNS.UPDATE_USER]: UserUpdateDto;
  [USER_PATTERNS.DELETE_USER]: { id: number };
}
