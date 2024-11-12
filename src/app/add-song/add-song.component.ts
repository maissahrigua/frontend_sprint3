import { Component, OnInit } from '@angular/core';
import { Song } from '../model/song.model';
import { SongService } from '../services/song.service';
import { Album } from '../model/album.model';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html'
})
export class AddSongComponent implements OnInit{

  albums! : Album[];
  newIdAlb! : number;
  newAlbum! : Album;

  uploadedImage!: File;
  imagePath: any;

  newSong = new Song();

  constructor(private songService: SongService,
    private router :Router
  ) { }

  ngOnInit(): void {
    this.songService.listeAlbums().
    subscribe(albs => {console.log(albs);
    this.albums = albs._embedded.albums;
    }
    );
  }

  addSong() {
    this.newSong.album = this.albums.find(alb => alb.idAlb == this.newIdAlb)!;
    this.songService
      .ajouterSong(this.newSong)
      .subscribe((son) => {
        this.songService
          .uploadImageFS(this.uploadedImage,
            this.uploadedImage.name, son.idSong)
          .subscribe((response: any) => { }
          );
        this.router.navigate(['songs']);
      }
    );
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }
}
