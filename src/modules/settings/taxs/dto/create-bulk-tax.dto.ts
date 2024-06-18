export class BulkCreateTaxDto {
    taxes: {
      name: string;
      percent: number;
      taxName: string;
      cumulative?: boolean;
    }[];
  }
  