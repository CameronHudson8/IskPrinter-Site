import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IskPrinterComponent } from './isk-printer.component';

describe('IskPrinterComponent', () => {
  let component: IskPrinterComponent;
  let fixture: ComponentFixture<IskPrinterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IskPrinterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IskPrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
