import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { User, Recipe } from '@/_models';
import { UserService, AuthenticationService, RecipeService } from '@/_services';

@Component({ templateUrl: 'recipe-show.component.html', 
            styleUrls: ['recipe-show.component.css',
                        './../../../styles.css']
         })
export class RecipeShowComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    recipes: Recipe[] = [];
    recipe: Recipe;
    id: String ;

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
        this.id = this.route.snapshot.paramMap.get('id');
        //this.recipe = this.recipeService.getById(this.id);
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