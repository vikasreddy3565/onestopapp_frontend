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

export class ActionButton {
  label: string;
  title: string;
  eventKey: string;
  isDisplay: boolean;
  isDisabled: boolean;
  displayOrder: number;
  icon: string;
  align: string;
  constructor(
    label?: string,
    title?: string,
    eventKey?: string,
    isDisplay?: boolean,
    isDisabled?: boolean,
    displayOrder?: number,
    icon?: string,
    align?: string
  ) {
    this.label = label;
    this.title = title;
    this.eventKey = eventKey;
    this.isDisplay = isDisplay;
    this.isDisabled = isDisabled;
    this.displayOrder = displayOrder;
    this.icon = icon;
    this.align = align != null ? align : 'right';
  }
}
export enum ButtonActionsEnum {
  Submit = 'submit',
  Save = 'save',
  Cancel = 'cancel',
  Back = 'back',
  Print = 'print',
}
