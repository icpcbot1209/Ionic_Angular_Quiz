import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

import { EmailComposer } from "@ionic-native/email-composer/ngx";
import { MyData } from '../common';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {

  data: MyData;

  constructor(
    private router: Router,
    private dataService: DataService,
    private emailComposer: EmailComposer
  ) {}

  ngOnInit(): void {
    this.data = this.dataService.getData();
  }

  doSubmit(code) {
    // this.emailComposer.isAvailable().then((available: boolean) => {
    //     console.log(available);
    //   if (available) {
    //     //Now we know we can send
    //     let email = {
    //       to: "demo@demo.com"
    //     };
    //     this.emailComposer.open(email);

    //   }

    // });

    let isValid = this.dataService.setCode(code);

    if (!isValid) alert("The Code is invalid");
    else this.router.navigate([code]);
  }
}
