import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor, ConfirmEqualValidatorDirective } from './_helpers';
import { HomeComponent } from './pages/home';
import { LoginComponent } from './pages/login';
import { RegisterComponent } from './pages/register';
import { AccountComponent } from './pages/account';
import { PreferencesComponent } from './pages/preferences';
import { ContactComponent } from './pages/contact';
import { RecipeshowComponent } from './pages/recipe-show';

// Imported syncfusion button module from buttons package
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        AccountComponent,
        RegisterComponent,
        PreferencesComponent,
        RecipeshowComponent,
        ContactComponent,
        ConfirmEqualValidatorDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClient,

        // Registering EJ2 Button Module
        ButtonModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ],
    bootstrap: [AppComponent]
})

export class AppModule { }