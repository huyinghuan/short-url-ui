import { Component, OnInit } from '@angular/core';
import { API } from '../services/API';

import { Router } from '@angular/router';
import * as alertjs from 'alertify.js';
const template:string = `
<div class="main">
  <table class="ui celled padded table">
  <thead>
    <tr>
    <!-- <th class="collapsing">状态</th> -->
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
        <a  (click)="map2None(short.shortURL.id)">映射到None</a>
      </td>
      <td>{{short.shortURL.short}}</td>
      <td  style="word-wrap:break-word;word-break:break-all;">{{short.shortURL.url}}</td>
      <td class="collapsing">{{short.userMap.user_id || short.thirdToken.user_id}}</td>
      <td class="collapsing">{{short.thirdToken.app_name}}</td>

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

export class NoOwnerPage implements OnInit{
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
    this.api.get("short.noowner", params).then((responseData:any)=>{
      this.shortList = responseData.data
      this.page = responseData.page
    })
  }
  ngOnInit() {
    this.loadList({pageIndex: 1, pageSize: 10})
  }
  map2None(id){
    this.api.post("short.map.to.none", {short: id}).then(()=>{
      this.loadList({pageIndex: 1, pageSize: 10})
    })
  }
}