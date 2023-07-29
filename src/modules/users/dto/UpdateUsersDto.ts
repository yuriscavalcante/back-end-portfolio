import { Company } from "modules/companies/infra/typeorm/entities/Company";

export class UpdateUsersDto {
  id: string;
  name: string;
  email: string;
  // branch: Branch;
  // role: Role;
  documents: string;
  birthDate: string;
  phoneNumber: string;
  // department: Department
  company: Company;
}
