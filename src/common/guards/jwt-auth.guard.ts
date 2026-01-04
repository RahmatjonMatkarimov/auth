import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers['authorization'];

        if (!authHeader) throw new UnauthorizedException('Token not found');

        const [, token] = authHeader.split(' ');
        if (!token) throw new UnauthorizedException('Token is missing');

        try {
            const payload = this.jwtService.verify(token);
            request['user'] = payload;
            return true;
        } catch (e) {
            throw new UnauthorizedException('Token is invalid');
        }
    }
}
