import { Component, Input, EventEmitter} from '@angular/core';
let template:string = `
<div class="ui vertical inverted sticky menu">
  <a class="ui logo icon image" href="/">
    <img src="/assets/images/logo.png" >
  </a>
  <!--<a class="item" [routerLink]="['machine']"  routerLinkActive="active">服务器列表</a>-->
</div>
`

@Component({
  selector: '[left-nav]',
  template: template
})
export class LeftNavComponent{
  constructor(){}
}
