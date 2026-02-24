import { 
  UserByIdSchema,
  UserCreateSchema, 
  UserDeleteSchema, 
  UsersAllSchema, 
  UserUpdateSchema 
} from "./userSchema";
import 
{ ClientAllSchema } from "./clientSchema";
import {
  CategoryAllSchema,
  CategoryById,
  CategoryCreateSchema
} from "./categorySchemas";
import {
  NewsAllSchema,
  NewsById,
  NewsCreateSchema
} from "./newsSchemas";


export const schemas = {
  UserById: UserByIdSchema,
  UserAll: UsersAllSchema,
  UserCreate: UserCreateSchema,
  UserUpdate: UserUpdateSchema,
  DeleteUser: UserDeleteSchema,
  ClientAll: ClientAllSchema,
  CategoryAll: CategoryAllSchema,
  CategoryById: CategoryById,
  CategoryCreate: CategoryCreateSchema,
  NewsAll: NewsAllSchema,
  NewsById: NewsById,
  NewsCreate: NewsCreateSchema
};
