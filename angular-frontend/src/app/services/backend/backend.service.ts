import { Injectable, ErrorHandler } from '@angular/core';
import axios, { AxiosInstance, AxiosError } from "axios";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private axiosInstance: AxiosInstance;
  private errorHandler: ErrorHandler;

  constructor(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;
    this.axiosInstance = axios.create({
      timeout: 3000
    });
  }

  public async login(email: string, password: string) {
    try {
      var response = await this.axiosInstance.request({
        method: "post",
        url: "http://127.0.0.1:8000/api/users/login",
        data: {email: email, password: password}

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
        url: "http://127.0.0.1:8000/api/users/register",
        data: { username: username, email: email, password: password }

      });
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return err.response;
    }
  }

}
