import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationExtras, Router } from '@angular/router';
import { PoesiasService } from '../services/poesia.service';
import { Poesia } from '../domain/poesia';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  poesia: Poesia = new Poesia();

  constructor(private route: ActivatedRoute, 
    private poesiaService: PoesiasService,
    private router:Router) { 
      route.queryParams.subscribe(params =>{
        console.log(params)
        this.poesia = params.poesia;
        if(this.router.getCurrentNavigation().extras.queryParams){
          this.poesia = this.router.getCurrentNavigation().extras.queryParams.poesia
        }
      })
    }
  poesias: any;

  ngOnInit() {
    this.poesias = this.poesiaService.getPoesias();
  }

  editar(poesia: any){
    let params: NavigationExtras = {
      queryParams: {
        poesia: poesia
      }
    }
    
  }

  contador = 0;

  update(cnt : any){
    console.log(cnt)
    this.contador = cnt
  }

  guardar(){
    console.log(this.poesia);
    this.poesiaService.save(this.poesia);
    this.router.navigate(['folder']);
  }

}
