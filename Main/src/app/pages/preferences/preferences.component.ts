import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '@/_models';
import { AlertService, UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'preferences.component.html', 
            styleUrls: ['preferences.component.css',
            './../../../styles.css']
         })
export class PreferencesComponent implements OnInit{
    currentUser: User;
    currentUserSubscription: Subscription;
    userForm: FormGroup;
    loading = false;
    submitted = false;
    notify: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
        this.notify = this.currentUser.notify;
    }
    

    ngOnInit() {
        
        
        this.userForm = this.formBuilder.group({
            firstName: [this.currentUser.firstName, Validators.required],
            lastName: [this.currentUser.lastName, Validators.required],
            email: [this.currentUser.email, [Validators.required, Validators.email]],
            username: [this.currentUser.username, Validators.required],
            password: [this.currentUser.password, [Validators.required, Validators.minLength(6)]],
            confirmPassword: [this.currentUser.password, [Validators.required, Validators.minLength(6)]],
            phoneNumber: [this.currentUser.phoneNumber],
            notify: [this.currentUser.notify],
            notifyWater: [this.currentUser.notifyWater],
            notifyExercise: [this.currentUser.notifyExercise],
            notifyCook: [this.currentUser.notifyCook]
        });
        
    }

    // convenience getter for easy access to form fields
    get f() { return this.userForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.userForm.invalid) {
            return;
        }

        this.loading = true;


        this.userService.update(this.userForm.value)
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


    }

}
