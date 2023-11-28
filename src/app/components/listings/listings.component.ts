import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsonData from '../../../assets/data/jobs.json'

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent {
    jobs: any[] = jsonData.jobListings;
}
