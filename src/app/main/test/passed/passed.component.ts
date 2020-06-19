import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TestResult } from '../../../common';


@Component({
  selector: 'test-passed',
  templateUrl: './passed.component.html',
  styleUrls: ['./passed.component.scss'],
})
export class PassedComponent implements OnInit {
  @Input() testResult: TestResult;
  @Output() retryTest: EventEmitter<any> = new EventEmitter();
  @Output() sendResultEmail: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit() { }
  
  onClickRetry() {
    this.retryTest.emit();
  }

  onClickOpenEmailComposer() {
    this.sendResultEmail.emit();
  }
}
