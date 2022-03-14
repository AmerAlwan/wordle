import { Injectable, ErrorHandler } from '@angular/core';
import axios, { AxiosInstance } from "axios";

@Injectable({
  providedIn: 'root'
})
export class SpellCheckerClientService {
  private axiosInstance: AxiosInstance;
  private errorHandler: ErrorHandler;

  constructor(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;
    this.axiosInstance = axios.create({
      timeout: 3000
    });
  }

  public async get(text: string) {
    try {
      var response = await this.axiosInstance.request({
        method: "get",
        url: 'https://api.dictionaryapi.dev/api/v2/entries/en/' + text,
        params: {}
      });

      return true;
    } catch (error) {
      return false;
    }
  }

}
