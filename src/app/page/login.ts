import { Component } from '@angular/core';
import { API } from '../services/API';
import * as alertjs from 'alertify.js';
import {Router} from "@angular/router";
let template:string = 
`
<div class="ui middle aligned center aligned grid" style="height: 100%">
<div class="column" style="max-width: 450px;">
  <h2 class="ui teal image header">
    <!--<img src="/assets/images/logo.png" class="logo">-->
    <div class="content">Nginx Panel</div>
  </h2>
  <form class="ui large form">
    <div class="ui stacked segment">
      <div class="field">
        <div class="ui left icon input">
          <i class="user icon"></i>
          <input type="text" placeholder="用户名" [(ngModel)]="user.username" name="user" >
        </div>
      </div>
      <div class="field">
        <div class="ui left icon input">
          <i class="lock icon"></i>
          <input type="password" placeholder="密码" [(ngModel)]="user.password" name="password" (keyup)="keyup($event)">
        </div>
      </div>
      <div class="ui fluid large teal submit button" (click)="login(user)">Login</div>
    </div>
  </form>
</div>
`

@Component({
  selector: "login",
  template: template,
  providers:[API]
})
export class LoginPage {
  user = {
    username:"",
    password:""
  }
  constructor(private api:API, private router:Router){}
  keyup(e){
    if(e.keyCode == 13){
      e.stopPropagation()
      this.login(this.user)
      return
    }
  }
  login(user){
    let trimUsername:string = (user && user.username) ? user.username.replace(/\s/g, "") : ""
    let trimPassword:string= (user && user.password) ? user.password.replace(/\s/g, ""):""
    if (trimUsername.length == 0 || (trimUsername.length !=  user.username.length)){
      alertjs.error("用户名不能为空或者包含空格")
      return 
    }
    if (trimPassword.length == 0 || (trimPassword.length !=  user.password.length)){
      alertjs.error("密码不能为空或者包含空格")
      return 
    }
    this.api.post("session", {}, user).then((data)=>{
     // this.router.navigateByUrl("/index/machine");
    })
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    document.querySelector('body').setAttribute("class", "bg")
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.querySelector('body').removeAttribute("class")
  }
}
