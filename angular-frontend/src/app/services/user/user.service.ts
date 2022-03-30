import { assertPlatform } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../shared/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;
  private isLoggedIn: boolean;
  private userBS: BehaviorSubject<User>;

  constructor() {
    this.isLoggedIn = false;
    this.user = this.getAnonymousUser();
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

  getAnonymousUser() {
    return { username: 'Anonymous', token: '' };
  }

  setUser(username: string, token: string) {
    this.user = { username: username, token: token }
    this.applyChanges();
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn = true;
  }

  loadUserFromLocalStorage() {
    let jsonUser = localStorage.getItem('user');
    if (jsonUser) {
      this.user = JSON.parse(jsonUser);
      this.setIsLoggedIn(true);
      this.applyChanges();
    }
  }

  saveUserToLocalStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  logout() {
    this.user = this.getAnonymousUser();
    this.setIsLoggedIn(false);
    localStorage.removeItem('user');
    this.applyChanges();
    window.location.reload();
  }

  applyChanges() {
    this.userBS.next(this.user);
  }

}
