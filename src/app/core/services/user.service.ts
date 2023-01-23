import { Observable, map, tap } from "rxjs";
import { User } from "../models/user.model"
import { HttpClient } from '@angular/common/http';

export class UserService {

    userList!: User[];
    constructor(private http: HttpClient) {}

    

    getAllUsers(): User[] {
        this.http.get<User[]>('http://localhost:3000/users').pipe(
            tap((users) => this.userList = users)
        );
        return this.userList;
    }

    findUserById(id: number): Observable<User> {
        return this.http.get<User>(`http://localhost:3000/users/${id}`);
    }




}