import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { MyData, Quiz, CodeRule, Test } from '../common';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = "assets/data.json";
  
  private data: MyData = null;
  private code: string = null;
  private codeRule: CodeRule = null;

  constructor(
    private http: HttpClient
  ) { }

  readDataJsonFile(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }

  setData(resp): void { 
    console.log('data loaded');
    this.data = resp;
  }

  getData(): MyData {
    return this.data;
  }

  getCode(): string { 
    return this.code;
  }

  setCode(code): boolean {
    let k = this.data.arrCodeRule.findIndex(codeRule => codeRule.code === code);
    if (k == -1) return false;
    this.code = code;
    this.codeRule = this.data.arrCodeRule[k];
    return true;
  }

  getCodeRule(): CodeRule {
    return this.codeRule;
  }

  generateTest(): Test {
    if (!this.data || !this.code) return null;
    let k = this.data.arrCodeRule.findIndex(codeRule => codeRule.code === this.code);
    if (k == -1) return null;

    let arr0 : Quiz[] = [];
    let codeRule = this.data.arrCodeRule[k];
    this.data.arrQuizAll.forEach((quiz, i) => {
      if (codeRule.rules.findIndex(rule => rule === quiz.category) > -1) {
        arr0.push(JSON.parse(JSON.stringify(quiz)));
      }
    });

    //random select
    let arrQuiz = [];

    if (codeRule.numQuiz >= arr0.length) {
      arrQuiz = arr0;
    } else { //random select
      let i = 0;
      while (arr0.length > 0 && i < codeRule.numQuiz) {
        let k = Math.floor(Math.random() * (arr0.length - 1));
        arrQuiz.push(arr0[k]);
        arr0.splice(k, 1);
        i++;
      }

    }

    return (<Test>{
      codeRule: codeRule,
      arrQuiz: arrQuiz,
      arrUserAnswer: [],
      passRate: 0,
    });

  }

  mailerName: string = "";
  getMailerName() { 
    return this.mailerName;
  }

  setMailerName(mailerName) { 
    this.mailerName = mailerName;
  }
}
