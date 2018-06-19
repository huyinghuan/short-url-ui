import { Component } from '@angular/core';

let template:string = 
`
<h1>找不到该页面，404 返回 <a [routerLink]="['']">首页</a></h1>
`
@Component({
  selector: "page-404",
  template: template
})
export class Page404 {}
