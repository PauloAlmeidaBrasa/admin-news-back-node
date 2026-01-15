import { 
  UserByIdSchema,
  UserCreateSchema, 
  UserDeleteSchema, 
  UsersAllSchema, 
  UserUpdateSchema 
} from "./userSchema";
import 
{ ClientAllSchema } from "./clientSchema"


export const schemas = {
  UserById: UserByIdSchema,
  UserAll: UsersAllSchema,
  UserCreate: UserCreateSchema,
  UserUpdate: UserUpdateSchema,
  DeleteUser: UserDeleteSchema,
  ClientAll: ClientAllSchema
};
