import { Injectable, ErrorHandler } from '@angular/core';
import axios, { AxiosInstance, AxiosError } from "axios";

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private dailyWord: string = '';
  private dailyDefinition: string = '';
  private unlimitedWord: string = '';
  private unlimitedDefinition: string = '';
  private timedWord: string = '';
  private timedDefinition: string = '';
  private blitzWord: string = '';
  private blitzDefinition: string = '';

  private axiosInstance: AxiosInstance;

  constructor(private errorHandler: ErrorHandler) {
    this.axiosInstance = axios.create({
      timeout: 3000
    });
  }

  public async requestUnlimitedWord(num_of_letters: number) {
    try {
      var response = await this.axiosInstance.request({
        method: "post",
        url: "http://127.0.0.1:8000/api/word/get",
        data: { num_of_letters: num_of_letters }
      });
      console.log(response.data);
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return err.response;
    }
  }

  getDailyWord(): string {
    return this.dailyWord;
  }

  getUnlimitedWord(): string {
    return this.unlimitedWord;
  }

  getTimedWord(): string {
    return this.timedWord;
  }

  getBlitzWord(): string {
    return this.blitzWord;
  }

  getDailyDefinition(): string {
    return this.dailyDefinition;
  }

  getUnlimitedDefinition(): string {
    return this.unlimitedDefinition;
  }

  getTimedDefinition(): string {
    return this.timedDefinition;
  }

  getBlitzDefinition(): string {
    return this.blitzDefinition;
  }

  setDailyWord(value: string) {
    this.dailyWord = value;
  }

  setUnlimitedWord(value: string) {
    this.unlimitedWord = value;
  }

  setTimedWord(value: string) {
    this.timedWord = value;
  }

  setBlitzWord(value: string) {
    this.blitzWord = value;
  }

  setDailyDefinition(value: string) {
    this.dailyDefinition = value;
  }

  setUnlimitedDefinition(value: string) {
    this.unlimitedDefinition = value;
  }

  setTimedDefinition(value: string) {
    this.timedDefinition = value;
  }

  setBlitzDefinition(value: string) {
    this.blitzDefinition = value;
  }

}
