import { CreateCompaniesDto } from "../dto/CreateCompaniesDto";
import { Company } from "../infra/typeorm/entities/Company";

export interface CompanyRepositoryProps {
  create(company: CreateCompaniesDto): Promise<Company>;
  find(query: any): Promise<Company[]>;
  findById(id: string): Promise<Company | null>;
  findByCnpj(cnpj: string): Promise<Company | null>;
  update(company: Company): Promise<Company>;
  delete(company: Company): Promise<Company | null>;
}
