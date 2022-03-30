import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeydownService {

  private isKeydownEnabledBS: BehaviorSubject<boolean>;
  private isKeydownEnabled: boolean;


  constructor() {
    this.isKeydownEnabled = true;
    this.isKeydownEnabledBS = new BehaviorSubject<boolean>(this.isKeydownEnabled);
  }

  enableKeydown() {
    this.isKeydownEnabled = true;
    this.applyChanges();
  }

  disableKeydown() {
    this.isKeydownEnabled = false;
    this.applyChanges();
  }

  isEnabled(): boolean {
    return this.isKeydownEnabled;
  }

  applyChanges() {
    this.isKeydownEnabledBS.next(this.isKeydownEnabled);
  }

}
