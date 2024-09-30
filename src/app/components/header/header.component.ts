import { Component } from '@angular/core';
import { AppConstants } from '../../app.constants';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  providers: [ContentComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})

export class HeaderComponent{

  constructor(public constants: AppConstants) { 
  }

}
