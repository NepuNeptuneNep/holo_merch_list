import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VtuberComponent } from './vtuber.component';

describe('VtuberComponent', () => {
  let component: VtuberComponent;
  let fixture: ComponentFixture<VtuberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VtuberComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VtuberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
