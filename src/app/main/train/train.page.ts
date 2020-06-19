import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainService } from 'src/app/services/train.service';
import { DataService } from 'src/app/services/data.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-train',
  templateUrl: './train.page.html',
  styleUrls: ['./train.page.scss'],
})
export class TrainPage implements OnInit {
  codeRule: any;

  category: string;
  pageCnt: number;
  pageNum: number;

  isBusy: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private trainService: TrainService,
    private dataService: DataService,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.codeRule = this.dataService.getCodeRule();
    this.category = this.codeRule.rules[0];

    this.trainService.readJsonConfig(this.category).subscribe(resp => { 
      this.pageCnt = resp.pageCnt;
      this.pageNum = 1;

      this.showPage(this.category, this.pageNum);
    });
  }

  showPage(category: string, pageNum: number) {
    if (pageNum > this.pageCnt) return;
    this.isBusy = true;
    this.trainService.readPageHtml(category, pageNum, (resp) => {
      document.getElementById('hhhh').innerHTML = resp;
      this.isBusy = false;
    })
  }

  onClickCategory(category) {
    this.category = category;

    this.trainService.readJsonConfig(this.category).subscribe(resp => {
      this.pageCnt = resp.pageCnt;
      this.pageNum = 1;

      this.showPage(this.category, this.pageNum);
    });
  }

  showPrevPage() { 
    if (this.pageNum > 1) {
      this.pageNum--;
      this.showPage(this.category, this.pageNum);
    } else if (this.category !== this.codeRule.rules[0]) {
      this.menu.open();
    }
  }

  showNextPage() { 
    if (this.pageNum < this.pageCnt) {
      this.pageNum++;
      this.showPage(this.category, this.pageNum);
    } else if (this.category !== this.codeRule.rules[this.codeRule.rules.length-1]) {
      this.menu.open();
    } else {
      if (window.confirm("You have read all. Try Test?")) {
        let code = this.dataService.getCode();
        this.router.navigate([code, 'test']);
      }
    }
    
  }

}
