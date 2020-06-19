import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FailedComponent } from './failed.component';

describe('FailedComponent', () => {
  let component: FailedComponent;
  let fixture: ComponentFixture<FailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
