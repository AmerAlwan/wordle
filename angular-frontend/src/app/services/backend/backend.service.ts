
import { Injectable, ErrorHandler } from '@angular/core';
import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import { User } from '../../shared/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private axiosInstance: AxiosInstance;

  constructor(private errorHandler: ErrorHandler) {
    this.axiosInstance = axios.create({
      timeout: 3000
    });
  }

  public async login(email: string, password: string) {
    try {
      var response = await this.axiosInstance.request({
        method: "post",
        url: "http://localhost:8000/api/users/login",
        data: { email: email, password: password }

      });
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return err.response;
    }
  }

  public async register(username: string, email: string, password: string) {
    try {
      var response = await this.axiosInstance.request({
        method: "post",
        url: "http://localhost:8000/api/users/register",
        data: { username: username, email: email, password: password }

      });
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return err.response;
    }
  }

  public async modifyUser(username: String, mode: String, win: Boolean) {
    try {
      var response = await this.axiosInstance.request({
        method: "patch",
        url: "http://localhost:8000/api/users/modify",
        data: {
          username: username, mode: mode, win: win
        }

      });
      console.log(response);
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return err.response;
    }
  }

  public async saveDaily(word: string, attempts: number,
    success: boolean, difficulty: string, user: User) {
    try {
      var response = await this.axiosInstance.request({
        method: "post",
        url: "http://localhost:8000/api/stats/daily",
        data: {
          username: user.username, word: word, attempts: attempts,
          success: success, difficulty: difficulty
        }

      });
      this.modifyUser(user.username, "daily", success);
      console.log(response);
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return err.response;
    }
  }

  public async saveUnlimited(word: string, attempts: number,
    success: boolean, difficulty: string, user: User) {
    try {
      var response = await this.axiosInstance.request({
        method: "post",
        url: "http://localhost:8000/api/stats/unlimited",
        data: {
          username: user.username, word: word, attempts: attempts,
          success: success, difficulty: difficulty
        }

      });
      this.modifyUser(user.username, "unlimited", success);
      console.log(response);
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return err.response;
    }
  }

  public async saveTimed(word: string, attempts: number, time: number,
    success: boolean, difficulty: string, user: User) {
    try {
      var response = await this.axiosInstance.request({
        method: "post",
        url: "http://localhost:8000/api/stats/timed",
        data: {
          username: user.username, time: time, word: word, attempts: attempts,
          success: success, difficulty: difficulty
        }
      });
      this.modifyUser(user.username, "timed", success);
      console.log(response);
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return err.response;
    }
  }

  public async saveBlitz(words: string, word_count: number, time: number,
    difficulty: string, user: User) {
    try {
      var response = await this.axiosInstance.request({
        method: "post",
        url: "http://localhost:8000/api/stats/blitz",
        data: {
          username: user.username, time: time, words: words, word_count: word_count, difficulty: difficulty
        }

      });
      console.log(response);
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return err.response;
    }
  }




  public async getUser(username: String) {
    try {
      var response = await this.axiosInstance.request({
        method: "get",
        url: "http://localhost:8000/api/users/stats/"+username
      });
      return response["data"];
    } catch (error) {
      const err = error as AxiosError;
      return err.response;
    }
  };
}
