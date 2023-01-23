import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token!: string;

    constructor (private userService: UserService) {}

    getToken(): string {
        return this.token;
    }

    login(username: string, password: string): void {
        // if (this.userService.getAllUsers().find(user => user.username===username && user.password===password))
        // {
        //     this.token = 'My Token';
        // }
        this.token = 'My fake token';
    }
}