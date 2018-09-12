import { Component, OnInit } from '@angular/core';
import { API } from '../services/API';

import { Router } from '@angular/router';
const template:string = `
<div class="main">
  <div class="ui form">
    <div class="inline fields">
      <div class="two wide field">
        <input type="text" placeholder="应用名称"  [(ngModel)]="app.app_name">
      </div>
      <div class="six wide field">
        <input type="text" placeholder="长链域名白名单 多个用逗号 , 分开，非白名单域名禁止生成短链"  [(ngModel)]="app.blank_list" >
      </div>
      <div class="field">
        <button class="ui blue button" (click)="generate()">生成</button>
      </div>
      <div class="field">
        <a href="http://git.hunantv.com/huyinhuan/shorturl/blob/master/README.md" target="_blank">如何使用?</a>
      </div>
    </div>
  </div>
  <div class="ui divider"></div>
  <table class="ui celled padded table">
  <thead>
    <tr>
      <th class="collapsing">应用名称</th>
      <th>Token</th>
      <th>域名白名单</th>
      <th>操作</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let app of appList">
      <td>{{app.app_name}}</td>
      <td>{{app.token}}</td>
      <td>{{app.blank_list}}</td>
      <td>
       暂时禁止操作
      </td>
    </tr>
  </tbody>
  </table>
  <pagination (onGoto)="goto($event)" [pageCount]="page.pageTotal"  [pageCurrent]="page.index"></pagination>
</div>
`
@Component({
  selector: "third-page",
  template: template,
  providers:[API]
})

export class ThirdPage implements OnInit{
  app = { app_name: "", blank_list: "" }
  appList:Array<any> = []
  constructor(private api:API, private router:Router){}
  page = {
    pageTotal: 1,
    index: 1
  }
  goto(index){
    this.loadList()
  }
  loadList(){
    this.api.get("token", {}).then((responseData:any)=>{
      this.appList = responseData.data
      this.page = responseData.page
    })
  }
  ngOnInit() {
    this.loadList()
  }
  generate(){
    this.api.post("token", {}, this.app).then(()=>{
        this.loadList()
    })
  }

}