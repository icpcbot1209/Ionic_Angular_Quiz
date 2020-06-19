import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const baseURL = "assets/train_htmls"

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  constructor(private http: HttpClient) { }

  readJsonConfig(category:string): Observable<any> {

    let url = baseURL + `/${category}/config.json`;
    return this.http.get<any>(url);
  }

  readPageHtml(category: string, pageNum: number, callback: (resp:string) => void) {
    let url = baseURL + `/${category}/${pageNum}.html`;
    this.http.get(url, { responseType: 'text' }).subscribe(resp => {

      let i = resp.indexOf('<img');
      let j = resp.indexOf("src", i);
      let sss = resp.substr(j);
      sss.replace("\'", "\"");
      let arr = sss.split("\"");
     
      if (arr.length >= 2) {
        let ttt = arr[1];
        let url = baseURL + `/${category}/${ttt}`;
        resp = resp.replace(ttt, url);
      }
      callback(resp);
    });
  }
}
