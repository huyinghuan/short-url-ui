import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { API } from '../services/API';
import { Router, NavigationEnd } from '@angular/router';
declare var jQuery:any
import * as alertjs from 'alertify.js';
let template:string = `
  <div class="ui large breadcrumb" style="margin-top:10px; margin-left:20px;">
    <a class="section" [routerLink]="['/index/short']" >首页</a>
  </div>
  <div class="right menu">
    <a class="item">{{username}}</a>
    <a class="item"(click)="logout()">注销</a>
  </div>
`
@Component({
  selector: '[top-nav]',
  template: template
})
export class TopNavComponent implements OnInit{
  username = "未登录"
  constructor(private api:API){}
  ngOnInit(){
    // this.api.get("session").then((data)=>{
    //   this.username = (data as any).name
    // })
  }
  logout(){
    this.api.remove("session")
  }
}
