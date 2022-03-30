import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameInfo } from '../../shared/GameInfo';

@Injectable({
  providedIn: 'root'
})
export class GameInfoService {

  gameInfo: GameInfo;
  gameInfoBS: BehaviorSubject<GameInfo>;

  constructor() {
    this.gameInfo = this.getDefaultValues();
    this.gameInfoBS = new BehaviorSubject<GameInfo>(this.gameInfo);
  }

  watchGameInfo(): Observable<GameInfo> {
    return this.gameInfoBS.asObservable();
  }

  setGameStatus(value: string) {
    this.gameInfo.gameStatus = value;
    this.applyChanges();
  }

  getDefaultValues(): GameInfo {
    return { gameStatus: 'ongoing' };
  }

  getGameStatus(): string {
    return this.gameInfo.gameStatus;
  }

  applyChanges() {
    this.gameInfoBS.next(this.gameInfo);
  }

  isGameStatusWin(): boolean {
    return this.getGameStatus() === 'win';
  }

  isGameStatusOngoing(): boolean {
    return this.getGameStatus() === 'ongoing';
  }

  isGameStatusLose(): boolean {
    return this.getGameStatus() === 'lose';
  }

}
