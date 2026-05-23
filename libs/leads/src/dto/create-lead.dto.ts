export class CreateLeadDto {
  name!: string;
  email?: string;
  phone?: string;
  company?: string;
  source?: string;
  status?: string;
  score?: number;
  notes?: string;
}

export class UpdateLeadDto {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  source?: string;
  status?: string;
  score?: number;
  notes?: string;
}

export class QueryLeadDto {
  search?: string;
  status?: string;
  source?: string;
  page?: number;
  limit?: number;
}
