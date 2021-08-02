import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Persona } from 'src/app/domain/persona';
import { PersonasService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  nombre: string;

  persona: Persona = new Persona();

  personas: any;

  constructor(private route: ActivatedRoute, 
      private personaService: PersonasService) { 

    route.queryParams.subscribe(params => {
      console.log(params)
      this.nombre = params.nombre
    })

  }
    
  ngOnInit() {
    this.personas = this.personaService.getPersonas();
  }

  guardar(){
    console.log(this.persona);
    this.personaService.save(this.persona);
  }


}
