import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderGasPage } from './order-gas.page';

describe('OrderGasPage', () => {
  let component: OrderGasPage;
  let fixture: ComponentFixture<OrderGasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderGasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderGasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
