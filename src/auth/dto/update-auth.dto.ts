import { PartialType } from '@nestjs/mapped-types';
import { Login } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(Login) {}
