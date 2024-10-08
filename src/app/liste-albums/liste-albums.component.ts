import { Component, OnInit } from '@angular/core';
import { Album } from '../model/album.model';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-liste-albums',
  templateUrl: './liste-albums.component.html',
  styles: ``
})
export class ListeAlbumsComponent implements OnInit{
  
  albums!: Album[];

  ajout:boolean=true;

  updatedAlb:Album = {"idAlb":0,"nomAlb":""};

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.chargerAlbums();
  }

  chargerAlbums(){
    this.songService.listeAlbums().
    subscribe(albs => {this.albums = albs._embedded.albums;
    console.log(albs);
    });
  }

  albumUpdated(alb:Album){
    console.log("Alb updated event",alb);
    this.songService.ajouterAlbum(alb).subscribe( ()=> this.chargerAlbums());
  }

  updateAlb(alb:Album) {
    this.updatedAlb=alb;
    this.ajout=false;
  }
    
}
