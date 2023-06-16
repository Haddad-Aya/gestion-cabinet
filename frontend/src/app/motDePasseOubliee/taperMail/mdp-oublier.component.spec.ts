import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdpOublierComponent } from './mdp-oublier.component';

describe('MdpOublierComponent', () => {
  let component: MdpOublierComponent;
  let fixture: ComponentFixture<MdpOublierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdpOublierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdpOublierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
