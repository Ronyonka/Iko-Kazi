import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriprionComponent } from './descriprion.component';

describe('DescriprionComponent', () => {
  let component: DescriprionComponent;
  let fixture: ComponentFixture<DescriprionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriprionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescriprionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
