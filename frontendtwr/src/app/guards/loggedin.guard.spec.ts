import { TestBed, async, inject } from '@angular/core/testing';
import {RouterTestingModule } from '@angular/router/testing';
import { LoggedinGuard } from './loggedin.guard';
import { UserService } from '../user/user.service';

describe('LoggedinGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggedinGuard,
        {provide: UserService, useClass: Uservice}
      ],
      imports: [RouterTestingModule]
    });
  });

	 it('should ...', inject([LoggedinGuard], (guard: LoggedinGuard) => {
	   expect(guard).toBeTruthy();
	 }));
});

class Uservice{}