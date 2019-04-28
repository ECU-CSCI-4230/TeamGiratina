import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { OptionsInput } from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarComponent } from '@fullcalendar/angular';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({
    selector: 'app-root',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css',
                './../../../styles.css']
 })

export class HomeComponent implements OnInit {
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

// Full Calendar ==============================================


    options: OptionsInput;
    eventsModel: any;
    @ViewChild('fullcalendar') calendarComponent: FullCalendarComponent;

    calendarVisible = true;
    calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
    calendarWeekends = true;
    calendarEvents: EventInput[] = [
        { title: 'Event Now', start: new Date() }
    ];

// ===============================================================

    ngOnInit() {

        // calendar ========================================================
        this.options = {
            editable: true,
            allDaySlot: true,
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
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ]
        };
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

    toggleVisible() {
        this.calendarVisible = !this.calendarVisible;
    }

    toggleWeekends() {
        this.calendarWeekends = !this.calendarWeekends;
    }

    gotoPast() {
        const calendarApi = this.calendarComponent.getApi();
        calendarApi.gotoDate('1277-01-01'); // call a method on the Calendar object
  }

    handleDateClick(arg: any) {
        if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
            this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
                title: 'New Event',
                start: arg.date,
                allDay: arg.allDay
            });
        }
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
        const calendarApi = this.calendarComponent.getApi();
        calendarApi.next();
    }
}

