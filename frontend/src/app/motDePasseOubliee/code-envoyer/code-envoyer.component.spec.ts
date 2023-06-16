import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEnvoyerComponent } from './code-envoyer.component';

describe('CodeEnvoyerComponent', () => {
  let component: CodeEnvoyerComponent;
  let fixture: ComponentFixture<CodeEnvoyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeEnvoyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeEnvoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
