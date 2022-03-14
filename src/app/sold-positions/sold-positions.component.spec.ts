import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldPositionsComponent } from './sold-positions.component';

describe('SoldPositionsComponent', () => {
  let component: SoldPositionsComponent;
  let fixture: ComponentFixture<SoldPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldPositionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
