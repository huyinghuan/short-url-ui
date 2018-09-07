import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response  } from '@angular/http';
import {Router, ActivatedRoute} from "@angular/router";
import  * as alertjs from 'alertify.js'

@Injectable()
export class API {
  private urlParams:any = {}
  constructor(private http:Http, private router:Router, private activeRoute:ActivatedRoute){}
  tranformRoute(urlstr:string, params?:any){
    params = params || {}
    let urlArr = urlstr.split(".")
    let resultRouteArr = ["/api"]
    for(let i = 0; i < urlArr.length; i++){
      resultRouteArr.push(urlArr[i])
      let urlParamValue = params[urlArr[i]]
      if(urlParamValue){
        resultRouteArr.push(urlParamValue)
        delete params[urlArr[i]]
      }
    }
    let query = Object.keys(params).map(function(key) {
      return encodeURIComponent(key) + '=' +
          encodeURIComponent(params[key]);
    }).join('&')
    if(query != ""){
      query = "?"+query
    }
    return resultRouteArr.join("/") + query
  }
  fetch(url, defparams, data, method="GET"){
    url = this.tranformRoute(url, defparams)
    let options:RequestOptionsArgs=  {
      method:method
    }
    if(method!="GET"){
      options.body = JSON.stringify(data);
    }else{
      options.params = data;
    }

    return new Promise((resolve, reject)=>{
      this.http.request(url,options).subscribe((response:Response)=>{
        if(method!="GET"){
          alertjs.success("操作成功！")
        }
        if(response.headers.get("content-type") && response.headers.get("content-type").indexOf('json')!=-1){
          resolve(response.json())
        }else{
          resolve(response.text())
        }
      }, (errorResponse:Response)=>{
        let msg = errorResponse.text()
        switch(errorResponse.status){
          case 401: 
            window.location.href = errorResponse.headers.get("Location")
            break;
          case 403:
            alertjs.error(msg);
            break;
          case 404:
            this.router.navigateByUrl("/404");
            break;
          case 406:
            alertjs.error(msg)
            break
          case 504:
            alertjs.error("服务器超时")
            break;
          case 500:
            alertjs.closeLogOnClick(false).error(msg)
            break;
          default:
            alertjs.error("http status:", errorResponse.status +" " + errorResponse.text())
        }
      })
    })
  }
  get(url:string, defParams:any={}, data:any={}){
    return this.fetch(url, defParams,  data)
  }
  post(url:string, defParams:any={}, data:any={}){
    return this.fetch(url, defParams, data, "POST")
  }
  put(url:string, defParams:any={}, data:any={}){
    return this.fetch(url,  defParams,data, "PUT")
  }
  update(url:string,defParams:any={}, data:any={}){
    return this.fetch(url,  defParams,data, "PUT")
  }
  remove(url:string,defParams:any={}){
    return this.fetch(url,  defParams, {}, "DELETE")
  }
  all(method:string, url:string,defParams:any={}, data:any={}){
    return this.fetch(url,  defParams, data, method)
  }
}