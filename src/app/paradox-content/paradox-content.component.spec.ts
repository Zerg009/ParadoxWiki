import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParadoxContentComponent } from './paradox-content.component';

describe('ParadoxContentComponent', () => {
  let component: ParadoxContentComponent;
  let fixture: ComponentFixture<ParadoxContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParadoxContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParadoxContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
