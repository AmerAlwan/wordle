import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-board-container',
  templateUrl: './board-container.component.html',
  styleUrls: ['./board-container.component.css']
})
export class BoardContainerComponent implements OnInit {
  keyboard_letter_status = { 'a': 'default', 'b': 'default', 'c': 'default', 'd': 'default', 'e': 'default', 'f': 'default', 'g': 'default', 'h': 'default', 'i': 'default', 'j': 'default', 'k': 'default', 'l': 'default', 'm': 'default', 'n': 'default', 'o': 'default', 'p': 'default', 'q': 'default', 'r': 'default', 's': 'default', 't': 'default', 'w': 'default', 'v': 'default', 'u': 'default', 'x': 'default', 'y': 'default', 'z': 'default' }
  isMobileDevice: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  screen_height: number = (screen.height * window.devicePixelRatio) - (320 * window.devicePixelRatio);

  constructor() { }

  ngOnInit(): void {
    console.log(window.devicePixelRatio);
  }

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    console.log(window.devicePixelRatio);
    this.isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.screen_height = (screen.height * window.devicePixelRatio) - (320 * window.devicePixelRatio);
  }

}
