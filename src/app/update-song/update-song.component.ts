import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from '../model/song.model';
import { SongService } from '../services/song.service';
import { Album } from '../model/album.model';

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styles: []
})

export class UpdateSongComponent implements OnInit {

  albums! : Album[];
  updatedAlbId! : number;


  currentSong = new Song();

  constructor(private activatedRoute: ActivatedRoute,

    private router :Router,
    private songService: SongService) { }


    ngOnInit(): void {
      this.songService.listeAlbums().
      subscribe(albs => {console.log(albs);
      this.albums = albs._embedded.albums;
      }
      );
      this.songService.consulterSong(this.activatedRoute.snapshot.params['id']).
      subscribe( son =>{ this.currentSong = son;
      this.updatedAlbId = this.currentSong.album.idAlb;
      } ) ;
    }

  updateSong() {
    this.currentSong.album = this.albums.
    find(alb => alb.idAlb == this.updatedAlbId)!;
    this.songService.updateSong(this.currentSong).subscribe(son => {
    this.router.navigate(['songs']); }
    );
  }
}
