import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PassedComponent } from './passed.component';

describe('PassedComponent', () => {
  let component: PassedComponent;
  let fixture: ComponentFixture<PassedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PassedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
