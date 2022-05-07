import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-vmenu-main',
  templateUrl: './vmenu-main.component.html',
  styleUrls: ['./vmenu-main.component.css']
})
export class VmenuMainComponent implements OnInit {

  @Input() bgcolor: string = "#000000";
  @Input() fgcolor: string = "ffffff";
  
  colStyle: string  = "#ffffff";
  constructor() {
    
   }

  ngOnInit(): void {
    this.colStyle = this.fgcolor;

  }

}
