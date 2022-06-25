import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
    parentmessage:string='';
  constructor() { }

  ngOnInit(): void {
  }
  onKey(event: any) { // without type info
    return this.parentmessage = event.target.value;
  }


}
