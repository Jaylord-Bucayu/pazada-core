export class CreateUserDto {
    customer_code: string;
    date_of_birth: Date;
    credit_limit: number;
    credit_left: number;
    firstname: string;
    description: string;
    middlename: string;
    lastname: string;
    email: string;
    phone: number;
    address: string;
    city: string;
    postal_code: number;
    region: string;
    provider: string;
    password?: string;
    role?: string;
  }
  