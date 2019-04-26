import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({
    selector: 'app-component',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    currentUser: User;

    calendarPlugins = [dayGridPlugin];

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
