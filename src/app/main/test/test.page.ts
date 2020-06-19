import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Test, TestResult } from '../../common';
import { EmailComposer } from "@ionic-native/email-composer/ngx";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-test",
  templateUrl: "./test.page.html",
  styleUrls: ["./test.page.scss"],
})
export class TestPage implements OnInit {
  test: Test;
  testResult: TestResult;

  status: number;

  STATUS_NONE = 0;
  STATUS_TEST_READY = 1;
  STATUS_TEST_STARTED = 2;
  STATUS_TEST_PASSED = 3;
  STATUS_TEST_FAILED = 4;
  STATUS_TEST_CANCELED = 5;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    public composer: EmailComposer,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.status = this.STATUS_NONE;
    this.readyTest();
  }

  ionViewWillEnter() {
    if (this.status !== this.STATUS_NONE) {
      this.status = this.STATUS_NONE;
      this.readyTest();
    }
  }

  ionViewWillLeave() {
    if (this.status === this.STATUS_TEST_STARTED) {
      window.alert("The test result will not be saved.");
    }
  }

  readyTest() {
    let test = this.dataService.generateTest();
    if (test === null) {
      this.router.navigate(["/home"]);
      return;
    }
    this.test = test;
    this.status = this.STATUS_TEST_READY;
  }

  startTest() {
    this.status = this.STATUS_TEST_STARTED;
  }

  endTest(arrUserAnswer) {
    if (arrUserAnswer.length !== this.test.arrQuiz.length) {
      this.readyTest();
      return;
    }

    let nCorrect = 0;
    let arrWrong = [];
    this.test.arrQuiz.forEach((quiz, i) => {
      if (quiz.answer === arrUserAnswer[i]) nCorrect++;
      else arrWrong.push(quiz);
    });

    let passRate = 0;
    if (this.test.codeRule.numQuiz > 0)
      passRate = nCorrect / this.test.codeRule.numQuiz;

    this.testResult = { passRate, arrWrong };

    if (passRate >= this.test.codeRule.minPassRate) {
      this.status = this.STATUS_TEST_PASSED;
    } else {
      this.status = this.STATUS_TEST_FAILED;
    }
  }


  sendResultEmail() {
    let mailerName = this.dataService.getMailerName();
    let subject = `Test Result From ${mailerName}`;
    let to = [this.dataService.getData().adminEmail];
    let date = new Date().toUTCString();
    let body =
      `Name: ${mailerName}\n\n` +
      `Pass rate: ${this.testResult.passRate * 100}%\n\n` +
      `Code: ${this.dataService.getCode()}\n\n` +
      `Time: ${date}\n\n` +
      `Category: ${this.dataService
        .getCodeRule()
        .rules.map((rule) => rule)}\n\n` +
      `Number of questions: ${this.test.codeRule.numQuiz}\n\n`;
    
    if (this.testResult.arrWrong.length > 0) {
      body += `Failed ones:\n`;
      this.testResult.arrWrong.forEach((quiz) => { body += `\t${quiz.question}\n`; })
    }

    let blob = new Blob([body], { type: "text/plain" });
    let reader = new FileReader();
    reader.onloadend = () => { 
      let base64data = reader.result;
      let sss: string = base64data.toString().split("base64,")[1];
      sss = `base64:TestResult_${mailerName}_${date}.txt//` + sss;
      
      let attachments = [sss];


      if (this.platform.is("hybrid")) {
        this.composer.open({
          to,
          subject,
          body,
          attachments,
          isHtml: false,
        });
      } else {
        let url = `mailto:${to}?subject=${subject}&body=${body}`;
        url = url.replace(new RegExp("\n", 'g'), "%0A");

        let newWindow = window.open(url);
      }
    }
    reader.readAsDataURL(blob);

  }


}
