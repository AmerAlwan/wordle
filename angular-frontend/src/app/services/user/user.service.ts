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
  //user daily gamemode streak info
  getDailyStreak(): number {
    return this.user.daily_streak;
  }

  setDailyStreak(value: number) {
    this.user.daily_streak = value;
    if (this.user.daily_best < value)
      this.user.daily_best = value;
    this.applyChanges();
  }

  getDailyBest(): number {
    return this.user.daily_best;
  }
  //user timed gamemode streak info
  getTimedStreak(): number {
    return this.user.timed_streak;
  }

  setTimedStreak(value: number) {
    this.user.timed_streak = value;
    if (this.user.timed_best < value)
      this.user.timed_best = value;
    this.applyChanges();
  }

  getTimedBest(): number {
    return this.user.timed_best;
  }
  //user unlimited gamemode streak info
  getUnlimitedStreak(): number {
    return this.user.unlimited_streak;
  }

  setUnlimitedStreak(value: number) {
    this.user.unlimited_streak = value;
    if (this.user.unlimited_best < value)
      this.user.unlimited_best = value;
    this.applyChanges();
  }

  getUnlimitedBest(): number {
    return this.user.unlimited_best;
  }

  getAnonymousUser() {
    return {
      username: 'Anonymous', token: '',
      daily_streak: 0, timed_streak: 0, unlimited_streak: 0,
      daily_best: 0, timed_best: 0, unlimited_best: 0
    };
  }

  setUser(username: string, token: string) {
    this.user = {
      username: username, token: token,
      daily_streak: 0, timed_streak: 0, unlimited_streak: 0,
      daily_best: 0, timed_best: 0, unlimited_best: 0
    }
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
