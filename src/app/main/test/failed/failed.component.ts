import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TestResult } from '../../../common';

@Component({
  selector: 'test-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.scss'],
})
export class FailedComponent implements OnInit {
  @Input() testResult: TestResult;
  @Output() retryTest: EventEmitter<any> = new EventEmitter();

  constructor() { }
  ngOnInit() {}

  onClickRetry() {
    this.retryTest.emit();
  }
}
