import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquePatientComponent } from './historique-patient.component';

describe('HistoriquePatientComponent', () => {
  let component: HistoriquePatientComponent;
  let fixture: ComponentFixture<HistoriquePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriquePatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriquePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
