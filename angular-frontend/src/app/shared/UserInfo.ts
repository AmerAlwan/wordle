export interface User {
  username: string;
  token: string;
  daily_streak: number;
  timed_streak: number;
  unlimited_streak: number;
  daily_best: number;
  timed_best: number;
  unlimited_best: number;
}
