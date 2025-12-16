import { 
  UserByIdSchema,
  UserCreateSchema, 
  UserDeleteSchema, 
  UsersAllSchema, 
  UserUpdateSchema 
} from "./userSchema";

export const schemas = {
  UserById: UserByIdSchema,
  UserAll: UsersAllSchema,
  UserCreate: UserCreateSchema,
  UserUpdate: UserUpdateSchema,
  DeleteUser: UserDeleteSchema
};
