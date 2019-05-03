import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
} from '@angular/material';
import * as moment from 'moment';

import { ISnack } from '../../shared/interfaces/shared';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private statusColor = {
    pending: 'orange',
    accepted: 'green',
    rejected: 'red'
  }

  constructor(
    private snack: MatSnackBar
  ) { }
  
  openSnack(option: ISnack) {
    return this.snack.open(option.message, 'X', this.config(option));
  }
  
  private config(option: ISnack) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = option.vertical;
    config.horizontalPosition = option.horizontal;
    config.duration = option.duration;
    config.panelClass = option.class;
    return config;
  }

  getStatus(status: string) {
    return this.statusColor[status];
  }
  
  get timestamp() {
    return moment().format('X');
  }
  
}
