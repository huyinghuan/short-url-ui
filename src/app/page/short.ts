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
      <th class="collapsing">状态</th>
      <th>短链</th>
      <th>URL</th>
      <th>操作</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let short of shortList">
      <td class="collapsing">
        <i class="gray heartbeat icon"  *ngIf="!short.status"></i>
        <i class="red heartbeat icon"  *ngIf="short.status"></i>
      </td>
      <td><a [routerLink]="[short.id]">{{short.short}}</a></td>
      <td><a [routerLink]="[short.id]">{{short.url}}</a></td>

      <td class="collapsing">
      <div class="ui buttons">
        <a class="ui green icon button" title="编辑" [routerLink]="[short.id]"><i class="edit icon"></i></a>
        <button class="ui blue icon button"  title="同步" (click)="sync(short.id)"><i class="sync icon"></i></button>
      </div>
      </td>
    </tr>
  </tbody>
  </table>
</div>
`
@Component({
  selector: "short-page",
  template: template,
  providers:[API]
})

export class ShortPage implements OnInit{
  shortURL = {url: ""}
  shortList:Array<any> = []
  constructor(private api:API, private router:Router){}
  loadList(){
    this.api.get("short").then((data:Array<any>)=>{
      this.shortList = data
    })
  }
  ngOnInit() {
    this.loadList()
  }
  generate(){
    this.api.post("short",{},this.shortURL).then(()=>{
      this.loadList()
    })
  }

  sync(id){
    this.api.get("short.sync", {short:id}).then(()=>{
      alertjs.success("Sync succcess");
    })
  }
}