import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
    @Input() filterCompany: any;
    @Input() filterLocation: any;
    @Input() filterJobType: any;
    @Output() onClick: EventEmitter<string> = new EventEmitter();

    filterText: string = "";

    companyNames: string[] = [];
    jobType: string[] = [];
    constructor(){}
    filterClicked(filterText: string){
      this.onClick.emit(filterText);
    }
}
