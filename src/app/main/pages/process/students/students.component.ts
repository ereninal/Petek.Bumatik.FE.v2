import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

import { CoreTranslationService } from '@core/services/translation.service';

import { locale as german } from 'app/main/tables/datatables/i18n/de';
import { locale as english } from 'app/main/tables/datatables/i18n/en';
import { locale as french } from 'app/main/tables/datatables/i18n/fr';
import { locale as portuguese } from 'app/main/tables/datatables/i18n/pt';

import * as snippet from 'app/main/tables/datatables/datatables.snippetcode';


import { Student } from 'app/auth/models/student';
import { ParentService } from '@core/services/parent.service';



@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class StudentsComponent implements OnInit {

  private tempData = [];
  public  students:Student[] = [];
  // public
  public contentHeader: object;
  public rows: any;
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public editingName = {};
  public editingStatus = {};
  public editingAge = {};
  public editingSalary = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  public exportCSVData;


  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  public _snippetCodeKitchenSink = snippet.snippetCodeKitchenSink;
  public _snippetCodeInlineEditing = snippet.snippetCodeInlineEditing;
  public _snippetCodeRowDetails = snippet.snippetCodeRowDetails;
  public _snippetCodeCustomCheckbox = snippet.snippetCodeCustomCheckbox;
  public _snippetCodeResponsive = snippet.snippetCodeResponsive;
  public _snippetCodeMultilangual = snippet.snippetCodeMultilangual;

   /**
   * Inline editing Name
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
    inlineEditingUpdateName(event, cell, rowIndex) {
      this.editingName[rowIndex + '-' + cell] = false;
      this.rows[rowIndex][cell] = event.target.value;
      this.rows = [...this.rows];
    }
  
    /**
     * Inline editing Age
     *
     * @param event
     * @param cell
     * @param rowIndex
     */
    inlineEditingUpdateAge(event, cell, rowIndex) {
      this.editingAge[rowIndex + '-' + cell] = false;
      this.rows[rowIndex][cell] = event.target.value;
      this.rows = [...this.rows];
    }
  
    /**
     * Inline editing Salary
     *
     * @param event
     * @param cell
     * @param rowIndex
     */
    inlineEditingUpdateSalary(event, cell, rowIndex) {
      this.editingSalary[rowIndex + '-' + cell] = false;
      this.rows[rowIndex][cell] = event.target.value;
      this.rows = [...this.rows];
    }
  
    /**
     * Inline editing Status
     *
     * @param event
     * @param cell
     * @param rowIndex
     */
    inlineEditingUpdateStatus(event, cell, rowIndex) {
      this.editingStatus[rowIndex + '-' + cell] = false;
      this.rows[rowIndex][cell] = event.target.value;
      this.rows = [...this.rows];
    }
  
    /**
     * Search (filter)
     *
     * @param event
     */
    filterUpdate(event) {
      const val = event.target.value.toLowerCase();
  
      // filter our data
      const temp = this.tempData.filter(function (d) {
        return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
      });
  
      // update the rows
      this.kitchenSinkRows = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
  
    /**
     * Row Details Toggle
     *
     * @param row
     */
    rowDetailsToggleExpand(row) {
      this.tableRowDetails.rowDetail.toggleExpandRow(row);
    }
  
    /**
     * For ref only, log selected values
     *
     * @param selected
     */
    onSelect({ selected }) {
      console.log('Select Event', selected, this.selected);
  
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
    }
  
    /**
     * For ref only, log activate events
     *
     * @param selected
     */
    onActivate(event) {
      // console.log('Activate Event', event);
    }
  
    /**
     * Custom Chkbox On Select
     *
     * @param { selected }
     */
    customChkboxOnSelect({ selected }) {
      this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
      this.chkBoxSelected.push(...selected);
    }
  
    /**
     * Constructor
     *
     * @param {DatatablesService} _datatablesService
     * @param {CoreTranslationService} _coreTranslationService
     */


  constructor(private _coreTranslationService: CoreTranslationService,private parentService:ParentService) { 
    this._coreTranslationService.translate(english, french, german, portuguese);
  }

  ngOnInit(): void {
    this.GetAllStudentbyParent();
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
          
        ]
      }
    };
  }
  GetAllStudentbyParent(){
    this.parentService.GetAllStudentbyParent().subscribe((response)=>{
      this.rows=response.data;
      this.students = this.rows;
      this.exportCSVData = this.rows;
      
    },responseError => {
      console.log(responseError);
      // if(responseError.error.Errors.length>0){
        
      //   for (let i = 0; i < responseError.error.Errors.length; i++) {
      //     //this.toastService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası.")
      //     console.log(responseError.error.Errors[i].ErrorMessage)
      //   }
      // }
    })
  }
}
