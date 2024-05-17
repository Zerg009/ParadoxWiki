import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchrodingersCatComponent } from './schrodingers-cat.component';

describe('SchrodingersCatComponent', () => {
  let component: SchrodingersCatComponent;
  let fixture: ComponentFixture<SchrodingersCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchrodingersCatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchrodingersCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
