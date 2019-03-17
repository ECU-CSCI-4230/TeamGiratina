import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home';
import { LoginComponent } from './pages/login';
import { RegisterComponent } from './pages/register';
import { AccountComponent } from './pages/account';
import { AuthGuard } from './_guards';
import { PreferencesComponent } from './pages/preferences';
import { ContactComponent } from './pages/contact';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'account', component: AccountComponent },
    { path: 'preferences', component: PreferencesComponent},
    { path: 'contact', component: ContactComponent},
    

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);