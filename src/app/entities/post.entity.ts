import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 100, nullable: false })
    title: string;

    @Column('varchar', { length: 2000, nullable: false })
    description: string;

}

export default Post;