import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsNumericComponent } from './students-numeric.component';

describe('StudentsNumericComponent', () => {
  let component: StudentsNumericComponent;
  let fixture: ComponentFixture<StudentsNumericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsNumericComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsNumericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
