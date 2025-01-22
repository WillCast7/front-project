import { Component, inject, OnInit  } from '@angular/core';
import { BasicTableComponent } from "../../../tables/basic-table/basic-table.component";
import { CustomerInitializer, CustomerlistInterface } from '../../../../models/mercadeo/customerlist-interface';
import { PageableInitializer, PageableInterface } from '../../../../models/table/pageable-interface';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CustomerListNamesInterface } from '../../../../models/mercadeo/customerListNames-interface';
import { RestApiService } from '../../../../services/rest-api.service';
import { AlertService } from '../../../../services/alerts.service';
import { Router } from '@angular/router';
import {  CurrencyPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ApproachesDialogComponent } from '../../../dialogs/approaches-dialog/approaches-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { AdvisorListInitializer, AdvisorListInterface } from '../../../../models/mercadeo/adviserList-interface';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CustomerBottomSheetComponent } from '../../../bottom-sheets/customer-bottom-sheet/customer-bottom-sheet.component';


@Component({
  selector: 'app-customers, currency-pipe',
  imports: [
    MatDialogModule,  
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CurrencyPipe,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatPaginatorModule
],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  dataSource : CustomerlistInterface[] = [CustomerInitializer];
  thisYear: number = new Date().getFullYear();
  title: string = "Listado de clientes";
  displayedNames: CustomerListNamesInterface = {
    "name":'Nombre',
    "nit": 'Nit',
    "anterior2": 'Ventas ' + (this.thisYear -2),
    "anterior1": 'Ventas ' + (this.thisYear -1),
    "actual" : 'Ventas ' + this.thisYear ,
    'city': 'Ciudad',
    'asesor':'Asesor',
    'completado':'Completado'
  };
  displayedColumns: string[] = [
    'nit',
    'name',
    'actual',
    'anterior1',
    'anterior2',
    'city',
    'asesor',
    'completado'
  ];

  filteredOptions!: Observable<string[]>;
  pageable: PageableInterface = PageableInitializer;
  customerExample : CustomerlistInterface = CustomerInitializer;
  myControl = new FormControl('');
  //options paginator
  pageSizeOptions = [5, 10, 25];
  hidePageSize: boolean = false;
  showPageSizeOptions: boolean = true;
  showFirstLastButtons: boolean = true;
  disabled: boolean = false;
  pageEvent: PageEvent = new PageEvent;
  readonly dialog = inject(MatDialog);
  searchValue: string= '';
  private _bottomSheet = inject(MatBottomSheet);
  
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageable.totalElements = e.length;
    this.pageable.pageSize = e.pageSize;
    this.pageable.pageIndex = e.pageIndex;
    console.log("this.pageable")
    console.log(this.pageable)
    this.getData(this.pageable.pageIndex, this.pageable.pageSize, this.searchValue);
  }


  ngOnInit() {
    this.getData(this.pageable.pageIndex, this.pageable.pageSize, this.searchValue);
  }


  
  constructor(
    private readonly restService: RestApiService,
    private readonly alertService: AlertService,
    private readonly router: Router,
  ) {} 

  openBottomSheet(row: CustomerlistInterface) {
    this._bottomSheet.open(CustomerBottomSheetComponent,{
      data: row
    });
  }

  getData(page: Number, row: Number, searchValue: string) {
    console.log(this.router.url);
    this.dataSource = [];

    this.restService.getRequest(this.router.url, {page, row, searchValue}).subscribe({
      next: (objData) => {
        this.dataSource = objData.data;
        this.pageable.totalElements = objData.pageable.totalElements;
      },
      error: (error) => {
        this.alertService.infoMixin.fire({
          icon: 'error',
          title: error.error.message,
        });
      },
      complete: () => console.info('transaction complete'),
    });
  }

  searchData(){
    this.pageable.pageIndex = 0;
    this.getData(this.pageable.pageIndex, this.pageable.pageSize, this.searchValue);
  }
}
