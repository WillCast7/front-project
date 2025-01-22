import { Component, Inject, inject } from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import { ApproachesDialogComponent } from '../../dialogs/approaches-dialog/approaches-dialog.component';
import { CustomerlistInterface } from '../../../models/mercadeo/customerlist-interface';
import { MatButtonModule } from '@angular/material/button';
import { CustomerDialogComponent } from '../../dialogs/customer-dialog/customer-dialog.component';

@Component({
  selector: 'app-customer-bottom-sheet',
  imports: [
    MatBottomSheetModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './customer-bottom-sheet.component.html',
  styleUrl: './customer-bottom-sheet.component.css'
})
export class CustomerBottomSheetComponent {
  readonly dialog = inject(MatDialog);
  private readonly _bottomSheetRef =
  inject<MatBottomSheetRef<CustomerBottomSheetComponent>>(MatBottomSheetRef);

  openApproachesDialog(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();

     const dialogRef = this.dialog.open(ApproachesDialogComponent, {
      width: '80%',   // Ajusta el ancho al 80% de la pantalla
      height: '80%',  // Ajusta la altura al 80% de la pantalla
      maxWidth: '90vw', // Asegúrate de que no exceda el ancho de la ventana
      maxHeight: '90vh',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    }); 

  }
  openCustomerDialog(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();

    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '80%',   // Ajusta el ancho al 80% de la pantalla
      height: '80%',  // Ajusta la altura al 80% de la pantalla
      maxWidth: '90vw', // Asegúrate de que no exceda el ancho de la ventana
      maxHeight: '90vh',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    }); 
  }

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: CustomerlistInterface
  ) {}
}
