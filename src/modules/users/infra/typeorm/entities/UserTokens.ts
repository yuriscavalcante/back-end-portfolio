import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Users } from "./Users";
import { v4 } from "uuid";

@Entity("users_tokens")
export class UserTokens {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  user: Users;

  @Column()
  user_id: string;

  @Column({ nullable: true })
  refresh_token?: string;

  @Column()
  token: string;

  @Column()
  expireAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
