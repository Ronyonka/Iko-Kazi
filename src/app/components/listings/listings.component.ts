import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListing } from '../../jobListing';
import { RouterModule } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
import { HeaderComponent } from '../header/header.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { FilterComponent } from '../filter/filter.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, PaginationComponent, FilterComponent, FormsModule],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent {
    itemsPerPage = 7;
    currentPage= 1;
    totalItems = 29;
    hidePagination=false;
    jobs: any[] = [];
    jobsService: JobsService = inject(JobsService);
    // Filters
    locationFilter: string | null = null;
    jobTypeFilter: string | null = null;
    companyNameFilter: string | null = null;

    uniqueLocations: string[] = [];
    uniqueJobTypes: string[] = [];
    uniqueCompanyNames: string[] = [];

    // Sorting
    selectedSortOption: string | null = null;

    //Search
    searchText: string = '';


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
        // this.itemsPerPage = filteredJobs.length
      }
      if (this.jobTypeFilter){
        filteredJobs =  filteredJobs.filter(job => job.jobType === this.jobTypeFilter);
        // this.itemsPerPage = filteredJobs.length
      }
      if (this.companyNameFilter) {
        filteredJobs = filteredJobs.filter(job => job.companyName === this.companyNameFilter);
        // this.itemsPerPage = filteredJobs.length
      }

      const start = (this.currentPage -1)* (this.itemsPerPage)
      const end = start + this.itemsPerPage

      return filteredJobs.slice(start, end);

    }

    onSearchTextEntered(searchValue: string){
      this.searchText = searchValue;
      this.itemsPerPage = this.jobs.length
      this.hidePagination = true;
      // console.log(this.searchText);
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
    onSortOptionChange() {
      switch (this.selectedSortOption) {
        case 'titleAsc':
          this.sortJobsByTitle(true);
          break;
        case 'titleDesc':
          this.sortJobsByTitle(false);
          break;
        case 'dateAsc':
          this.sortJobsByDate(true);
          break;
        case 'dateDesc':
          this.sortJobsByDate(false);
          break;
        default:
          // Handle the default case (Relevance)
          break;
      }
    }
  
  // Function to sort jobs based on job title alphabetically
  sortJobsByTitle(ascending: boolean) {
    this.jobs.sort((a, b) => {
      const titleA = a.roleName.toUpperCase();
      const titleB = b.roleName.toUpperCase();
      if (ascending) {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });
  }

  // Function to sort jobs based on date posted
  sortJobsByDate(ascending: boolean) {
    this.jobs.sort((a, b) => {
      const dateA = new Date(a.dateAdded);
      const dateB = new Date(b.dateAdded);
      if (ascending) {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
  }
}

