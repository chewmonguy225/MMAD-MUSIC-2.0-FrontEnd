// src/app/component/home/home.component.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Assuming you use router-outlet
import { HeaderComponent } from '../dashboard/header/header.component';
import { ReviewViewerComponent } from '../review/review-viewer/review-viewer.component';

@Component({
  selector: 'app-home', // Or whatever your home component's selector is
  standalone: true, // Assuming your home component is also standalone
  imports: [
    RouterOutlet,
    HeaderComponent, // Your header component
    ReviewViewerComponent // <--- ADD THIS HERE
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Your home component logic here
}