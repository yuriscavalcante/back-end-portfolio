import { CompanyRepositoryProps } from "modules/companies/repositories/CompanyRepositoryProps";
import { Repository } from "typeorm";
import { Company } from "../entities/Company";
import { AppSource } from "shared/infra/typeorm";
import { CreateCompaniesDto } from "modules/companies/dto/CreateCompaniesDto";

export class CompanyRepository implements CompanyRepositoryProps {
  private companyRepository: Repository<Company>;

  constructor() {
    this.companyRepository = AppSource.getRepository(Company);
  }

  async create(company: CreateCompaniesDto): Promise<Company> {
    const newCompany = this.companyRepository.create(company);
    await this.companyRepository.save(newCompany);
    return newCompany;
  }

  async find(query: any): Promise<any> {
    const [list, total] = await this.companyRepository.findAndCount({
      skip: query.skip,
      take: 10,
    });
    return [list, total];
  }

  async findById(id: string): Promise<Company | null> {
    return await this.companyRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByCnpj(cnpj: string): Promise<Company | null> {
    return await this.companyRepository.findOne({
      where: {
        cnpj: cnpj,
      },
    });
  }

  async update(company: Company): Promise<Company> {
    return await this.companyRepository.save(company);
  }

  async delete(company: Company): Promise<Company | null> {
    return await this.companyRepository.remove(company);
  }
}
