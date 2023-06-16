import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonMedecinComponent } from './mon-medecin.component';

describe('MonMedecinComponent', () => {
  let component: MonMedecinComponent;
  let fixture: ComponentFixture<MonMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonMedecinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
