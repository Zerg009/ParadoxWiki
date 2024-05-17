import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPlayerComponent } from './ui-player.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('UiPlayerComponent', () => {
  let component: UiPlayerComponent;
  let fixture: ComponentFixture<UiPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPlayerComponent, CommonModule, FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
