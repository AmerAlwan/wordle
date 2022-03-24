import { Component, OnInit, OnChanges, Input, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BackendService } from '../../../../services/backend/backend.service';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-profile-dropdown-form',
  templateUrl: './profile-dropdown-form.component.html',
  styleUrls: ['./profile-dropdown-form.component.css'],
  animations: [
    trigger('revealUsernameField', [
      state('reveal', style({
      })),
      state('hide', style({
        opacity: 0,
        height: 0
      })),
      transition('hide => reveal', [
        animate('0.2s 0.1s')
      ]),
      transition('reveal => hide', [
        style({ opacity: 0 }),
        animate('0.3s 0.1s')
      ])
    ])
  ]
})
export class ProfileDropdownFormComponent implements OnInit, OnChanges {
  @Input() isDropdownOpen: boolean = false;
  backendService: BackendService;
  userService: UserService;
  isRegisterMode: boolean = false;
  username: string = '';
  email: string = '';
  password: string = '';
  isSuccess: boolean = false;
  isRegistered: boolean = false;
  isError: boolean = false;
  responseMessage: string = '';


  constructor(backendService: BackendService, userService: UserService) {
    this.backendService = backendService;
    this.userService = userService;
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.isError = false;
    this.isSuccess = false;
    this.resetFields();
  }

  toggleRegisterMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.resetFields();
  }

  resetFields() {
    this.username = '';
    this.email = '';
    this.password = '';
  }

  submitForm() {
    if (!this.isRegisterMode) { 
      this.backendService.login(this.email, this.password).then(response => {
        if (response) {
          if (response.status === 200) {
            this.isError = false;
            this.isSuccess = true;
            this.responseMessage = 'Successfully logged in as ' + response.data.username;

            let data = response.data;
            this.userService.setIsLoggedIn(true);
            this.userService.setUser(data.username, data.token);

          } else if (response.status === 400) {
            this.isError = true;
            this.isSuccess = false;
            this.responseMessage = 'Account with credentials does not exist!';
          } else {
            this.isError = true;
            this.isSuccess = false;
            this.responseMessage = 'Something went wrong!';
          }
        }
      });
    } else if (this.isRegisterMode) {
      this.backendService.register(this.username, this.email, this.password).then(response => {
        if (response) {
          if (response.status === 201) {
            this.isError = false;
            this.isRegistered = true;
            this.isRegisterMode = false;
            this.responseMessage = 'Successfully registered as ' + response.data.username;
          } else if (response.status === 400) {
            this.isError = true;
            this.isSuccess = false;
            this.responseMessage = 'Account with credentials already exists!';
          } else {
            this.isError = true;
            this.isSuccess = false;
            this.responseMessage = 'Something went wrong!';
          }
        }
      });
    }
  }

}
