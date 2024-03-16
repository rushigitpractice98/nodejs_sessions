import { PartialType } from '@nestjs/mapped-types';
import { CreateTestCrudDto } from './create-test-crud.dto';

export class UpdateTestCrudDto extends PartialType(CreateTestCrudDto) {}
