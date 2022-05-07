import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavIceCreamsUserComponent } from './fav-ice-creams-user.component';

describe('FavIceCreamsUserComponent', () => {
  let component: FavIceCreamsUserComponent;
  let fixture: ComponentFixture<FavIceCreamsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavIceCreamsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavIceCreamsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
