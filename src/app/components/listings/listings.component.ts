import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListing } from '../../jobListing';
import { RouterModule } from '@angular/router';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent {
    jobs: any[] = [];
    jobsService: JobsService = inject(JobsService);
    constructor(){
      this.jobs = this.jobsService.getAllJobListings();
    }
}
