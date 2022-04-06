export class AppSettings {
  numOfLetters: number = 5;
  numOfAttempts: number = 6;
  noSecondChance: boolean = false;
  forcedReuse: boolean = false;
  backgroundMode: string = 'color';
  colorValue: string = '121213';
  backgroundValue: string = '';
  difficulty: string = 'easy';
  gameMode: string = 'daily';
  timedModeTimeLimitInMinutes: number = 60;
  blitzModeTimeLimitInMinutes: number = 60;
  screenHeight: number = window.innerHeight;
}
