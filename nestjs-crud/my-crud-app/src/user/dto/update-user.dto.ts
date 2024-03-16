import {
    IsAlphanumeric,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';
  
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  
  export class UpdateUserDto {
    @IsOptional() // Allow this field to be optional for updates
    @IsString()
    @MinLength(2, { message: 'Name mu st have at least 2 characters.' })
    @IsNotEmpty()
    name?: string;
  
    @IsOptional() // Allow this field to be optional for updates
    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have at least 3 characters.' })
    @IsAlphanumeric(null, {
      message: 'Username does not allow other than alphanumeric characters.',
    })
    username?: string;
  
    @IsOptional() // Allow this field to be optional for updates
    @IsEmail({}, { message: 'Please provide a valid email address.' })
    email?: string;
  
    @IsOptional() // Allow this field to be optional for updates
    @IsInt()
    age?: number;
  
    @IsOptional() // Allow this field to be optional for updates
    @IsString()
    @IsEnum(['f', 'm', 'u'])
    gender?: string;
  
    @IsOptional() // Allow this field to be optional for updates
    @IsNotEmpty()
    @Matches(passwordRegEx, {
      message: `Password must contain at least 8 and maximum 20 characters, 
        at least one uppercase letter, 
        one lowercase letter, 
        one number, and 
        one special character`,
    })
    password?: string;
  }