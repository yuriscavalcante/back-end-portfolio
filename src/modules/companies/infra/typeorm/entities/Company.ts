import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

@Entity("companies")
export class Company {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  acronym: string;

  @Column()
  cnpj: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
