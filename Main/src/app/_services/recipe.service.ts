import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '@/_models';

@Injectable({ providedIn: 'root' })
export class RecipeService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Recipe[]>(`${config.apiUrl}/recipes`);
    }

    getById(id: string) {
        return this.http.get(`${config.apiUrl}/recipes/${id}`);
    }

    getByUserId(username: string) {
        return this.http.get<Recipe[]>(`${config.apiUrl}/recipes/${username}`);
    }

    createNew(recipe: Recipe) {
        return this.http.post(`${config.apiUrl}/recipes/createNew`, recipe);
    }

    update(recipe: Recipe) {
        return this.http.put(`${config.apiUrl}/recipes/${recipe.id}`, recipe);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/recipes/${id}`);
    }
}