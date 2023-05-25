import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService<TComponent> {

  constructor(private dialog:MatDialog) { }

  openDialog(dialogParameters:Partial<DialogParameters<TComponent>>): void {
    let status:boolean = false;
    const dialogRef = this.dialog.open(dialogParameters.componentType, {
      width: dialogParameters.options?.width,
      height: dialogParameters.options?.height,
      data:dialogParameters.data,
      position:dialogParameters.options?.position
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == dialogParameters.data)
        {

          console.log("onaylandı...");
          dialogParameters.afterClosed(dialogParameters.params?.id);
        }
      
      
    });
   
  }
}
export class DialogParameters<T> {
  componentType:ComponentType<T>;
  data:any;
  afterClosed:(param?:any)=>void;
  params?:Partial<DialogParams>
  options?:Partial<DialogOptions> = new DialogOptions();
}
export class DialogOptions {
  width?:string = "250px";
  height?:string;
  position?:DialogPosition
}
export class DialogParams{
  id?:string;
}
