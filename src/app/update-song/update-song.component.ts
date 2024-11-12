import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from '../model/song.model';
import { SongService } from '../services/song.service';
import { Album } from '../model/album.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styles: []
})

export class UpdateSongComponent implements OnInit {

  albums!: Album[];
  updatedAlbId!: number;

  uploadedImage!: File;
  isImageUpdated: Boolean = false;
  myImage!: string;

  currentSong = new Song();

  constructor(private activatedRoute: ActivatedRoute,

    private router: Router,
    private songService: SongService) { }


  /* ngOnInit(): void {
    this.songService.listeAlbums().
    subscribe(albs => {console.log(albs);
    this.albums = albs._embedded.albums;
    }
    );
    this.songService.consulterSong(this.activatedRoute.snapshot.params['id']).
    subscribe( son =>{ this.currentSong = son;
    this.updatedAlbId = this.currentSong.album.idAlb;

    this.songService
    .loadImage(this.currentSong.image.idImage)
    .subscribe((img: Image) => {
    this.myImage = 'data:' + img.type + ';base64,' + img.image;
    });
    } ) ;
  }
*/
  ngOnInit(): void {
    this.songService.listeAlbums().
      subscribe(albs => {
        this.albums = albs._embedded.albums;
      });
    this.songService.consulterSong(this.activatedRoute.snapshot.params['id'])
      .subscribe(son => {
        this.currentSong = son;
        this.updatedAlbId = son.album.idAlb;
      });
  }


  /* updateSong() {
    this.currentSong.album = this.albums.
    find(alb => alb.idAlb == this.updatedAlbId)!;
    this.songService.updateSong(this.currentSong).subscribe(son => {
    this.router.navigate(['songs']); }
    );
  } */

  /* updateSong() {
    this.currentSong.album = this.albums.find(alb => alb.idAlb == this.updatedAlbId)!;
    //tester si l'image du song a été modifiée
    if (this.isImageUpdated) {
      this.songService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.currentSong.image = img;
          this.songService
            .updateSong(this.currentSong)
            .subscribe((son) => {
              this.router.navigate(['songs']);
            });
        });
    }
    else {
      this.songService
        .updateSong(this.currentSong)
        .subscribe((son) => {
          this.router.navigate(['songs']);
        });
    }
  } */

  updateSong() {
    this.currentSong.album = this.albums.find(alb => alb.idAlb == this.updatedAlbId)!;
    this.songService
      .updateSong(this.currentSong)
      .subscribe((son) => {
        this.router.navigate(['songs']);
      });
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

  onAddImageSong() {
    this.songService
      .uploadImageSon(this.uploadedImage,
        this.uploadedImage.name, this.currentSong.idSong)
      .subscribe((img: Image) => {
        this.currentSong.images.push(img);
      });
  }

  supprimerImage(img: Image) {
    let conf = confirm("Are you sure ?");
    if (conf)
      this.songService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentProduit.images
        const index = this.currentSong.images.indexOf(img, 0);
        if (index > -1) {
          this.currentSong.images.splice(index, 1);
        }
      });
  }
}
