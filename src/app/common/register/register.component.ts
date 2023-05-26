import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { User } from 'src/app/contracts/users/user';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserService } from 'src/app/services/common/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
 
 constructor(
  private formBuilder:FormBuilder,
  private userService:UserService,
  spinner:NgxSpinnerService,
  private toastrService:CustomToastrService,
  private alertify: AlertifyService,
  ){
super(spinner)

  }
  
  registerForm:FormGroup;

  ngOnInit(): void {
    //ikinci parametrede validasyonları tanımlarız.
   this.registerForm =  this.formBuilder.group({
    nameSurname: ["",[
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3)
    ]],
      username: ["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["",[
        Validators.required,
        Validators.email
      ]],
      password: ["",[
        Validators.required
      ]],
      passwordConfirm: ["",[
        Validators.required
      ]]
    },{
      validators:(group:AbstractControl):ValidationErrors | null => {
        let password = group.get("password").value;
        let passwordConfirm = group.get("passwordConfirm").value;
        return password === passwordConfirm ? null : { notSame: true };
      }
    });
  }

  get component(){
    return this.registerForm.controls;
  }
  submitted:boolean = false;
  async onSubmit(user:User) {
    this.submitted = true;
    // TODO: Use EventEmitter with form value
    // console.log(this.registerForm.value);
    if(this.registerForm.invalid)
      return;

    const result = await this.userService.create(user);
    if(result.success)
     {
      this.alertify.show(result.message, {
        messageType: MessageType.SUCCESS,
        position: Position.TopRight
      })
     }
     else {
      this.alertify.show(result.message, {
        messageType: MessageType.ERROR,
        position: Position.TopRight
      })
     }
  }
}
