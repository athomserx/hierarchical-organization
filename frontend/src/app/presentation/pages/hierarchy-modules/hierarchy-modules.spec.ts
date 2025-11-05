import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyModules } from './hierarchy-modules';

describe('HierarchyModules', () => {
  let component: HierarchyModules;
  let fixture: ComponentFixture<HierarchyModules>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HierarchyModules]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HierarchyModules);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
