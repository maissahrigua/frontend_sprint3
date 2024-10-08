import { Component, OnInit } from '@angular/core';
import { Song } from '../model/song.model';
import { SongService } from '../services/song.service';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html'
})
export class SongsComponent implements OnInit{

  songs?: Song[];

  constructor(private songService: SongService,
    private router: Router,
    public authService: AuthService
  ) {
    //this.songs = songService.listeSongs();
  }
  ngOnInit(): void {
    this.chargerSongs();
  }

  chargerSongs(){
    this.songService.listeSong().subscribe(sons => {
    console.log(sons);
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
