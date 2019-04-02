import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {  RecipeService, AlertService } from '@/_services';

@Component({
    templateUrl: 'new-recipe.component.html',
    styleUrls: ['new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
    recipeForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private recipeService: RecipeService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.recipeForm = this.formBuilder.group({
            // username: ['', Validators.required],
            title: ['', Validators.required],
            // description: ['', [Validators.required]],
            // serves: ['', Validators.required],
            // imageUrl: [''],
            // ingredients: ['', [Validators.required]],
            // instructions: ['', [Validators.required]]
        });
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
                    this.router.navigate(['/recipes-show']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}

  