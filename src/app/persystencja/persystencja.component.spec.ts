import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersystencjaComponent } from './persystencja.component';

describe('PersystencjaComponent', () => {
  let component: PersystencjaComponent;
  let fixture: ComponentFixture<PersystencjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersystencjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersystencjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
