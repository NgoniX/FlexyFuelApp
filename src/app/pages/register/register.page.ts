import { FirestoreService } from './../../providers/firestore.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Component, OnInit } from '@angular/core';
import { PasswordValidator } from '../../validators/password.validator';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  image: any;

  validation_messages = {

    displayName: [
      { type: 'required', message: 'Name is required.' }
    ],
    userLevel: [
      { type: 'required', message: 'User Role is required.' }
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    confirm_password: [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    matching_passwords: [
      { type: 'areEqual', message: 'Password mismatch.' }
    ]
  };

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;

  public credential = {
    displayName: '',
    userLevel: '',
    email: '',
    password: ''
  };

  submitted = false;
  isLoading = false;

  constructor(public auth: AuthService,
              public formBuilder: FormBuilder,
              private router: Router,
              private loading: LoadingController,
              private alert: AlertController,
              private imagePicker: ImagePicker,
              private webView: WebView,
              private toastCtrl: ToastController,
              private firestoreService: FirestoreService) { }

  ngOnInit() {

    this.image = './assets/imgs/user-icon.png';

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.validations_form = this.formBuilder.group({
      displayName: new FormControl('', Validators.required),
      userLevel: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group
    });


  }

  register(form) {

    this.submitted = true;

    let cred = {
      displayName: this.validations_form.controls['displayName'].value,
      userLevel: this.validations_form.controls['userLevel'].value,
      email: this.validations_form.controls['email'].value,
      image: this.image
    }

    if (form.valid) {

      this.present();

      this.auth.doRegister(this.credential)
        .then(res => {
          console.log(res);

          this.auth.updateUserData(cred);

          this.dismiss();
          this.router.navigateByUrl('/');
        }, err => {
          console.log(err);
          this.dismiss();
          // present alert
          this.presentAlert();
        });

    }
  }

  // show alert message
  async presentAlert() {

    const alert = await this.alert.create({
      header: 'Error',
      message: 'Login Failed. Please Try Again',
      buttons: ['OK']
    });
    return await alert.present();

  }

  openImagePicker(){
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result === false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      } else if (result === true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            for (let i = 0; i < results.length; i++) {
              this.uploadImageToFirebase(results[i]);
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
  }

  async uploadImageToFirebase(image){
    const loading = await this.loading.create({
      message: 'Please wait...'
    });
    const toast = await this.toastCtrl.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    this.presentLoading(loading);
    const image_src = this.webView.convertFileSrc(image);
    const randomId = Math.random().toString(36).substr(2, 5);

    // uploads img to firebase storage
    this.firestoreService.uploadImage(image_src, randomId)
    .then(photoURL => {
      this.image = photoURL;
      loading.dismiss();
      toast.present();
    }, err => {
      console.log(err);
    });
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  // show loading icon
  async present() {
    this.isLoading = true;
    return await this.loading.create({
      duration: 9000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }


  // dismiss loading icon
  async dismiss() {
    this.isLoading = false;
    return await this.loading.dismiss().then(() => console.log('dismissed'));
  }

}
