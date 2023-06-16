import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssayeComponent } from './essaye.component';

describe('EssayeComponent', () => {
  let component: EssayeComponent;
  let fixture: ComponentFixture<EssayeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EssayeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EssayeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
