import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

/**
 * AuthGuard class implements the CanActivate interface to determine if
 * a user is authorized to proceed with the current request.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * Determines if the current user is authorized.
   * @param context The execution context of the request, providing details and utilities.
   * @returns A boolean or a Promise that resolves to a boolean, indicating if access is granted.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    return this.validateRequest(request);
  }

  /**
   * Validates the request to check if it contains a valid 'customer_id' in cookies.
   * @param request The incoming HTTP request to validate.
   * @returns True if the request is valid, otherwise false.
   */
  private validateRequest(request: Request): boolean {
    return !!request.cookies['customer_id'];
  }
}
