import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewOrdersPage } from './view-orders.page';

describe('ViewOrdersPage', () => {
  let component: ViewOrdersPage;
  let fixture: ComponentFixture<ViewOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrdersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
