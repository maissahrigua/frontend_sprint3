import { Injectable } from '@angular/core';
import { Song } from '../model/song.model';
import { Album } from '../model/album.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../config';
import { AlbumWrapper } from '../model/albumWrapped.model';

const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json'} )};

@Injectable({
  providedIn: 'root'
})
export class SongService {

  apiURLAlb: string = 'http://localhost:53843/songs/alb';

 // albums : Album[];

  songs!: Song[];

  song! : Song;

  constructor(private http : HttpClient) {
    /* this.albums = [ {idAlb : 1, nomAlb : "Red"},
      {idAlb : 2, nomAlb : "Lover"}]; */
    /*this.songs = [
    { idSong : 1, nomSong : "Betty", timeSong : 3.14, dateCreation: new Date("01/14/2011"), album : {idAlb : 1, nomAlb : "Red"}},
    { idSong : 2, nomSong : "Loml", timeSong : 4.28, dateCreation : new Date("12/17/2010"), album : {idAlb : 2, nomAlb : "Lover"}},
    { idSong : 3, nomSong :"The one", timeSong : 3.46, dateCreation : new Date("02/20/2020"), album : {idAlb : 1, nomAlb : "Red"}}
    ];*/
    }

  listeSong(): Observable<Song[]>{
    return this.http.get<Song[]>(apiURL);
  }
    
  ajouterSong( son: Song):Observable<Song>{
    return this.http.post<Song>(apiURL, son, httpOptions);
  }

  supprimerSong(id : number) {
    const url = `${apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterSong(id: number): Observable<Song> {
    const url = `${apiURL}/${id}`;
    return this.http.get<Song>(url);
  }

  trierSongs(){
    this.songs = this.songs.sort((n1,n2) => {
    if (n1.idSong! > n2.idSong!) {
      return 1;
    }
    if (n1.idSong! < n2.idSong!) {
      return -1;
    }
      return 0;
    });
  }


  updateSong(son :Song) : Observable<Song>
  {
    return this.http.put<Song>(apiURL, son, httpOptions);
  }

  listeAlbums():Observable<AlbumWrapper>{
    return this.http.get<AlbumWrapper>(this.apiURLAlb);
  }

  /*consulterAlbum(id:number): Album{
    return this.albums.find(alb => alb.idAlb == id)!;
  } */
      
  rechercherParAlbum(idAlb: number):Observable< Song[]> {
    const url = `${apiURL}/sonsalb/${idAlb}`;
    return this.http.get<Song[]>(url);
  }


  rechercherParNom(nom: string):Observable< Song[]> {
    const url = `${apiURL}/sonsByName/${nom}`;
    return this.http.get<Song[]>(url);
  }

  ajouterAlbum( alb: Album):Observable<Album>{
    return this.http.post<Album>(this.apiURLAlb, alb, httpOptions);
  }
}
