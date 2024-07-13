import { Entity, Column, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, BeforeInsert } from 'typeorm';


@Entity('post')
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;
    //@ObjectIdColumn()
    //id: number;
    
    @Column('varchar', { length: 100, nullable: false })
    title: string;

    @Column('varchar', { length: 2000, nullable: false })
    description: string;
    
    @Column('varchar', { length: 100, nullable: false })
    author: string;

}

export default Post;