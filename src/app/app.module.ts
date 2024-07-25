import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';

import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';


import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent
  ],
  imports: [BrowserModule,FormsModule,SharedModule,TasksModule],
  bootstrap: [AppComponent],

})
export class AppModule {}
