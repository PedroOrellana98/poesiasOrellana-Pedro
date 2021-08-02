import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Poesia } from 'src/app/domain/poesia';
import { PoesiasService } from 'src/app/services/poesia.service';
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";

export interface FILE{
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-poesias',
  templateUrl: './poesias.page.html',
  styleUrls: ['./poesias.page.scss'],
})


export class PoesiasPage implements OnInit {

  fileUploadedPath: Observable<string>;
  files: Observable<FILE[]>;
  FileName: string;
  FileSize: number;
  isImgUploading: boolean;
  isImgUploaded: boolean;
  electrodomestico: Poesia;
  private ngFirestoreCollection: AngularFirestoreCollection<FILE>;

  texto: string;

  poesia: Poesia = new Poesia();

  poesias: any;

  constructor(private route: ActivatedRoute, 
      private poesiaService: PoesiasService,
      private angularFirestore: AngularFirestore,
      private angularFireStorage: AngularFireStorage) { 

    route.queryParams.subscribe(params => {
      console.log(params)
      this.texto = params.texto
    })

  }
    
  ngOnInit() {
    this.poesias = this.poesiaService.getPoesias();
  }

  async fileUpload(event: FileList) {

    const file = event.item(0);

    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!');
      return;
    }

    this.isImgUploading = true;
    this.isImgUploaded = false;

    this.FileName = file.name;

    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
    const imageRef = this.angularFireStorage.ref(fileStoragePath);

    const snap = await this.angularFireStorage.upload(fileStoragePath, file);
    this.getDownloadPath(snap);

  }

  async getDownloadPath(snap){
    const url = await snap.ref.getDownloadURL();
    this.poesia.imagen = url;
  }

  guardar(){
    console.log(this.poesia);
    this.poesiaService.save(this.poesia);
  }

}
