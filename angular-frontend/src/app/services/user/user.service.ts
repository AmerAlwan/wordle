import { assertPlatform } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../shared/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  isLoggedIn: boolean;
  userBS: BehaviorSubject<User>;
  constructor() {
    this.isLoggedIn = false;
    this.user = { username: 'Anonymous', token: '' };
    this.userBS = new BehaviorSubject<User>(this.user);
  }

  watchUser(): Observable<User> {
    return this.userBS.asObservable();
  }

  getUser(): User {
    return this.user;
  }

  getUsername(): string {
    return this.user.username;
  }

  getToken(): string {
    return this.user.token;
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
}

  setUser(username: string, token: string) {
    this.user = { username: username, token: token }
    this.applyChanges();
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn = true;
  }


  applyChanges() {
    this.userBS.next(this.user);
  }

}
