import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
        this.options = {
      editable: true,
      events: [{
        title: 'Long Event',
        start: this.yearMonth + '-07',
        end: this.yearMonth + '-10'
      }],
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function() {
            alert('clicked the custom button!');
          }
        }
      },
      header: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      plugins: [ dayGridPlugin, interactionPlugin ]
    };

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

    eventClick(model) {
        console.log(model);
    }

    eventDragStop(model) {
        console.log(model);
    }

    dateClick(model) {
        console.log(model);
    }

    updateEvents() {
        this.eventsModel = [{
            title: 'Update Event',
            start: this.yearMonth + '-08',
            end: this.yearMonth + '-10'
        }];
    }

/*
    clearEvents() {
        this.events = [];
    }

    loadEvents() {
        this.eventService.getEvents().subscribe(data => {
            this.events = data;
        });
    }
*/

    get yearMonth(): string {
        const dateObj = new Date();
        return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
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