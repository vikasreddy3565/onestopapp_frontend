import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SelectItem, SelectItemGroup} from 'primeng/primeng';
import {HttpTokenService} from './httptoken.service';
import { ActionButton, ButtonActionsEnum } from '../models/export.model';

@Injectable()
export class LookupService {


  constructor(
  ) {
  }

  getActionButtons(): ActionButton[] {
    const buttons: ActionButton[] = [];
    buttons.push(new ActionButton('Back', 'Back', ButtonActionsEnum.Back, true, false, 1, 'fa fa-arrow-left'));
    buttons.push(new ActionButton('Save', 'Save', ButtonActionsEnum.Save, true, false, 2, 'fa fa-floppy-o'));
    buttons.push(new ActionButton('Submit', 'Submit', ButtonActionsEnum.Submit, true, false, 3, 'fa fa-floppy-o'));
    buttons.push(new ActionButton('Cancel', 'Cancel', ButtonActionsEnum.Cancel, true, false, 4, 'fa fa-home'));
    return buttons;
  }
}
