import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeReceiverComponent } from './code-receiver.component';

describe('CodeReceiverComponent', () => {
  let component: CodeReceiverComponent;
  let fixture: ComponentFixture<CodeReceiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeReceiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
