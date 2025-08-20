import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { VagasComponent } from './views/vagas/vagas.component';
import { CurriculosComponent } from './views/curriculos/curriculos.component';
import { PainelVagasComponent } from './views/painel-vagas/painel-vagas.component';
import { PainelCurriculosComponent } from './views/painel-curriculos/painel-curriculos.component';
import { CurriculoListComponent } from './views/curriculo-list/curriculo-list.component';

// Guards
import { Home2Component } from './views/home/home2.component';
import { AdminGuard } from './services/auth.guard';
import { AuthGuard } from './services/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent }, // público
  { path: 'vagas', component: VagasComponent, canActivate: [AuthGuard] }, // só logado
  {
    path: 'curriculos',
    component: CurriculosComponent,
    canActivate: [AuthGuard],
  }, // só logado
  {
  path: 'admin',
  component: AdminGuard,
  canActivate: [AuthGuard] // se estiver usando guard
},


  // rotas restritas a ADMIN
  {
    path: 'painel-vagas',
    component: PainelVagasComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'painel-curriculos',
    component: PainelCurriculosComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'curriculo-list',
    component: CurriculoListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'home2',
    component: Home2Component,
    canActivate: [AuthGuard], // se quiser proteger com login
  },
  // rota de fallback
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
