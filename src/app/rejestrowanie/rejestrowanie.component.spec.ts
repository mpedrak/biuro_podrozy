import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejestrowanieComponent } from './rejestrowanie.component';

describe('RejestrowanieComponent', () => {
  let component: RejestrowanieComponent;
  let fixture: ComponentFixture<RejestrowanieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejestrowanieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejestrowanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
