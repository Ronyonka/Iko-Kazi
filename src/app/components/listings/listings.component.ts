import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListing } from '../../jobListing';
import { RouterModule } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent {
    itemsPerPage = 7;
    currentPage= 1;
    totalItems = 7;
    jobs: any[] = [];
    jobsService: JobsService = inject(JobsService);
    constructor(){
      this.jobs = this.jobsService.getAllJobListings();
      this.totalItems= this.jobs.length
    }

    get paginatedData(){
      const start = (this.currentPage -1)* (this.itemsPerPage)
      const end = start + this.itemsPerPage

      return this.jobs.slice(start, end);
    }

    changePage(page: number){
      this.currentPage = page;
    }
}
