import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularDialogComponent } from './angular-dialog.component';

describe('AngularDialogComponent', () => {
  let component: AngularDialogComponent;
  let fixture: ComponentFixture<AngularDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AngularDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
