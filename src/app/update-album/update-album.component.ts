import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Album } from '../model/album.model';
import { Song } from '../model/song.model';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-update-album',
  templateUrl: './update-album.component.html',
  styles: ``
})
export class UpdateAlbumComponent implements OnInit{

  @Input()
  album! : Album;

  @Input()
  ajout!:boolean;

  @Output()
  albumUpdated = new EventEmitter<Album>();

  constructor(){ }

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateAlbum ",this.album);
  }

  saveAlbum(){
    this.albumUpdated.emit(this.album);
  }
}
