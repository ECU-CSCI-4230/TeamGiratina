import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'preferences.component.html' })
export class PreferencesComponent implements OnInit{
    preferenceForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) {
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/preferences']);
        }
    }

    ngOnInit() {
        
        this.preferenceForm = this.formBuilder.group({
            phoneNumber: ['', Validators.required],
            notifications: ['']
        });
        
    }

    get f() { return this.preferenceForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.preferenceForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.preferenceForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Setting preferences successful', true);
                    this.router.navigate(['/account']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}