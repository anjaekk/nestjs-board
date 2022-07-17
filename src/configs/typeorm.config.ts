import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'nest-db',
    port: 5432,
    username: 'nest',
    password: 'nest',
    database: 'nest',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}