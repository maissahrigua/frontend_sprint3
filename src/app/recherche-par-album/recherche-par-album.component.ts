import { Component, OnInit } from '@angular/core';
import { Song } from '../model/song.model';
import { Album } from '../model/album.model';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-recherche-par-album',
  templateUrl: './recherche-par-album.component.html',
  styles: ``
})
export class RechercheParAlbumComponent implements OnInit{

  songs! : Song[];
  IdAlbum! : number;
  albums! : Album[];

  constructor(private songService: SongService){ }

  ngOnInit(): void {
    this.songService.listeAlbums().subscribe(albs => {this.albums = albs._embedded.albums;
    console.log(albs);
    });
  }

  onChange() {
    this.songService.rechercherParAlbum(this.IdAlbum).subscribe(sons =>{this.songs=sons});
  }

}
