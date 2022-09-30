import { Component, OnInit } from '@angular/core';

@Component({
  selector:  'ngbd-carousel-basic',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/1500/500`);
  constructor() { }

  ngOnInit(): void {
  }

}
