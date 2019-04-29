import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User, Recipe } from '@/_models';
import { UserService, AuthenticationService, RecipeService } from '@/_services';

@Component({ templateUrl: 'recipe-home.component.html',
            styleUrls: ['recipe-home.component.css',
                        './../../../styles.css']
         })
export class RecipeHomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    recipes: Recipe[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private recipeService: RecipeService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        if (this.currentUser.username === 'Giratina') {
            // show all users
            this.loadAllUsers();
        } else {
            this.loadAllRecipes();
        }
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers();
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    showRecipes(id: number) {
        this.recipeService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllRecipes();
        });
    }

    private loadAllRecipes() {
        this.recipeService.getAll().pipe(first()).subscribe(recipes => {
            this.recipes = recipes;
        });
    }
}
