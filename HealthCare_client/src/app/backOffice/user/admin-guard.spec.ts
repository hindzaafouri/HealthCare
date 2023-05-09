import { AdminGuard } from './admin-guard';
import { Router } from '@angular/router';

describe('AdminGuard', () => {
  it('should create an instance', () => {
    expect(new AdminGuard()).toBeTruthy();
  });
});
