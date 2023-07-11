export class CreateUsersDto {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  // branch: Branch;
  // role: Role;
  documents: string;
  birthDate: string;
  phoneNumber: string;
  // department: Department
  // company: Company
}
