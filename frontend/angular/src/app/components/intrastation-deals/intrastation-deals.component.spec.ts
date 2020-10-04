import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatorService } from 'src/app/services/authenticator/authenticator.service';

import { IntrastationDealsComponent } from './intrastation-deals.component';

describe('IntrastationDealsComponent', () => {
  let component: IntrastationDealsComponent;
  let fixture: ComponentFixture<IntrastationDealsComponent>;

  let authenticatorServiceStub: Partial<AuthenticatorService> = {
    isLoggedIn: () => true,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrastationDealsComponent ],
      providers: [ { provide: AuthenticatorService, useValue: authenticatorServiceStub } ]
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
