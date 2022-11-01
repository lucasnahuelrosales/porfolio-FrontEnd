import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, list, getDownloadURL} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  urlPerfil: string = "";
  urlProyecto: string = "";

  constructor(private storage: Storage) {
  }


  public uploadImagePerfil($event: any, namePerfil: string){
    const filePerfil = $event.target.files[0]
    const imgRefPerfil = ref(this.storage, `imagenPerfil/`+ namePerfil)
    uploadBytes(imgRefPerfil, filePerfil)
    .then(response => {this.getImagesPerfil()})
    .catch(error => console.log(error))
  }

  getImagesPerfil() {
    const imagesRef = ref(this.storage, 'imagenPerfil')
    list(imagesRef)
    .then(async response => {
      for(let item of response.items){
        this.urlPerfil = await getDownloadURL(item);
        console.log("La URL es: " + this.urlPerfil);
      }
    })
    .catch(error => console.log(error))
  }


  public uploadImageProyecto($event: any, nameProyecto: string){
    const fileProyecto = $event.target.files[0]
    const imgRefProyecto = ref(this.storage, `imagenProyecto/`+ nameProyecto)
    uploadBytes(imgRefProyecto, fileProyecto)
    .then(response => {this.getImagesProyecto()})
    .catch(error => console.log(error))
  }

  getImagesProyecto() {
    const imagesRefProyecto = ref(this.storage, 'imagenProyecto')
    list(imagesRefProyecto)
    .then(async response => {
      for(let item of response.items){
        this.urlProyecto = await getDownloadURL(item);
        console.log("La URL es: " + this.urlProyecto);
      }
    })
    .catch(error => console.log(error))
  }
  
}