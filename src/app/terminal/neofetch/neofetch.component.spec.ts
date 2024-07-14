import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeofetchComponent } from './neofetch.component';

describe('NeofetchComponent', () => {
  let component: NeofetchComponent;
  let fixture: ComponentFixture<NeofetchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeofetchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeofetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
