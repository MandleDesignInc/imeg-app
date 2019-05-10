import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousReportFormComponent } from './anonymous-report-form.component';

describe('AnonymousReportFormComponent', () => {
  let component: AnonymousReportFormComponent;
  let fixture: ComponentFixture<AnonymousReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonymousReportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
