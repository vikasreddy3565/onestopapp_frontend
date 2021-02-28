import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng';
import { HeaderComponent } from './header.component';
@NgModule({
  imports: [MenubarModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
  providers: [],
})
export class HeaderModule {}
