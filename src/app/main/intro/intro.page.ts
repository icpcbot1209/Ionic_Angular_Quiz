import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { TrainService } from 'src/app/services/train.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  data: any;
  codeRule: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private trainService: TrainService
  ) { }

  ngOnInit() {
    this.data = this.dataService.getData(); 
    this.codeRule = this.dataService.getCodeRule();
  }

  gotoTest() {
    let code = this.dataService.getCode();
    this.router.navigate([code, 'test']);
  }

  gotoTrain() {  
    let code = this.dataService.getCode();
    this.router.navigate([code, 'train']);
  }
}
