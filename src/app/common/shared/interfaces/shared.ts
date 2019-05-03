import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';

export interface ISnack {
  message: string;
  duration: number;
  class: string[],
  horizontal: MatSnackBarHorizontalPosition,
  vertical: MatSnackBarVerticalPosition
}
