import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IceCreamsUserComponent } from './ice-creams-user.component';

describe('IceCreamsUserComponent', () => {
  let component: IceCreamsUserComponent;
  let fixture: ComponentFixture<IceCreamsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IceCreamsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IceCreamsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
