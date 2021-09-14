import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import {  IntraAuthGuard } from 'src/authentication/auth/guards';

@Controller('auth')
export class AuthController {

    // Get /api/auth/login
    @Get('login')
    @UseGuards(IntraAuthGuard)
    login() {
        return;
    }

    // Get /api/auth/redirect
    @Get('redirect')
    @UseGuards(IntraAuthGuard)
    redirect(@Res() res: Response) {
        res.send(200);
    }

    // Get /api/auth/status
    @Get('status')
    @UseGuards(IntraAuthGuard)
    status() {
        return 'ok';
    }

    // Get /api/auth/logout
    @Get('logout')
    logout() {}
}