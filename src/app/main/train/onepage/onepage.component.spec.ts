import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnepageComponent } from './onepage.component';

describe('OnepageComponent', () => {
  let component: OnepageComponent;
  let fixture: ComponentFixture<OnepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnepageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
