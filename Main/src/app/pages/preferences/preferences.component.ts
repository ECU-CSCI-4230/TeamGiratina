import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
    preferenceForm: FormGroup;
    loading = false;
    submitted = false;
    newNotify: boolean;

    constructor(
        //private formBuilder: FormBuilder,
        //private router: Router,
        private authenticationService: AuthenticationService,
        //private userService: UserService,
        //private alertService: AlertService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
        this.newNotify = this.currentUser.notify;
    }
    

    ngOnInit() {
        this.preferenceForm = new FormGroup ({
            firstname: new FormControl(this.currentUser.firstName, {
              validators: Validators.required,
              updateOn: 'submit'
            }),
            lastname: new FormControl(this.currentUser.lastName, {
              validators: Validators.required,
              updateOn: 'submit'
            }),
            
          });
/*
        this.updateUserForm = this.formBuilder.group({
            newFirstName: [this.currentUser.firstName, Validators.required],
            newLastName: [this.currentUser.lastName, Validators.required],
            newEmail: [this.currentUser.email, [Validators.required, Validators.email]],
            newUsername: [this.currentUser.username, Validators.required],
            newPassword: [this.currentUser.password, [Validators.required, Validators.minLength(6)]],
            newConfirmPassword: [this.currentUser.password, [Validators.required, Validators.minLength(6)]],
            newPhoneNumber: [this.currentUser.phoneNumber],
            newNotify: [this.currentUser.notify],
            newNotifyWater: [this.currentUser.notifyWater],
            newNotifyExercise: [this.currentUser.notifyExercise],
            newNotifyCook: [this.currentUser.notifyCook]
        });

    */    
    }

    // convenience getter for easy access to form fields
    get f() { return this.userForm.controls; }

    
    onSubmit() {
        /*
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

                */


            this.userForm.patchValue({
                firstName: "test",
                lastName: "another test"
            })  
    }
    

    updateName(newName: String){
        this.userForm.setValue({
            firstName: newName,
        })
    }

}
