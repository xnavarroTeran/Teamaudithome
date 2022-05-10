import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vmenu-main',
  templateUrl: './vmenu-main.component.html',
  styleUrls: ['./vmenu-main.component.css']
})
export class VmenuMainComponent implements OnInit {

  @Input() bgcolor: string = "#000000";
  @Input() fgcolor: string = "ffffff";
  @Output() showAuditors = new EventEmitter<string>();
  colStyle: string  = "#ffffff";
  constructor() {
    
   }

  ngOnInit(): void {
    this.colStyle = this.fgcolor;

  }

  goShowAuditors()
  {
    this.showAuditors.next('');
  }
}
