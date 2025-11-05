import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHierarchyModule } from './edit-hierarchy-module';

describe('EditHierarchyModule', () => {
  let component: EditHierarchyModule;
  let fixture: ComponentFixture<EditHierarchyModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHierarchyModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHierarchyModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
