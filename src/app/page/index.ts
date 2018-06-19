import { Component, OnInit } from '@angular/core';

let template:string = 
`
<div id="container" class="pushable content">
  <div class="toc" left-nav></div>
  <div class="article">
    <div class="ui menu" top-nav></div>
    <div class="pusher">
    <router-outlet></router-outlet>
    </div>
  </div>
</div>
`

@Component({
  selector: 'index-page',
  template: template
})
export class IndexPage implements OnInit  {
  ngOnInit() {}
}
