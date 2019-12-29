import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './providers/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Account',
      url: '/account',
      icon: 'person'
    },
    {
      title: 'About Us',
      url: '/about',
      icon: 'information-circle'
    },
    {
      title: 'Contact Us',
      url: '/about',
      icon: 'contact'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public auth: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      // set status bar to shade of green
      this.statusBar.backgroundColorByHexString('#42bc35');

      this.splashScreen.hide();
    });
  }

  // logout
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
