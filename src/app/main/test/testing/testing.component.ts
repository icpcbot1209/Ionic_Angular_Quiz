import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Test } from 'src/app/common';

@Component({
  selector: 'test-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
})
export class TestingComponent implements OnInit {
  @Input() test: Test = <Test>{};
  @Output() endTest: EventEmitter<any> = new EventEmitter();

  iStep = 0;
  arrCheckDataOfStep = [];
  arrUserAnswer = [];
  choosenLabel = "";

  constructor() { }

  ngOnInit() {
    this.arrUserAnswer = [];
    this.iStep = 0;
    this.arrCheckDataOfStep = this.makeArrCheckDataOfStep(this.iStep);
  }

  makeArrCheckDataOfStep(iStep) {
    let arrCheckDataOfStep = [];
    this.test.arrQuiz[this.iStep].arrOption.forEach((option, i) => {
      arrCheckDataOfStep.push({
        label: String.fromCharCode("A".charCodeAt(0) + i),
        sentence: option,
        isChecked: false
      });
    });
    return arrCheckDataOfStep;
  }


  onChangeRadio(event) {
    this.choosenLabel = event.detail.value;
  }

  onClickNext() {
    let userAnswer = this.choosenLabel;

    this.choosenLabel = "";
    this.arrCheckDataOfStep.forEach((checkData, i) => {
      if (checkData.isChecked) userAnswer += checkData.label;
    });
    this.arrUserAnswer.push(userAnswer);


    if (this.iStep < this.test.arrQuiz.length-1) {
      this.iStep++;
      this.arrCheckDataOfStep = this.makeArrCheckDataOfStep(this.iStep);
    } else {
      this.endTest.emit(this.arrUserAnswer);
    }

  }



}
