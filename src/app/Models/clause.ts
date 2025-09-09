export interface Clause {
  _id?: string;
  clause_name: string;
  clause_text: string;
  domain_id: number;
  domain_name?: string;
  country_id?: number;
  country_name?: string;
}
