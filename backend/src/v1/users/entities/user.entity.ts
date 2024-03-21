import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Album } from '../../albums/entities/album.entity';
import { ProfilePhoto } from '../../profile-photos/entities/profile-photo.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public username: string;

  @Column()
  public fullName: string;

  @Column()
  public password: string;

  @Column()
  public image: string;

  @OneToMany(() => Album, (album) => album.user)
  public albums: Album[];

  @OneToMany(() => ProfilePhoto, (photo) => photo.user)
  public profile_photos: ProfilePhoto[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
