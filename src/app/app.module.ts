import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TarefaListaComponentComponent } from './components/tarefa-lista-component/tarefa-lista-component.component';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NovaTarefaFormService } from './components/tarefa-lista-component/nova-tarefa-form/nova-tarefa-form.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NovaTarefaFormComponent } from './components/tarefa-lista-component/nova-tarefa-form/nova-tarefa-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    TarefaListaComponentComponent,
    NovaTarefaFormComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatTableModule,
    AppRoutingModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  providers: [
    NovaTarefaFormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
