import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentService } from '@core/services/parent.service';
import { School } from 'app/auth/models/school';
import * as snippet from 'app/main/forms/form-layout/form-layout.snippetcode';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {

  schools:School[] = [];
  public selectBasicLoading = false;
  public contentHeader: object;
  studentAddForm!:FormGroup ;
  public returnUrl:string;
  public _snippetCodeMultiple = snippet.snippetCodeMultiple;

 
  constructor(private parentService: ParentService,private formBuilder:FormBuilder,private toastService:ToastrService,private router: Router,private route:ActivatedRoute,) { }

  
  ngOnInit(): void {
    this.GetSchools();
    this.createStudentForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/pages';
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
      this.selectBasicLoading = false;
    });
  }
  createStudentForm(){
    this.studentAddForm = this.formBuilder.group({
      fullName:["",Validators.required],
      bandNumber:["",Validators.required],
      schoolId:["",Validators.required],
      birthDate:["",Validators.required],
    })
  }
  addStudent(){
    if (this.studentAddForm.valid) {

      let studentModel = Object.assign({parentId:Number(localStorage.getItem("currentUserId"))},this.studentAddForm.value);
      console.log(studentModel)
      this.parentService.addStudent(studentModel).subscribe(response=>{
        this.toastService.success(response.message.toString(),"Başarılı");
        this.router.navigate([this.returnUrl]);
      },responseError=>{
        this.toastService.error(responseError,"Hata");

        // if(responseError.error.Errors.length>0){
        //   for (let i = 0; i < responseError.error.Errors.length; i++) {
        //     this.toastService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası.")
        //   }
          
        // }
        // else{
        //   this.toastService.error(responseError,"Hata");
        // }
          
      });
    }else{
      this.toastService.warning("Formunuz eksik","Dikkat");
    }
    
    
  }
}
