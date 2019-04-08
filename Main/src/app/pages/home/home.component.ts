import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular'; 

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ 
    selector: 'app-root',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
 })

export class HomeComponent implements OnInit{
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

// Full Calendar bs ==============================================

    options: OptionsInput;
    eventsModel: any;
    @ViewChild('fullcalendar') calendarComponent: FullCalendarComponent;

    calendarPlugins = [dayGridPlugin];

// ===============================================================

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
                  alert('yeet!');
                }
              }
            },
            header: {
              left: 'prev, next today myCustomButton',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            plugins: [ dayGridPlugin, interactionPlugin ]
        };

        // =======================================================================


        /*
        if(this.currentUser.username === "Giratina"){
            // show all users
            this.loadAllUsers(); 
        } else {
            // show current user
            this.userService.getAll().pipe(first()).subscribe(users => {
                this.users[0] = this.currentUser;
            });
        }**/
        
    }

    eventClick(model: any) {
        console.log(model);
    }

    eventDragStop(model: any) {
        console.log(model);
    }

    dateClick(model: any) {
        console.log(model);
    }

    handleDateClick(arg: any) {
        alert(arg.dateStr);
    }

    updateHeader() {
        this.options.header = {
            left: 'prev, next today myCustomButton',
            center: 'title',
            right: 'timeGridDay'
        };
    }

    updateEvents() {
        this.eventsModel = [{
          title: 'Update Event',
          start: this.yearMonth + '-08',
          end: this.yearMonth + '-10'
        }];
    }
    get yearMonth(): string {
        const dateObj = new Date();
        return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
    }

    // calendar API stuff
    someMethod() {
        let calendarApi = this.calendarComponent.getApi();
        calendarApi.next();
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