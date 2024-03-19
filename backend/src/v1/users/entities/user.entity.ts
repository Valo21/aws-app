import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
export class User {
  @Column({ unique: true })
  public username: string;

  @Column()
  public fullName: string;

  @Column()
  public password: string;

  @Column()
  public image: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
