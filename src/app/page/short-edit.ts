import { Component, OnInit } from '@angular/core';
import { API } from '../services/API';
import { ActivatedRoute } from '@angular/router';
const template:string = `
<div class="main">
  <div class="ui form">
    <div class="inline fields">
      <div class="four wide field">
        <input type="text" placeholder="短链"  [(ngModel)]="shortURL.short" readonly>
      </div>
      <div class="six wide field">
        <input type="text" placeholder="URL"  [(ngModel)]="shortURL.url">
      </div>
      <div class="field">
        <button class="ui blue button" (click)="save()">保存</button>
      </div>
    </div>
  </div>
</div>
`
@Component({
  selector: "short-edit-page",
  template: template,
  providers:[API]
})

export class ShortEditPage implements OnInit{
  shortURL = {url: "", short: ""}
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
}