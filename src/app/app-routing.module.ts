import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeamauditHomeComponent} from "./components/teamaudit-home/teamaudit-home.component";
import {MyAcctComponent} from "./components/myacct/myacct.component";

const routes: Routes = [
  { path: "teamaudit-home", component: TeamauditHomeComponent },
  { path: "myacct", component: MyAcctComponent },
  { path: '', redirectTo: '/teamaudit-home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }