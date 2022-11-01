import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/service/image.service';
import { ProyectoService } from 'src/app/service/proyecto.service';


@Component({
  selector: 'app-newproyecto',
  templateUrl: './newproyecto.component.html',
  styleUrls: ['./newproyecto.component.css']
})
export class NewproyectoComponent implements OnInit {
  nombreP: string;
  descripcionP: string;
  imgP: string;
  

  constructor(
    private proyectoS: ProyectoService, 
    private router: Router,
    public imageService: ImageService) {}

  ngOnInit(): void {}

  onCreate(): void{
    const proyecto = new Proyecto(this.nombreP, this.descripcionP, this.imgP);
    this.imgP = this.imageService.urlProyecto;
    console.log(this.imgP);
    this.proyectoS.save(proyecto).subscribe(
      data => {
        alert("Proyecto añadido correctamente");
        this.router.navigate(['']);
      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

  uploadImage($event: any){
    const nameProyecto = "proyecto_";
    this.imageService.uploadImageProyecto($event, nameProyecto)
  }
}