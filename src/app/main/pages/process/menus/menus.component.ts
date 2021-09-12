import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import * as snippet from 'app/main/tables/datatables/datatables.snippetcode';


import { ParentService } from '@core/services/parent.service';
import { StudentMenu } from 'app/auth/models/studentMenu';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {
  studentId!: number;
  menuInfos:StudentMenu[] = [];
  private tempData = [];

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



  constructor(private route:ActivatedRoute,private parentService:ParentService ) { }

  ngOnInit(): void {
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
            name: 'Geçmiş',
            isLink: false
            
          },
          
        ]
      }
    };
    this.getStudendId();
    this.getMenuInfoByStudent(this.studentId);
  }
  getStudendId(){
    this.studentId =Number(this.route.snapshot.paramMap.get('id'));
  }
  getMenuInfoByStudent(id:number){
    this.parentService.GetAllSelectedMenusByStudent(id).subscribe((response)=>{
      this.menuInfos = response.data;
    })
  }
}
