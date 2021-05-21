import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  greenMenu : boolean;

  updateCurrentMenuItemCSS(current: string) {
    let prev : Element = document.getElementsByClassName('current-menu-item')[0];
    
    if(prev)
      prev.classList.remove('current-menu-item');

    document.getElementById(current + '-item').classList.add('current-menu-item');
  }

  constructor() {}

  ngOnInit() {}
}
