import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor, ConfirmEqualValidatorDirective } from './_helpers';
import { HomeComponent } from './pages/home';
import { LoginComponent } from './pages/login';
import { RegisterComponent } from './pages/register';
import { AccountComponent } from './pages/account';
import { ContactComponent } from './pages/contact';
import { RecipeShowComponent } from './pages/recipe-show';
import { NewRecipeComponent } from './pages/recipeAdd';
import { RecipeHomeComponent } from './pages/recipe-home';



@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        AccountComponent,
        RegisterComponent,
        RecipeShowComponent,
        NewRecipeComponent,
        RecipeHomeComponent,
        ContactComponent,
        ConfirmEqualValidatorDirective
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ],
    bootstrap: [AppComponent]
})

export class AppModule { }