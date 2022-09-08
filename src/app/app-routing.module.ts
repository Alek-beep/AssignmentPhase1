import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'account', component:AccountComponent},
  {path:'profile', component:ProfileComponent},
  {path:'chat', component:ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
