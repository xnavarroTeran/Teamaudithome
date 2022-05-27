import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vmenu-grid',
  templateUrl: './vmenu-grid.component.html',
  styleUrls: ['./vmenu-grid.component.css']
})
export class VmenuGridComponent implements OnInit {

  @Input() bgcolor: string = "#000000";
  @Input() fgcolor: string = "ffffff";
  @Output() showAuditors = new EventEmitter<string>();
  colStyle: string  = "#ffffff";

  constructor() { }

  ngOnInit(): void {
    this.colStyle = this.fgcolor;

  }

}
