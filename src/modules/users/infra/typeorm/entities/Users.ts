import { Company } from "../../../../companies/infra/typeorm/entities/Company";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

@Entity("users")
export class Users {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  isAdmin: boolean;

  @Column()
  password: string;

  @ManyToOne(() => Company, {
    nullable: true,
  })
  @JoinColumn({ name: "company" })
  company: Company;

  @Column({ nullable: true })
  documents: string;

  @Column({ nullable: true })
  birthDate: string;

  @Column({ nullable: true })
  phoneNumber: string;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
