import { Component, OnInit } from '@angular/core';
import { ParentService } from '@core/services/parent.service';
import { School } from 'app/auth/models/school';
import * as snippet from 'app/main/forms/form-layout/form-layout.snippetcode';


@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {

  schools:School[] = [];
  public contentHeader: object;


  public _snippetCodeMultiple = snippet.snippetCodeMultiple;
  constructor(private parentService: ParentService) { }

  ngOnInit(): void {
    this.GetSchools();
    this.contentHeader = {
      headerTitle: 'Öğrenci Ekleme',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Öğrencileriniz',
            isLink: true,
            link: '/pages'
          },
          {
            name: 'Öğrenci Ekleme',
            isLink: false,
            link: '/pages/create-student'
          }
        ]
      }
    };
  }
  GetSchools() {
    this.parentService.GetSchools().subscribe((response) => {
      this.schools = response.data;
    });
  }
}
