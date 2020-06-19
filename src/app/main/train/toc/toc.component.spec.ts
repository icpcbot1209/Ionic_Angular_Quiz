import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TocComponent } from './toc.component';

describe('TocComponent', () => {
  let component: TocComponent;
  let fixture: ComponentFixture<TocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TocComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
