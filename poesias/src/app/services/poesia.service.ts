import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Poesia } from '../domain/poesia';

@Injectable({
  providedIn: 'root'
})
export class PoesiasService {

  constructor(public afs: AngularFirestore) { }

  save(poesia: Poesia){
    const refPoesias = this.afs.collection("poesias");

    if(poesia.uid == null){
      poesia.uid = this.afs.createId();
      poesia.activo = true;
    }

    refPoesias.doc(poesia.uid).set(Object.assign({}, poesia));
  }

  getPoesias(): Observable<any[]>{
    return this.afs.collection("poesias",
      ref => ref.where("activo", "==", true)
    ).valueChanges();
  }
}