import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Preferences } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Preferences[]>(`${config.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${config.apiUrl}/users/${id}`);
    }

    register(preferences: Preferences) {
        return this.http.post(`${config.apiUrl}/users/register`, preferences);
    }

    update(preferences: Preferences) {
        return this.http.put(`${config.apiUrl}/users/${preferences.id}`, preferences);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
}