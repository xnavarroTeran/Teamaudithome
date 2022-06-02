import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  @Input() timelinetitle: string = "";
  @Input() jsontimeline: any[] = [];
  @Output() closeTimeline = new EventEmitter<string>();
  
  
  constructor() { }

  ngOnInit(): void {
  }

  outTimeline()
  {
    this.closeTimeline.next('');
  }
}
