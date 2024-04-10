import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzczegolyComponent } from './szczegoly.component';

describe('SzczegolyComponent', () => {
  let component: SzczegolyComponent;
  let fixture: ComponentFixture<SzczegolyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SzczegolyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SzczegolyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
