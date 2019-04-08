import { Component, OnInit } from '@angular/core';
import { API } from '../services/API';
import { ActivatedRoute } from '@angular/router';
import * as alertjs from 'alertify.js';
const template:string = `
<div class="main">
  <div class="ui form">
    <div class="inline fields">
      <div class="three wide field">
        <input type="text" placeholder="短链"  [(ngModel)]="shortURL.short" readonly>
      </div>
      <div class="five wide field">
        <input type="text" placeholder="URL"  [(ngModel)]="shortURL.url">
      </div>
      <div class="field"><label>分流</label></div>
      <div class="two wide field">
        <select class="ui search dropdown"  [(ngModel)]="shortURL.params">
          <option value="">禁用</option>
          <option value="ip">IP</option>
          <option value="ua">UserAgent</option>
        </select>
      </div>
      <div class="field">
        <button class="ui green button" (click)="save()">保存</button>
        <button class="ui blue button" (click)="deploy()">应用</button>
      </div>
    </div>
  </div>
  <div class="ui divider"></div>
  <div class="ui form">
    <div class="inline fields">
      <div class="field">
        <input type="text" placeholder="描述" [(ngModel)]="version.desc">
      </div>
      <div class="four wide field">
        <input type="text" placeholder="url" [(ngModel)]="version.url">
      </div>
      <div class="field">
        <input type="number" min=1 max=100 placeholder="比例(1-100)"  [(ngModel)]="version.proportion">
      </div>
      <div class="field">
        <button class="ui green button" (click)="saveVersion()">添加</button>
      </div>
    </div>
  </div>
  <div class="ui divider"></div>
  <table class="ui celled striped table">
    <thead>
      <tr>
        <th>描述</th>
        <th>URL</th>
        <th>比例</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let version of versionList">
        <td>{{version.desc}}</td>
        <td>{{version.url}}</td>
        <td>{{version.proportion}}</td>
        <td class="collapsing">
          <div class="ui buttons">
            <button class="ui icon red button"  (click)="delVersion(version.id)" title="删除"><i class="trash icon"></i></button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`
@Component({
  selector: "short-edit-page",
  template: template,
  providers:[API]
})

export class ShortEditPage implements OnInit{
  shortURL = {url: "", short: ""}
  version:any = {}
  versionList:Array<any> = []
  shortList:Array<any> = []
  constructor(private api:API, private route:ActivatedRoute){}
  private subscriptParams
  private params:any = {}
  loadData(){
    this.api.get("short", this.params).then((data:any)=>{
      this.shortURL = data
    })
  }

  ngOnInit() {
    this.subscriptParams = this.route.params.subscribe((params)=>{
      this.params = params
      this.loadData()
      this.loadVersionList()
    })
  }
  ngAfterContentChecked(){}
  ngOnDestroy() {this.subscriptParams.unsubscribe()}

  save(){
    let data = Object.assign({}, this.shortURL)
    delete data.short
    this.api.put("short", this.params, data).then(()=>{
      this.loadData()
    })
  }
  clearForm(){
    this.version = {}
  }
  saveVersion(){
    this.api.post("short.tag", this.params, this.version).then(()=>{
      this.clearForm()
      this.loadVersionList()
    })
  } 
  loadVersionList(){
    this.api.get("short.tag", this.params).then((data:any)=>{
      this.versionList = data
    })
  }
  delVersion(tid){
    this.api.remove("short.tag", Object.assign({tag:tid}, this.params)).then(()=>{
      this.loadVersionList()
    })
  }
  deploy(){
    this.api.get("short.deploy", this.params).then(()=>{
      alertjs.success("操作成功");
    })
  }
}