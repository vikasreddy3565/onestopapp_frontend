import { InjectionToken } from '@angular/core';

export const OSA_WEBAPI_LISTENER_URL = new InjectionToken<string>(
  'OSA Web API Listener URL'
);

export class JwtParameters {
  grantType: string;
  refreshToken: string;
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
}
export class AuthResult {
  message: string;
  isAuthenticated: boolean;
  userStatusId: number;
}

export class User {
  userId: number;
  userName: string;
  password: string;
  fullName: string;
  authToken: string;
  cloaId: number;
  messageCount: number;
  constructor() {}
}
