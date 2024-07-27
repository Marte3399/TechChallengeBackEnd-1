import User from "../../app/entities/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1721928477312 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log("assas")
        const repo = queryRunner.connection.getRepository(User);

        await repo.insert([
            {
                username: 'user',
                password: 'pass'
            },
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user')
    }

}
