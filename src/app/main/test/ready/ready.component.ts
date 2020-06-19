import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quiz, CodeRule, Test } from '../../../common';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'test-ready',
  templateUrl: './ready.component.html',
  styleUrls: ['./ready.component.scss'],
})
export class ReadyComponent implements OnInit {
  @Input() test: Test = <Test>{};
  @Output() startTest: EventEmitter<any> = new EventEmitter();

  constructor(
    private dataService: DataService
  ) { }
  ngOnInit() {}
  
  onClickStart(mailerName) {
    this.dataService.setMailerName(mailerName);
    this.startTest.emit();
  }
}
