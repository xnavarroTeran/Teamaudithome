import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule }  from "@angular/material/card";
import { MatIconModule }  from "@angular/material/icon";
import { MatToolbarModule }  from "@angular/material/toolbar";
import { MatButtonModule }  from "@angular/material/button";
import { MatFormFieldModule }  from "@angular/material/form-field";
import { MatInputModule }  from "@angular/material/input";
import { MatGridListModule }  from "@angular/material/grid-list";
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputEmailComponent } from './shared-components/input-email/input-email.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient} from "@angular/common/http";
import { LoadingIndicatorComponent } from './shared-components/loading-indicator/loading-indicator.component';
import { TeamauditHomeComponent } from './components/teamaudit-home/teamaudit-home.component';
import { MyAcctComponent } from './components/myacct/myacct.component';
import { VmenuMainComponent } from './shared-components/vmenu-main/vmenu-main.component';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { first } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const APP_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    InputEmailComponent,
    LoadingIndicatorComponent,
    TeamauditHomeComponent,
    MyAcctComponent,
    VmenuMainComponent
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'es',
    })
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: APP_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
