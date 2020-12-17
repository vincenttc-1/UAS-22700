import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Md5 } from "md5-typescript";
import { ServicesService } from '../services.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  checked : boolean;
  @Input() txtFirstName : string = "";
  @Input() txtLastName: string = "";
  @Input() txtEmail: string = "";
  @Input() txtPassword: string = "";
  @Input() txtConfirmPassword: string = "";
  @Input() cbTerms;

  constructor(
    private service : ServicesService,
    private route : Router,
    private toastController : ToastController,
    private navCtrl : NavController,
  ) { }

  ngOnInit() {
    
  }

  register(){
    if(!this.txtFirstName || !this.txtLastName || !this.txtEmail || !this.txtPassword || !this.txtConfirmPassword){
      this.presentToast("Please Fill All Fields","danger");
      return;
    }
    else{
      if(this.txtPassword !== this.txtConfirmPassword){
        this.presentToast("Confirmed Password Doesn't Match","danger");
      }
      else{
        const user = {
          firstName : this.txtFirstName,
          lastName : this.txtLastName,
          email : this.txtEmail,
          password : Md5.init(this.txtPassword)
        }

        const userReg = {
          email : this.txtEmail,
          password : this.txtPassword
        }
        
        this.service.register(userReg).then(
          res=>{
            console.log(res);
            //if success, add user to collection ms_user
            this.service.addUser(user);
            this.presentToast('Account Has Been Created Successfully!','success');
            this.navCtrl.navigateForward('/login')
          },
          err => {
            console.log(err.message);
            this.presentToast(err.message,'danger');
          }
        )
      }
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

  toLogin(){
    this.route.navigateByUrl('/login');
  }

  ionViewDidEnter(){
    this.txtFirstName = "";
    this.txtLastName = "";
    this.txtEmail = "";
    this.txtPassword = "";
    this.txtConfirmPassword = "";
  }


}
