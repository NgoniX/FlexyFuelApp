import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { IonSlides, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage {

  showSkip = true;

  @ViewChild('slides', { static: true }) slides: IonSlides;

  constructor(private storage: Storage, private router: Router, private menu: MenuController) { }

  async finish() {
    await this.storage.set('tutorialComplete', true);
    this.router.navigateByUrl('/');
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  slidesDidLoad(slides: IonSlides) {
    slides.stopAutoplay();
  }

  ionViewWillEnter() {
    this.storage.get('tutorialComplete').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/');
      }
    });

    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }



}
