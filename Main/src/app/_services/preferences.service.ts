import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Preferences } from '@/_models';

@Injectable({ providedIn: 'root' })
export class PreferencesService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Preferences[]>(`${config.apiUrl}/preferences`);
    }

    getById(id: number) {
        return this.http.get(`${config.apiUrl}/preferences/${id}`);
    }

    register(preferences: Preferences) {
        return this.http.post(`${config.apiUrl}/preferences/register`, preferences);
    }

    update(preferences: Preferences) {
        return this.http.put(`${config.apiUrl}/preferences/${preferences.id}`, preferences);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/preferences/${id}`);
    }
}