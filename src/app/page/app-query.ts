import { Component, OnInit } from '@angular/core';
import { API } from '../services/API';

import { Router } from '@angular/router';
import * as alertjs from 'alertify.js';
const template:string = `
<div class="main">
  <div class="ui form">
    <div class="inline fields">
      <div class="six wide field">
        <input type="text" placeholder="app token"  [(ngModel)]="token" (keyup)="queryFinish($event)">
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
  <pagination (onGoto)="goto($event)" [pageCount]="page.pageTotal"  [pageCurrent]="page.index"></pagination>
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

export class AppQueryPage{
  token = ""
  shortList:Array<any> = []
  pageSize = 10
  page = {
    pageTotal: 1,
    index: 1
  }
  constructor(private api:API, private router:Router){}
  goto(index){
    this.loadList({pageIndex: index, pageSize: this.pageSize, app_token: this.token})
  }
  queryFinish(event: any){
    if(event.keyCode != 13){
      return
    }
    this.query()
  }
  loadList(params){
    this.api.get("short", params).then((responseData:any)=>{
      this.shortList = responseData.data
      this.page = responseData.page
    })
  }
  query(){
    this.shortList = []
    if(!this.token){
      return
    }
    this.loadList({pageIndex: 1, pageSize: this.pageSize,app_token: this.token})
  }
}