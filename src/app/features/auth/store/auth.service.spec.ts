import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { API_URL } from '@core/env.token';
import { environment } from '../../../../environment';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: API_URL,
          useValue: environment.API_URL,
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should make a POST request to login endpoint with given credentials', () => {
    const mockLoginResponse = { token: 'mock-token' };
    const email = 'test@example.com';
    const password = 'test-password';

    authService.login(email, password).subscribe(response => {
      expect(response.accessToken).toEqual(mockLoginResponse.token);
    });

    const req = httpMock.expectOne(`${authService['base_url']}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, password });
    req.flush(mockLoginResponse);
  });

  it('should make a POST request to register endpoint with given user data', () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const phoneNumber = '1234567890';
    const email = 'test@example.com';
    const password = 'test-password';

    authService.register(firstName, lastName, phoneNumber, email, password).subscribe();

    const req = httpMock.expectOne(`${authService['base_url']}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role: 0,
    });
  });
});
