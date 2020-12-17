import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { threadId } from 'worker_threads';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input() txtEmail: string;
  @Input() txtPassword: string;

  constructor(
    private service : ServicesService,
    private route : Router,
    private toastController : ToastController
  ) { }

  ngOnInit() {
  }

  login(){
    if(!this.txtEmail || !this.txtPassword){
      this.presentToast("Please Fill All Fields","danger");
      return;
    }
    else{
        const user = {
          email : this.txtEmail,
          password : this.txtPassword,
        }
        this.service.login(user)
        .then(res => {
          console.log(res);
          this.presentToast('Welcome!','success');
          this.route.navigateByUrl('/tabs');
        }, err=> {
          this.presentToast(err.message,'danger');
        })      
    }
  }

  async presentToast(message : any, color:any) {
    const toast = await this.toastController.create({
      message: message,
      color : color,
      position: 'bottom',
      buttons: [{
        side: 'end',
        text: 'close'
      }],
      duration: 3000
    });
    toast.present();
  }

  toRegis(){
    this.route.navigateByUrl('/register');
  }

  ionViewDidEnter(){
    this.txtEmail="";
    this.txtPassword="";
  }

}
