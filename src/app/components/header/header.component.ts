import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: string = "#IkoKaziKE";
  searchKeyword: string = '';

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChanged(){
    this.searchTextChanged.emit(this.searchKeyword);
  }


}
