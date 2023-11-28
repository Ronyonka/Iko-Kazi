import { Injectable } from '@angular/core';
import jsonData from '../../assets/data/jobs.json'

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  jobs: any[] = jsonData.jobListings;
  constructor() { }

  getAllJobListings(){
    return this.jobs;
  }
  getJobListingByID(id: Number){
    return this.jobs.find(jobs => jobs.id === id)
  }
}
