import {
    Controller,
    Get,
    UseGuards,
    Req
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGaurd } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGaurd)
@Controller('users')
export class UserController {
    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }
}