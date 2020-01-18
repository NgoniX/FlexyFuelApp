import { TutorialGuard } from './guards/tutorial.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [TutorialGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'order-fuel',
    loadChildren: () => import('./pages/order-fuel/order-fuel.module').then(m => m.OrderFuelPageModule)
  },
  {
    path: 'flexy-card',
    loadChildren: () => import('./pages/flexy-card/flexy-card.module').then(m => m.FlexyCardPageModule)
  },
  {
    path: 'sales',
    loadChildren: () => import('./pages/sales/sales.module').then(m => m.SalesPageModule)
  },
  {
    path: 'add-sales',
    loadChildren: () => import('./pages/add-sales/add-sales.module').then(m => m.AddSalesPageModule)
  },
  {
    path: 'view-sales',
    loadChildren: () => import('./pages/view-sales/view-sales.module').then(m => m.ViewSalesPageModule)
  },
  {
    path: 'view-orders',
    loadChildren: () => import('./pages/view-orders/view-orders.module').then(m => m.ViewOrdersPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'order-gas',
    loadChildren: () => import('./pages/order-gas/order-gas.module').then( m => m.OrderGasPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
