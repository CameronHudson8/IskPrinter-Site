import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticatorService } from 'src/app/services/authenticator/authenticator.service';

import { CodeReceiverComponent } from './code-receiver.component';

describe('CodeReceiverComponent', () => {
  let component: CodeReceiverComponent;
  let fixture: ComponentFixture<CodeReceiverComponent>;

  let authenticatorServiceStub: Partial<AuthenticatorService> = {
    isLoggedIn: () => true,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeReceiverComponent ],
      imports: [ RouterTestingModule ],
      providers: [ { provide: AuthenticatorService, useValue: authenticatorServiceStub } ]
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
