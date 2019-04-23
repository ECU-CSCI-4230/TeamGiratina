import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { User, Recipe } from '@/_models';
import { UserService, AuthenticationService, RecipeService } from '@/_services';

@Component({ templateUrl: 'recipe-edit.component.html', 
            styleUrls: ['recipe-edit.component.css',
                        './../../../styles.css']
         })
export class RecipeEditComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    recipes: Recipe[] = [];
    recipe: any;
    id: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private recipeService: RecipeService,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.getRecipeById(this.route.snapshot.paramMap.get('id'))
        // show current user
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users[0] = this.currentUser;
        });
        
        
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

    private getRecipeById(id: string) {
        this.recipeService.getById(id).pipe(first()).subscribe(recipe => {
            this.recipe = recipe;
        });
    }

    showRecipes(id: number){
        this.recipeService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllRecipes()
        });
    }

    private loadAllRecipes() {
        this.recipeService.getAll().pipe(first()).subscribe(recipes => {
            this.recipes = recipes;
        });
    }
}