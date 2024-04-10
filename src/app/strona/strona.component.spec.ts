import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StronaComponent } from './strona.component';

describe('StronaComponent', () => {
  let component: StronaComponent;
  let fixture: ComponentFixture<StronaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StronaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StronaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
