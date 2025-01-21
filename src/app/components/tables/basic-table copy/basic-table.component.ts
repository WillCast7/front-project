import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CustomerlistInterface } from '../../../models/mercadeo/customerlist-interface';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { PageableInitializer, PageableInterface } from '../../../models/table/pageable-interface';
import { MatPaginatorModule } from '@angular/material/paginator';



@Component({
  selector: 'app-basic-table',
  imports: [
    MatIconModule,
    MatTableModule,
    FormsModule,
    MatPaginatorModule
  ],
  templateUrl: './basic-table.component.html',
  styleUrl: './basic-table.component.css'
})
export class BasicTableComponent {
  
  activeRule: string = '';
  searched: boolean = false;
  valueSearch: string = '';

  maxPage: number = 1;
  
  pages: number[] = [10, 20, 50, 100];
  pageableData: PageableInterface = PageableInitializer;
  displayedColumns: string[] = [];
  dataSource: any = [];

  @Input() set columns(columns: string[]) {
    this.displayedColumns = columns;
  }

  @Input() set data(data: any) {
    this.dataSource = data;
  }

  @Input() set pageable(pageable: PageableInterface) {
    this.pageableData = pageable;
  }
    
@Output() action: EventEmitter<string> = new EventEmitter();

  clickOption( row: CustomerlistInterface ) {
    alert("this button is working? " )
    var dialogRef;
  }

}
