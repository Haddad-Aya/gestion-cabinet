import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousPatientComponent } from './rendez-vous-patient.component';

describe('RendezVousPatientComponent', () => {
  let component: RendezVousPatientComponent;
  let fixture: ComponentFixture<RendezVousPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RendezVousPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RendezVousPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
