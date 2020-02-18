import { TestBed, async, inject } from '@angular/core/testing';
import {RouterTestingModule } from '@angular/router/testing';
import { AdminGuard } from './admin.guard';
import { UserService } from '../user/user.service';

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminGuard, 
        {provide: UserService, useClass: UserviceStub}
      ],
      imports:[RouterTestingModule],
    });
  });

 it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
   expect(guard).toBeTruthy();
 }));
});


class UserviceStub {}