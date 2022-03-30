import { Component, OnInit, HostListener, AfterViewChecked, AfterViewInit } from '@angular/core';
import { AppSettingsService } from '../../../services/appsettings/app-settings.service';
import { AppSettings } from '../../../shared/AppSettings';

@Component({
  selector: 'app-board-container',
  templateUrl: './board-container.component.html',
  styleUrls: ['./board-container.component.css']
})
export class BoardContainerComponent implements OnInit, AfterViewChecked, AfterViewInit {
  keyboard_letter_status = this.getKeyboardLetterStatus();
  isMobileDevice: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  screen_height: number = (document.documentElement.scrollHeight) - 60;

  constructor(private appSettingsService: AppSettingsService) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    //this.appSettingsService.setScreenHeight();
    console.log(this.appSettingsService.getScreenHeight());
  }

  ngAfterViewInit(): void {
   // this.appSettingsService.setScreenHeight();
  }

  handleKeyboaordLetterStatusResetEvent() {
    this.keyboard_letter_status = this.getKeyboardLetterStatus();
  }

  getKeyboardLetterStatus() {
    return { 'a': 'default', 'b': 'default', 'c': 'default', 'd': 'default', 'e': 'default', 'f': 'default', 'g': 'default', 'h': 'default', 'i': 'default', 'j': 'default', 'k': 'default', 'l': 'default', 'm': 'default', 'n': 'default', 'o': 'default', 'p': 'default', 'q': 'default', 'r': 'default', 's': 'default', 't': 'default', 'w': 'default', 'v': 'default', 'u': 'default', 'x': 'default', 'y': 'default', 'z': 'default' };
  }

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.screen_height = (document.documentElement.scrollHeight) - 60;
  }



}
