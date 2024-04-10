import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartowaComponent } from './startowa.component';

describe('StartowaComponent', () => {
  let component: StartowaComponent;
  let fixture: ComponentFixture<StartowaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartowaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartowaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
