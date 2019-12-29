import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlexyCardPage } from './flexy-card.page';

describe('FlexyCardPage', () => {
  let component: FlexyCardPage;
  let fixture: ComponentFixture<FlexyCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexyCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlexyCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
