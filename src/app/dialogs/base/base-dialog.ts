import { MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<TDialog> {
  constructor(
    public dialogRef: MatDialogRef<TDialog>) {
  }
  close() {
    this.dialogRef.close();
  }
}
