import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent } from 'ng-fullcalendar';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];

// Full Calendar bs ==============================================
    options: OptionsInput;
    eventsModel: any;
    @ViewChild('fullcalendar') fullcalendar: CalendarComponent;
// ===============================================================

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        
        // calendar bs ========================================================
        this.eventService.getEvents().subscribe(data => {
            this.calendarOptions = {
                editable: true,
                eventLimit: false,
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay,listMonth'
                },
                selectable: true,
                events: [],
            };
        });

        // =======================================================================

        if(this.currentUser.username === "Giratina"){
            // show all users
            this.loadAllUsers();
        } else {
            // show current user
            this.userService.getAll().pipe(first()).subscribe(users => {
                this.users[0] = this.currentUser;
            });
        }
        
    }

    clearEvents() {
        this.events = [];
    }

    loadEvents() {
        this.eventService.getEvents().subscribe(data => {
            this.events = data;
        });
    }
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}