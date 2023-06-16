import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePegeComponent } from './home-pege.component';

describe('HomePegeComponent', () => {
  let component: HomePegeComponent;
  let fixture: ComponentFixture<HomePegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePegeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
