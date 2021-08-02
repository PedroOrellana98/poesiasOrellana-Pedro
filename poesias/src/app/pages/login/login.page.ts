import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/domain/persona';
import { PersonasService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  persona: Persona = new Persona();
  persona2: Persona = new Persona();

  constructor(private personaService: PersonasService,
    private route:Router) { }

  ngOnInit() {
  }

  async login(){
    const correo = this.persona.correo
    const clave = this.persona.clave
    this.personaService.findUser(correo, clave).subscribe(data=>{
      console.log(data[0])
      this.persona2=data[0]
      try{
        if(this.persona2.correo==correo && this.persona2.clave==clave){
          this.route.navigate(['poesias']);
        }else{
          this.route.navigate(['login']);
        }
      }
      catch(error){console.log('Error: ->', error);
        this.route.navigate(['login']);}
    });
  }

}
