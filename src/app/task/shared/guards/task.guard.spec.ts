import { TestBed } from '@angular/core/testing';

import { TaskGuard } from './task.guard';

describe('TaskGuard', () => {
  let guard: TaskGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TaskGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
