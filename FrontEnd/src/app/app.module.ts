import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppleTradingComponent } from './apple-trading.component';
import { AppleTradingRouter } from './routing/router.module';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { BuyerComponent } from './main/buyer/buyer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GrowersComponent } from './main/growers/growers.component';
import { BuyComponent } from './main/growers/buy/buy.component';
import { GrowerComponent } from './main/growers/grower/grower.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule, MatFormFieldModule, MatTableModule, MatInputModule, MatDatepickerModule, MatOptionModule, MatSelectModule, MatNativeDateModule } from '@angular/material';


@NgModule({
  declarations: [
    AppleTradingComponent,
    MainComponent,
    HeaderComponent,
    BuyerComponent,
    BuyComponent,
    GrowersComponent,
    GrowerComponent

  ],
  imports: [
    BrowserModule,
    AppleTradingRouter,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    MatNativeDateModule
    
  ],
  providers: [
    
  ],
  bootstrap: [
    AppleTradingComponent
  ]
})
export class AppModule { }
