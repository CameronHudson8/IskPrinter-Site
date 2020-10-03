import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrastationDealsComponent } from './intrastation-deals.component';

describe('IntrastationDealsComponent', () => {
  let component: IntrastationDealsComponent;
  let fixture: ComponentFixture<IntrastationDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrastationDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrastationDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
