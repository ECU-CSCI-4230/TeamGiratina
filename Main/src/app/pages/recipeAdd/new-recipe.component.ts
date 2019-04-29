import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

import {  RecipeService, AlertService } from '@/_services';

@Component({
    templateUrl: 'new-recipe.component.html',
    styleUrls: ['new-recipe.component.css',
                './../../../styles.css']
})
export class NewRecipeComponent implements OnInit, OnDestroy {
    recipeForm: FormGroup;
    loading = false;
    submitted = false;
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private recipeService: RecipeService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
        });
    }

    ngOnInit() {
        if (this.currentUser === null) {
            this.router.navigate(['/']);
        } else {
            this.userService.getAll().pipe(first()).subscribe(users => {
                this.users[0] = this.currentUser;
            });
            this.recipeForm = this.formBuilder.group({
                username: [String(this.currentUser.username), Validators.required],
                title: ['', Validators.required],
                description: ['', [Validators.required]],
                serves: ['', Validators.required],
                imageUrl: ['', Validators.required],
                ingredients: ['', [Validators.required]],
                instructions: ['', [Validators.required]]
            });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.recipeForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.recipeForm.invalid) {
            return;
        }

        this.loading = true;
        this.recipeService.createNew(this.recipeForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Recipe added successfully', true);
                    this.router.navigate(['/recipe-home']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers();
        });
    }

}


