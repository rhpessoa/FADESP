import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarefaListaComponentComponent } from './components/tarefa-lista-component/tarefa-lista-component.component';


const routes: Routes = [
  { path: '', redirectTo: '/tarefas', pathMatch: 'full' },
  { path: 'tarefas', component: TarefaListaComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
