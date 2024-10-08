import { Component, OnInit } from '@angular/core';
import { Song } from '../model/song.model';
import { Album } from '../model/album.model';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: ``
})
export class RechercheParNomComponent implements OnInit{

  nomSong!: string;
  songs! : Song[];

  allSongs! : Song[];
  searchTerm!: string;

  constructor(private songService: SongService){ }

    ngOnInit(): void {
      this.songService.listeSong().subscribe(sons => {
        console.log(sons);
        this.songs = sons;
      });
    }

  rechercherSons(){
    this.songService.rechercherParNom(this.nomSong).subscribe(sons => {
    this.songs = sons;
    console.log(sons)});
  }

  onKeyUp(filterText : string){
    this.songs = this.allSongs.filter(item =>
    item.nomSong.toLowerCase().includes(filterText));
  }

}
