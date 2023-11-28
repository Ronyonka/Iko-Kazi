import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListing } from '../../jobListing';
import { RouterModule } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent, FilterComponent],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent {
    itemsPerPage = 7;
    currentPage= 1;
    totalItems = 7;
    jobs: any[] = [];
    jobsService: JobsService = inject(JobsService);
    // Filters
    locationFilter: string | null = null;
    jobTypeFilter: string | null = null;
    companyNameFilter: string | null = null;

    uniqueLocations: string[] = [];
    uniqueJobTypes: string[] = [];
    uniqueCompanyNames: string[] = [];


    constructor(){
      this.jobs = this.jobsService.getAllJobListings();
      this.uniqueLocations = this.getUniqueValues('city');
      this.uniqueJobTypes = this.getUniqueValues('jobType');
      this.uniqueCompanyNames = this.getUniqueValues('companyName');
    }

    private getUniqueValues(key: string): string[] {
      const uniqueValues: string[] = [];
      const seenValues: Set<string> = new Set();
  
      this.jobs.forEach(job => {
        const value = job[key];
        if (!seenValues.has(value)) {
          seenValues.add(value);
          uniqueValues.push(value);
        }
      })
      return uniqueValues;

    }


    get paginatedData(){
      let filteredJobs = this.jobs;

      if (this.locationFilter) {
        filteredJobs = filteredJobs.filter(job => job.city === this.locationFilter);
      }
      if (this.jobTypeFilter){
        filteredJobs =  filteredJobs.filter(job => job.jobType === this.jobTypeFilter);
      }
      if (this.companyNameFilter) {
        filteredJobs = filteredJobs.filter(job => job.companyName === this.companyNameFilter);
      }

      this.totalItems = filteredJobs.length; 
      const start = (this.currentPage -1)* (this.itemsPerPage)
      const end = start + this.itemsPerPage

      return filteredJobs.slice(start, end);

    }

    changePage(page: number){
      this.currentPage = page;
    }
    onLocationFilterChange(location: string | null) {
      this.locationFilter = location;
      this.currentPage = 1;
    }

    onJobTypeFilterChange(jobType: string | null) {
      this.jobTypeFilter = jobType;
      this.currentPage = 1;
    }

    onCompanyNameFilterChange(companyName: string | null) {
      this.companyNameFilter = companyName;
      this.currentPage = 1;
    }
}
