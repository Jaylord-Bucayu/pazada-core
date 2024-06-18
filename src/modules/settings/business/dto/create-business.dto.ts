export class CreateBusinessDto {
    readonly name: string;
    
    readonly address: {
      city: string;
      street: string;
      province: string;
      postal_code: string;
    };
  
    readonly email: string;
    
    readonly phone: {
        prefix:string;
        number:string;
    };
  
    readonly website?: string;
    
    readonly logo?: string;
  }
  