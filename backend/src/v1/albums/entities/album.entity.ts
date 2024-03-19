import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from '../../images/entities/image.entity';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToMany(() => Image, (image) => image.album)
  public images: Image[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
