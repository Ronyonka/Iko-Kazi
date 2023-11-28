import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
import { JobListing } from '../../jobListing';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-descriprion',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './descriprion.component.html',
  styleUrl: './descriprion.component.css'
})


export class DescriprionComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  jobsService = inject(JobsService);
  job: JobListing | undefined

  constructor (){
    const roleId = Number(this.route.snapshot.params['id'])
    this.job =  this.jobsService.getJobListingByID(roleId);
    console.log(this.job);
  }
}
