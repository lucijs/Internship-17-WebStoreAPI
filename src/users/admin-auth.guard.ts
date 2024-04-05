import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const baseGuardResult = await super.canActivate(context);
    if (!baseGuardResult) {
      return false;
    }

    const { user } = await context.switchToHttp().getRequest();
    console.log('admin', user);
    console.log(user.role === 'admin')
    return user.role === 'admin';
  }
}