import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home';
import { LoginComponent } from './pages/login';
import { RegisterComponent } from './pages/register';
import { AccountComponent } from './pages/account';
import { AuthGuard } from './_guards';
import { ContactComponent } from './pages/contact';
import { RecipeShowComponent } from './pages/recipe-show';
import { NewRecipeComponent } from './pages/recipeAdd';
import { RecipeHomeComponent } from './pages/recipe-home';
import { RecipeEditComponent } from './pages/recipe-edit';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'account', component: AccountComponent },
    { path: 'contact', component: ContactComponent},
    { path: 'recipe-show/:id', component: RecipeShowComponent },
    { path: 'recipe/new', component: NewRecipeComponent },
    { path: 'recipe-home', component: RecipeHomeComponent },
    { path: 'recipe-edit/:id', component: RecipeEditComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);