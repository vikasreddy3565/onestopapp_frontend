import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActionButton } from 'src/app/models/export.model';
import { LoaderService } from 'src/app/service/loader.service';
import { LookupService } from 'src/app/service/lookup.service';

@Component({
  selector: 'app-actionbuttons',
  templateUrl: './actionbuttons.component.html',
  styleUrls: ['./actionbuttons.component.scss'],
})
export class ActionbuttonsComponent implements OnInit, OnChanges {
  @Input() buttons: ActionButton[];
  @Input() formName = '';
  @Input() displayBusy = false;
  @Output() actionButtonClickEvent = new EventEmitter<string>();
  displayDialogue = false;
  isHttpRequestInProgress = false;
  rightButtons: ActionButton[] = [];
  leftButtons: ActionButton[] = [];
  constructor(private lookupService: LookupService, private loaderService: LoaderService) { }

  ngOnInit() {
    if (!this.buttons) {
      this.buttons = this.lookupService.getActionButtons();
    }
    this.buttons.sort(a => a.displayOrder).map(a => {
      if (a.align === 'left') {
        this.leftButtons.push(a);
      } else {
        this.rightButtons.push(a);
      }
    });
    this.loaderService.status.subscribe((val: boolean) => {
      this.isHttpRequestInProgress = val;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.displayBusy && this.displayBusy) {
      this.displayDialogue = true;
    } else if (!this.displayBusy) {
      this.displayDialogue = false;
    }
    if (changes.actionButtons && !changes.actionButtons.firstChange) {
      this.ngOnInit();
    }
  }

  actionButtonClick(eventKey) {
    this.actionButtonClickEvent.emit(eventKey);
  }
}
