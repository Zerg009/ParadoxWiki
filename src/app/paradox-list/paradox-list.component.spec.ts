import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParadoxListComponent } from './paradox-list.component';

describe('ParadoxListComponent', () => {
  let component: ParadoxListComponent;
  let fixture: ComponentFixture<ParadoxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParadoxListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParadoxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
