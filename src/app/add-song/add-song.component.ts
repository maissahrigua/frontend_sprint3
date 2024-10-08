import { Component, OnInit } from '@angular/core';
import { Song } from '../model/song.model';
import { SongService } from '../services/song.service';
import { Album } from '../model/album.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html'
})
export class AddSongComponent implements OnInit{

  albums! : Album[];
  newIdAlb! : number;
  newAlbum! : Album;

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

  addSong(){
    this.newSong.album = this.albums.find(alb => alb.idAlb == this.newIdAlb)!;
    this.songService.ajouterSong(this.newSong)
    .subscribe(son => {
    console.log(son);
    this.router.navigate(['songs']);
    });
  }
}
