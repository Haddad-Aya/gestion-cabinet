import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHomePatientComponent } from './dashboard-home-patient.component';

describe('DashboardHomePatientComponent', () => {
  let component: DashboardHomePatientComponent;
  let fixture: ComponentFixture<DashboardHomePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardHomePatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHomePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
