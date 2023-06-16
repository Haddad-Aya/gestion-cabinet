import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyCalendrierComponent } from './body-calendrier.component';

describe('BodyCalendrierComponent', () => {
  let component: BodyCalendrierComponent;
  let fixture: ComponentFixture<BodyCalendrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyCalendrierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyCalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
