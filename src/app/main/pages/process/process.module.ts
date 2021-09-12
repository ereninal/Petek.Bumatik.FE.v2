import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { FormsModule } from "app/main/forms/forms.module";
import { QuillModule } from "ngx-quill";
import { CsvModule } from '@ctrl/ngx-csv';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { AuthGuard } from 'app/auth/helpers';


import { NewMenuComponent } from 'app/main/pages/process/new-menu/new-menu.component';
import { MenusComponent } from 'app/main/pages/process/menus/menus.component';
import { MenuDetailComponent } from 'app/main/pages/process/menu-detail/menu-detail.component';
import { NgModule } from "@angular/core";
import { StudentsComponent } from './students/students.component';
import { StudentDetailComponent } from "./student-detail/student-detail.component";
import { CreateStudentComponent } from './create-student/create-student.component';

const routes: Routes = [
    {
      path: '',
      component: StudentsComponent,
      canActivate: [AuthGuard],
    },
    {
        path: 'student-detail/:bandNumber',
        component: StudentDetailComponent,
        canActivate: [AuthGuard],
      },
    {
      path: 'new-menu/:id',
      component: NewMenuComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'menus/:id',
      component: MenusComponent,
      canActivate: [AuthGuard],
      
    },
    {
      path: 'menu-details',
      component: MenuDetailComponent,
      canActivate: [AuthGuard],
    },{
      path: 'create-student',
      component: CreateStudentComponent,
      canActivate: [AuthGuard],
    }
  ];


@NgModule({
    declarations: [NewMenuComponent,MenusComponent,MenuDetailComponent, StudentsComponent, CreateStudentComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      ContentHeaderModule,
      CoreCommonModule,
      QuillModule.forRoot(),
      NgSelectModule,
      FormsModule,
      NgbModule,
      NgxDatatableModule,
      CsvModule,
      TranslateModule,
      CardSnippetModule,
      
    ],
  
    providers: []
  })
export class ProcessModule{}