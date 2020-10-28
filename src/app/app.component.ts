import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from './service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showLoader: boolean;
  constructor(
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
      this.cdr.detectChanges();
    });
  }
}
