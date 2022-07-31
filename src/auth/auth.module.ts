import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { UserRepository } from './users.repository';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: 'JWTSECRET',
            signOptions:{
                expiresIn: 60 * 60,
            }
        }),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController],
    providers: [AuthService, UserRepository]
})
export class AuthModule {}
