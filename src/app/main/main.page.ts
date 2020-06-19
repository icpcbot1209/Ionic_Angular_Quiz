import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.initCodeFromURL();
  }

  initCodeFromURL() {
    let code = this.dataService.getCode();
    if (code == null) {
      this.activatedRoute.paramMap.subscribe(paramMap => {
        if (!this.dataService.getData() || !paramMap.has('code')) {
          this.router.navigate(['/home']);
          return;
        }

        let code = paramMap.get('code');
        let isValid = this.dataService.setCode(code);
        if (!isValid) {
          this.router.navigate(['/home']);
          return;
        }
      });

    }
    
  }

}
