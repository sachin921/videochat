import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { ConfirmPasswordValidator } from '../confirmed.validator';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {HomeService} from './home.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  registertaionPopup:boolean=true;
  registerForm: FormGroup;
  submitted = false;
  successMsg = false;
  //login
  loginForm : FormGroup;
  submittedlogin = false;
  isloggedin: boolean=false;

  constructor(private formBuilder: FormBuilder, 
    private service: RegisterService, 
    private route: ActivatedRoute,
    private router: Router,
    private loginService:HomeService ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],        
      phone: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],        
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      c_pass: ['', Validators.required]
    },
    {
      validator: ConfirmPasswordValidator("pass", "c_pass")
    });

    //login Validation
    this.loginForm = this.formBuilder.group({		
      login_email: ['', [Validators.required, Validators.email]],
      login_password: ['', Validators.required]
      });
  }

  get f() { return this.registerForm.controls; }
  get l() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    else{
      let data = this.registerForm.value;
      this.service.create(data).subscribe(response=>{	
        // console.log(response['status'])
      if(response['status'] == 200){

        this.registerForm.reset();
        this.successMsg=true;
        setTimeout(() => {
          this.successMsg=false;
          // this.registertaionPopup=false;
        }, 3000); 
      }

          
      });
    }
    
  }
  //login
  onLogin()
  {
    this.submittedlogin = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    else
		{      
      let data = this.loginForm.value;
      this.loginService.login(data).subscribe(data=>{				
				if(data['response'] != "")
				{
                    
          localStorage.setItem('isLoggedIn', "true");              
          localStorage.setItem('id', data['response'].id); 
          this.loginService.setLoggedInStatus("true"); 
                                                    
					setTimeout (() => {
              
					    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>this.router.navigate(["/profile"]));					  
					}, 3000)
				}
				else
				{
                    
          // this.loginmsg  = true;
          // this.spinner.hide();                    
          // this.responsemsg = data['return_data'];
					setTimeout (() => {	

						// this.successmsg  = false;
					}, 3000)
				}
				
			});
        }     
  } 
}
