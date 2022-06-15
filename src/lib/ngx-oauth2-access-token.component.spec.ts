import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxOauth2AccessTokenComponent } from './ngx-oauth2-access-token.component';

describe('NgxOauth2AccessTokenComponent', () => {
  let component: NgxOauth2AccessTokenComponent;
  let fixture: ComponentFixture<NgxOauth2AccessTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxOauth2AccessTokenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxOauth2AccessTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
