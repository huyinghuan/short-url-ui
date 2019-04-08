import { Component, Input, EventEmitter} from '@angular/core';
let template:string = `
<div class="ui vertical inverted sticky menu">
  <a class="ui logo icon image" href="/" style="margin-bottom:20px;">
    <img src="/assets/images/logo.png" >
  </a>
  <a class="item" [routerLink]="['short']"  routerLinkActive="active">短链生成</a>
  <a class="item" [routerLink]="['short-query']"  routerLinkActive="active">短链查询与修改</a>
  <a class="item" [routerLink]="['third']"  routerLinkActive="active">第三方API Token申请</a>
</div>
`

@Component({
  selector: '[left-nav]',
  template: template
})
export class LeftNavComponent{
  constructor(){}
}
