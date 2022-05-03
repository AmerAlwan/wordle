import { Component, OnInit, AfterViewInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-draggable-container',
  templateUrl: './draggable-container.component.html',
  styleUrls: ['./draggable-container.component.css']
})
export class DraggableContainerComponent implements OnInit, AfterViewInit {
  @Input() width: number = 150;
  @Input() height: number = 100;
  @Input() left: number = 0;
  @Input() top: number = 0;
  @Input() content: string = "";
  @ViewChild('container') container: ElementRef = {} as ElementRef;
  private boxPosition: { left: number, top: number } = {left: 0, top:0}
  private containerPos: { left: number, top: number, right: number, bottom: number } = { left: 0, top: 0, right: 0, bottom: 0 };
  public mouse: { x: number, y: number } = { x: 0, y: 0 };
  public isClicked: boolean = false;
  private mouseClick: { x: number, y: number, left: number, top: number } = { x: 0, y: 0, left: 0, top: 0 }

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadBox();
    const left = this.boxPosition.left - this.left;
    const top = this.boxPosition.top - this.top;
    let right = left + 600;
    let bottom = top + 450;
    this.containerPos = { left, top, right, bottom };
  }

  loadBox() {
    let { left, top } = this.container.nativeElement.getBoundingClientRect();
    this.boxPosition = { left, top };
  }

  setIsClicked(event: MouseEvent) {
    this.mouseClick = { x: event.clientX, y: event.clientY, left: this.left, top: this.top };
    this.isClicked = true;
  }

  setIsNotClicked() {
    this.loadBox();
    this.isClicked = false;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse = {
      x: event.clientX,
      y: event.clientY
    }

    if (this.isClicked) this.move();
  }

  move() {
    this.left = this.mouseClick.left + (this.mouse.x - this.mouseClick.x);
    this.top = this.mouseClick.top + (this.mouse.y - this.mouseClick.y);
  }

}
