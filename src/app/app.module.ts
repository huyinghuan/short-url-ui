import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import {HttpModule} from '@angular/http'
import { FormsModule }   from '@angular/forms'; 

import { AppComponent } from './page/app';
import {LeftNavComponent} from './components/left-nav';
import { IndexPage } from './page/index';
import { LoginPage } from './page/login';
//====== 二层页面

import { API } from './services/API';
import { Page404 } from './page/page-404';

import  * as alertjs from 'alertify.js'
import { TopNavComponent } from './components/top-nav';
import { ShortPage } from './page/short';
import { ShortEditPage } from './page/short-edit'

alertjs.logPosition("bottom right").maxLogItems(5).delay(10000).okBtn("确认").cancelBtn("取消").setLogTemplate(function(input){
  let q = [];
  (input as string).split('\n').forEach((item)=>{
    q.push(`<p>${item}</p>`)
  })
  return q.join('')
});

var router = RouterModule.forRoot([
  {path: "", redirectTo:"/index/short", pathMatch:"full"},
  {path: 'login',component: LoginPage},
  { path: "index",
    component: IndexPage,
    children:[{
        path: "short", component: ShortPage
    },{
      path: "short/:short", component: ShortEditPage
    }]
  },
  // {path: '404', component: Page404},
  // {path: '**', redirectTo: '/404'}
])

@NgModule({
  declarations: [
    AppComponent,
    LeftNavComponent,
    TopNavComponent,
    LoginPage,
    Page404,
    IndexPage,
    ShortPage,
    ShortEditPage
  ],
  imports: [
    BrowserModule , HttpModule, FormsModule, router
  ],
  providers: [API],
  bootstrap: [AppComponent]
})

export class AppModule { }
