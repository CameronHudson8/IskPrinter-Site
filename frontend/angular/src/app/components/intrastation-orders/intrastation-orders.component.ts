import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intrastation-orders',
  templateUrl: './intrastation-orders.component.html',
  styleUrls: ['./intrastation-orders.component.css']
})
export class IntrastationOrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public async printIsk() {
    console.log('running...');
    console.log('done.');
  }

}
