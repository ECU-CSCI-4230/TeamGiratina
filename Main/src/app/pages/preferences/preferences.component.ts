import { Component, OnInit, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '@/_models';
import { AlertService, UserService, AuthenticationService, PreferencesService } from '@/_services';

@Component({ templateUrl: 'preferences.component.html', 
            styleUrls: ['preferences.component.css',
            './../../../styles.css']
         })
export class PreferencesComponent implements OnInit{
    currentUser: User;
    currentUserSubscription: Subscription;
    userForm: FormGroup;
    preferenceForm: FormGroup;
    loading = false;
    submitted = false;
    notify: boolean;

    constructor(
        //private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        //private userService: UserService,
        private alertService: AlertService,
        private preferencesService: PreferencesService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }
    

    ngOnInit() {
        this.preferenceForm = new FormGroup ({
            firstname: new FormControl(this.currentUser.firstName),
            lastname: new FormControl(this.currentUser.lastName),
            notify: new FormControl(false, {
                updateOn: 'blur'
            }),
            notifyWater: new FormControl(false, {
                updateOn: 'submit'
            }),
            notifyCook: new FormControl(false, {
                updateOn: 'submit'
            }),
            notifyExercise: new FormControl(false, {
                updateOn: 'submit'
            }),
          });

    }

    // convenience getter for easy access to form fields
    get f() { return this.userForm.controls; }

    
    onSubmit() {

        this.submitted = true;

        // stop here if form is invalid
        if (this.preferenceForm.invalid) {
            return;
        }

        this.loading = true;

        
        this.loading = true;
        this.preferencesService.register(this.preferenceForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update successful', true);
                    this.router.navigate(['/account']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });


/*
    this.preferenceForm.patchValue({
        notify: true,
        notifyWater: true,
        notifyCook: false,
        notifyExercise: true 
    })
*/
    }
    


}
