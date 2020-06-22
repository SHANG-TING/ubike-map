import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UBikeService } from './ubike';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (ubikeService: UBikeService) => () => ubikeService.init(),
      deps: [UBikeService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
