import { Component, Input, OnInit, EventEmitter} from '@angular/core';

let template:string = `
  <div class="ui pagination menu" style="margin-bottom: 20px;margin-top:10px">
    <a class="active item"  *ngFor="let page of pageList;" [ngClass]="{'active': page == pageCurrent}" (click)="goto(page)">{{page}}</a>
  </div>
`

@Component({
  selector: 'pagination',
  template: template,
  outputs: ['onGoto']
})
export class Pagination implements OnInit{
  @Input() public pageCount;
  @Input() public pageCurrent;
  public onGoto = new EventEmitter()
  pageList:Array<any>;
  constructor(){}
  getArray(begin, end){
    var list = []
    let i = begin;
      while(i <= end){
        list.push(i)
        i++
      }
      return list
  }
  generatePage(){
    var list = []
    if(this.pageCount < 20){
      return this.getArray(1, this.pageCount)
    }
    //页面数大于20
    let prefix = 7
    let suffix = 7
    //页码靠前
    if(this.pageCurrent < prefix){
      list = this.getArray(1, prefix)
      list.push("...")
      list = list.concat(this.getArray(this.pageCount - 3, this.pageCount))
    //页码考后
    }else if(this.pageCurrent > (this.pageCount - suffix + 1)){
      list = this.getArray(1, 3)
      list.push("...")
      list = list.concat(this.getArray(this.pageCount-suffix,this.pageCount))
    }else{
      //页码靠中
      list = this.getArray(1, 3)
      list.push("...")
      list.push(this.pageCurrent - 2, this.pageCurrent - 1, this.pageCurrent, this.pageCurrent + 1, this.pageCurrent + 2)
      list.push("..")
      list = list.concat(this.getArray(this.pageCount - suffix, this.pageCount))

    }
    return list
  }
  ngOnInit(){
    this.pageCount = this.pageCount || 1
    this.pageCurrent = this.pageCurrent || 1
    this.pageList = this.generatePage()
  }
  ngOnChanges(changes){
    if(changes.pageCount){
      this.pageCount = ~~changes.pageCount.currentValue
    }
    if(changes.pageCurrent){
      this.pageCurrent = ~~changes.pageCurrent.currentValue
    }
    this.pageList = this.generatePage()
  }
  goto(pageIndex){
    if(this.pageCurrent == pageIndex){
      return
    }
    if(pageIndex == "..."){
      return
    }
    this.onGoto.emit(pageIndex)
  }
  ngOnDestroy() {
    
  }
}
