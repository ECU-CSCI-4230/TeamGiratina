import { Component, OnInit, OnDestroy } from '@angular/core';
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
    users: User[] = [];
    updateForm: FormGroup;
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
    }

    ngOnInit() {
        
        this.updateForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
            phoneNumber: ['', Validators.required],
            notify: [false],
            notifyWater: [false],
            notifyExercise: [false],
            notifyCook: [false]
        });
        
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.updateForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.update(this.updateForm.value)
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
