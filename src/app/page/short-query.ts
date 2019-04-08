import { Component, OnInit } from '@angular/core';
import { API } from '../services/API';

import { Router } from '@angular/router';
import * as alertjs from 'alertify.js';
const template:string = `
<div class="main">
  <div class="ui form">
    <div class="inline fields">
      <div class="six wide field">
        <input type="text" placeholder="短链"  [(ngModel)]="url" (keyup)="queryFinish($event)">
      </div>
      <div class="field">
        <button class="ui blue button" (click)="query()">查询</button>
      </div>
    </div>
  </div>
  <div class="ui divider"></div>
  <div class="data-table">
    <table class="ui celled padded table">
    <thead>
      <tr>
        <th class="collapsing">操作</th>
        <th class="collapsing">短链</th>
        <th style="word-wrap:break-word;word-break:break-all;">URL</th>
        <th class="collapsing">用户</th>
        <th class="collapsing">应用</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let short of shortList">
        <td class="collapsing table-do">
          <a  [routerLink]="['/index/short',short.shortURL.id]">编辑</a>
        </td>
        <td><a [routerLink]="[short.shortURL.id]">{{short.shortURL.short}}</a></td>
        <td  style="word-wrap:break-word;word-break:break-all;"><a [routerLink]="[short.shortURL.id]">{{short.shortURL.url}}</a></td>
        <td class="collapsing">{{short.userMap.user_id || short.thirdToken.user_id}}</td>
        <td class="collapsing">{{short.thirdToken.app_name}}</td>

      </tr>
    </tbody>
    </table>
  </div>
</div>
`
var style = `
  .table-do a{
    margin-left: 5px;
    cursor: pointer;
  }
`

@Component({
  selector: "short-page",
  template: template,
  styles: [style],
  providers:[API]
})

export class ShortQueryPage{
  url = ""
  shortList:Array<any> = []
  constructor(private api:API, private router:Router){}
  queryFinish(event: any){
    if(event.keyCode != 13){
      return
    }
    this.query()
  }

  query(){
    this.shortList = []
    if(!this.url){
      return
    }
    if(this.url.indexOf("http://") == -1 && this.url.indexOf("https://") == -1){
      this.url = "https://"+this.url;
    }
    this.api.get(`short.query.any`,{}, {url: this.url}).then((data:Array<any>)=>{
      data = data ? data : []
      if(data.length == 0){
        alertjs.error("查无此数据");
        return
      }
      this.shortList = data
    })
  }
}