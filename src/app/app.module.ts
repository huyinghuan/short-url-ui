import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import {HttpModule} from '@angular/http'
import { FormsModule }   from '@angular/forms'; 

import { AppComponent } from './page/app';
import {LeftNavComponent} from './components/left-nav';
import {Pagination} from './components/pagination';
import { IndexPage } from './page/index';
//====== 二层页面

import { API } from './services/API';
import { Page404 } from './page/page-404';

import  * as alertjs from 'alertify.js'
import { TopNavComponent } from './components/top-nav';
import { ShortPage } from './page/short';
import { ShortEditPage } from './page/short-edit'
import { ShortQueryPage } from './page/short-query';
import { ThirdPage}from './page/third'
import {ThirdEditPage} from './page/third-edit'
import { NoOwnerPage } from './page/no-owner';

alertjs.logPosition("bottom right").maxLogItems(5).delay(10000).okBtn("确认").cancelBtn("取消").setLogTemplate(function(input){
  let q = [];
  (input as string).split('\n').forEach((item)=>{
    q.push(`<p>${item}</p>`)
  })
  return q.join('')
});

var router = RouterModule.forRoot([
  {path: "", redirectTo:"/index/short", pathMatch:"full"},
  { path: "index",
    component: IndexPage,
    children:[{
        path: "short", component: ShortPage
    },{
      path: "short-query", component: ShortQueryPage
    },{
      path: "short/:short", component: ShortEditPage
    },{
      path: "third", component: ThirdPage,
    },{
        path: "third/:id", component: ThirdEditPage,
    },{
      path: "noowner", component: NoOwnerPage
    }
    ]
  },
  // {path: '404', component: Page404},
  // {path: '**', redirectTo: '/404'}
])

@NgModule({
  declarations: [
    AppComponent,
    LeftNavComponent,
    TopNavComponent,
    Pagination,
    Page404,
    IndexPage,
    ShortPage,
    ShortEditPage,
    ShortQueryPage,
    ThirdPage,
    ThirdEditPage,
    NoOwnerPage
  ],
  imports: [
    BrowserModule , HttpModule, FormsModule, router
  ],
  providers: [API],
  bootstrap: [AppComponent]
})

export class AppModule { }
