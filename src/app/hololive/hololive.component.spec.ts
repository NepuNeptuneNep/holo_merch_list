import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HololiveComponent } from './hololive.component';

describe('HololiveComponent', () => {
  let component: HololiveComponent;
  let fixture: ComponentFixture<HololiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HololiveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HololiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
