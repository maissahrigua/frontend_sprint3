import { Component, OnInit } from '@angular/core';
import { Song } from '../model/song.model';
import { SongService } from '../services/song.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html'
})
export class SongsComponent implements OnInit{

  songs?: Song[];

  apiurl:string='http://localhost:8080/songs/api';
  constructor(private songService: SongService,
    private router: Router,
    public authService: AuthService
  ) {
    //this.songs = songService.listeSongs();
  }
  ngOnInit(): void {
    this.chargerSongs();
  }

  /* chargerSongs(){
    this.songService.listeSong().subscribe(sons => {
    this.songs = sons;
    this.songs.forEach((son) => {
    this.songService
    .loadImage(son.image.idImage)
    .subscribe((img: Image) => {
    son.imageStr = 'data:' + img.type + ';base64,' + img.image;
    });
    });
    });
    } */
  chargerSongs() {
    this.songService.listeSong().subscribe(sons => {
      this.songs = sons;
    });
  }
      
    
    

  supprimerSong(s: Song) {
    let conf = confirm("Are you sure?");
    if (conf)
      this.songService.supprimerSong(s.idSong).subscribe(() => {
        console.log("Deleted Song");
        this.chargerSongs();
      });
  }
}
