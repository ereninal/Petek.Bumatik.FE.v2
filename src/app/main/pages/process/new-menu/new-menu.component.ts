import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AutomatService } from '@core/services/automat.service';
import { ParentService } from '@core/services/parent.service';
import { AutomatItem } from 'app/auth/models/automatItem';
import { MenuType } from 'app/auth/models/menuType';
import { Student } from 'app/auth/models/student';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.scss']
})
export class NewMenuComponent implements OnInit {
  public DefaultDateOptions: FlatpickrOptions = {
    defaultDate: '2019-03-19',
    altInput: true
  };
  public contentHeader: object;
  public minDate = new Date().getFullYear() +'-'+new Date().getMonth()+'-'+new Date().getDay();
  public returnUrl: string;
  modelForm!:FormGroup;
  automatItems:AutomatItem[] = [];
  student?:Student;
  menuTypes:MenuType[] = [];
  model!:FormArray;
  studentId?:number;
  constructor(private formBuilder:FormBuilder,private parentService:ParentService,private title:Title,private route:ActivatedRoute,private automatService:AutomatService,private toastService:ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.getAutomatItems();
    this.loadStudent();
    this.getMenuTypes();
    this.createMenuSelectForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/pages/menus/'+this.studentId;
    this.contentHeader = {
      headerTitle: 'İşlemler',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Öğrenci İşlemleri',
            isLink: false
            
          },
          {
            name: 'Menü İşlemleri',
            isLink: false
          },
          
        ]
      }
    };
  }
  createMenuSelectForm(){
    this.modelForm = this.formBuilder.group({
      menuTypeId:["",Validators.required],
      useDate:["",Validators.required],
      selectedAutomatItems: this.formBuilder.array([]),
    })
  }
  loadStudent(){
    this.studentId =Number(this.route.snapshot.paramMap.get('id'));
    this.getStudentInfo(this.studentId);
  }
  getMenuTypes(){
    this.automatService.getMenuTypes().subscribe((response)=>{

      this.menuTypes = response.data;
    })
  }
  getAutomatItems(){
    this.automatService.getAutomatItems().subscribe((response)=>{
      this.automatItems = response.data;
    });
  }
  getStudentInfo(id?:number){
    this.parentService.getStudentById(id).subscribe((response)=>{
      this.student = response.data;
    })
  }
  addNewItem():FormGroup{
    return this.formBuilder.group({
      itemId: ['', Validators.required],
      count: [1, Validators.required],
    });
    
  }
  get selectedAutomatItems():FormArray{
    return this.modelForm.get("selectedAutomatItems") as FormArray;
  }
  removeSelectedItem(i:number){
    this.selectedAutomatItems.removeAt(i);
  }
  addselectedAutomatItems(){
    this.selectedAutomatItems.push(this.addNewItem())
  }
  addSelectedMenuByStudent(){
    if(this.modelForm.valid){
      let selectedItemModel = Object.assign({studentId:Number(this.studentId)},this.modelForm.value);
      this.parentService.AddSelectedMenuByStudent(selectedItemModel).subscribe((response)=>{
        this.toastService.success(response.message.toString(),"Başarılı");
        this.router.navigate([this.returnUrl]);
      },responseError=>{
        if(responseError.error.Errors.length>0){
          console.log(responseError);
          // for (let i = 0; i < responseError.error.Errors.length; i++) {
          //   this.toastService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası.")
          // }
        }
      })
    }
    else{
      this.toastService.warning("Formunuz eksik","Dikkat");
    }
  }

}
