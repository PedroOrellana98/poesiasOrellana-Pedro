import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Persona } from '../domain/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(public afs: AngularFirestore) { }

  save(persona: Persona){
    const refPersonas = this.afs.collection("personas");

    if(persona.uid == null){
      persona.uid = this.afs.createId();
      persona.activo = true;
    }

    refPersonas.doc(persona.uid).set(Object.assign({}, persona));
  }

  getPersonas(): Observable<any[]>{
    return this.afs.collection("personas",
      ref => ref.where("activo", "==", true)
    ).valueChanges();
  }

  findUser(correo: string, clave: string): Observable<any>{
    console.log('Correo: ' + correo);
    return this.afs.collection('personas',
      ref => ref.where('correo', '==', correo).where('clave','==',clave)).valueChanges();
  }
}