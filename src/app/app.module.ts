import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { TarefaListaComponent } from './components/tarefa-lista-component/tarefa-lista.component';
import { ConfirmComponent } from './components/confirm-component/confirm.component';
import { ConfirmService } from './components/confirm-component/confirm.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from './services/snackbar.service';

@NgModule({
  declarations: [
    AppComponent,
    TarefaListaComponent,
    NovaTarefaFormComponent,
    ConfirmComponent
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
    MatFormFieldModule,
    MatSnackBarModule
  ],
  providers: [
    NovaTarefaFormService,
    ConfirmService,
    SnackbarService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
