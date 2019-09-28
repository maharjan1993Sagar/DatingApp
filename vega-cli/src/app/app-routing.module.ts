import { Routes, RouterModule } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
   {path: 'home', component: HomeComponent},
   {
     path: '',
     runGuardsAndResolvers: 'always',
     canActivate: [AuthGuard],
     children: [
      {path: 'members', component: MemberListComponent, canActivate: [AuthGuard]},
      {path: 'messages', component: MessagesComponent},
      {path: 'lists', component: ListsComponent},
       ]
   },
    { path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
