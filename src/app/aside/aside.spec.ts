import { TestBed } from '@angular/core/testing';

import { Aside } from './aside';

describe('Aside', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aside],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Aside);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
