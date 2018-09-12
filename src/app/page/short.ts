import { Component, OnInit } from '@angular/core';
import { API } from '../services/API';

import { Router } from '@angular/router';
import * as alertjs from 'alertify.js';
const template:string = `
<div class="main">
  <div class="ui form">
    <div class="inline fields">
      <div class="six wide field">
        <input type="text" placeholder="URL"  [(ngModel)]="shortURL.url">
      </div>
      <div class="field">
        <button class="ui blue button" (click)="generate()">生成</button>
      </div>
    </div>
  </div>
  <div class="ui divider"></div>
  <table class="ui celled padded table">
  <thead>
    <tr>
    <!-- <th class="collapsing">状态</th> -->
      <th class="collapsing">短链</th>
      <th style="word-wrap:break-word;word-break:break-all;">URL</th>
      <th class="collapsing">所属用户</th>
      <th class="collapsing">所属应用</th>
      <th class="collapsing">操作</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let short of shortList">
      <!-- 
      <td class="collapsing">
        <i class="gray heartbeat icon"  *ngIf="!short.shortURL.status"></i>
        <i class="red heartbeat icon"  *ngIf="short.shortURL.status"></i>
      </td>
      -->
      <td><a [routerLink]="[short.shortURL.id]">{{short.shortURL.short}}</a></td>
      <td  style="word-wrap:break-word;word-break:break-all;"><a [routerLink]="[short.shortURL.id]">{{short.shortURL.url}}</a></td>
      <td>{{short.userMap.user_id || short.thirdToken.user_id}}</td>
      <td>{{short.thirdToken.app_name}}</td>
      <td class="collapsing table-do">
        <a  [routerLink]="[short.shortURL.id]">编辑</a>
        <a  (click)="sync(short.shortURL.id)">同步</a>
      <!-- 
      <div class="ui buttons">
        <a class="ui green icon button" title="编辑" [routerLink]="[short.shortURL.id]"><i class="edit icon"></i></a>
        <button class="ui blue icon button"  title="同步" (click)="sync(short.shortURL.id)"><i class="sync icon"></i></button>
      </div>
      -->
      </td>
    </tr>
  </tbody>
  </table>
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

export class ShortPage implements OnInit{
  shortURL = {url: ""}
  shortList:Array<any> = []
  constructor(private api:API, private router:Router){}
  page = {
    pageTotal: 1,
    index: 1
  }
  goto(index){
    this.loadList({pageIndex: index, pageSize: 10})
  }
  loadList(params){
    this.api.get("short", params).then((responseData:any)=>{
      this.shortList = responseData.data
      this.page = responseData.page
    })
  }
  ngOnInit() {
    this.loadList({pageIndex: 1, pageSize: 10})
  }
  generate(){
    this.api.post("short",{},this.shortURL).then(()=>{
      this.loadList({})
    })
  }

  sync(id){
    this.api.get("short.sync", {short:id}).then(()=>{
      alertjs.success("Sync succcess");
    })
  }
}