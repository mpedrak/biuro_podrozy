import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StronaNieZnalezionaComponent } from './strona-nie-znaleziona.component';

describe('StronaNieZnalezionaComponent', () => {
  let component: StronaNieZnalezionaComponent;
  let fixture: ComponentFixture<StronaNieZnalezionaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StronaNieZnalezionaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StronaNieZnalezionaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
