import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrastationOrdersComponent } from './intrastation-orders.component';

describe('IntrastationOrdersComponent', () => {
  let component: IntrastationOrdersComponent;
  let fixture: ComponentFixture<IntrastationOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrastationOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrastationOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
