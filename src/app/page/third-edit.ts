import { Component, OnInit } from '@angular/core';
import { API } from '../services/API';

import { ActivatedRoute } from '@angular/router';
const template:string = `
<div class="main">
  <div class="ui form">
    <div class="inline fields">
      <div class="two wide field">
        <input type="text" placeholder="应用名称"  [(ngModel)]="app.app_name">
      </div>
    </div>
    <div class="inline fields">
      <div class="six wide field">
        <input type="text" placeholder="长链域名白名单 多个用逗号 , 分开，非白名单域名禁止生成短链,如: m.mgtv.com"  [(ngModel)]="app.blank_list" >
      </div>
    </div>
    <div class="inline fields">
      <div class="field">
        <button class="ui blue button" (click)="save()">保存</button>
      </div>
  </div>
  </div>
</div>
`
@Component({
  selector: "third-edit-page",
  template: template,
  providers:[API]
})

export class ThirdEditPage implements OnInit{
  app = { app_name: "", blank_list: "" }
  constructor(private api:API, private route:ActivatedRoute){}
  private subscriptParams
  private params:any = {}
  ngOnInit() {
    this.subscriptParams = this.route.params.subscribe((params)=>{
      this.params = params
      this.loadData()
    })
    
  }
  loadData(){
    this.api.get("token",{token:this.params.id}).then((data:any)=>{
      this.app = data
    })
  }
  ngOnDestroy() {this.subscriptParams.unsubscribe()}
  save(){
    this.api.put("token", {token:this.params.id}, {app_name: this.app.app_name, blank_list: this.app.blank_list}).then((data:any)=>{
      this.loadData()
    })
  }

}