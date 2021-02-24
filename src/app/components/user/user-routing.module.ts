import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotusernameComponent } from './forgotusername/forgotusername.component';
import { RegisterComponent } from './registration/registration.component';

const routes: Routes = [
  { path: 'registerUser', component: RegisterComponent },
  { path: 'forgotPassword', component: ForgotpasswordComponent },
  { path: 'forgotUsername', component: ForgotusernameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

export const routedComponents = [
  RegisterComponent,
  ForgotpasswordComponent,
  ForgotusernameComponent,
];
