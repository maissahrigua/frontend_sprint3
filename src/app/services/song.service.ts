import { Injectable } from '@angular/core';
import { Song } from '../model/song.model';
import { Album } from '../model/album.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../config';
import { AlbumWrapper } from '../model/albumWrapped.model';
import { AuthService } from './auth.service';

const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json'} )};

@Injectable({
  providedIn: 'root'
})
export class SongService {

  apiURLAlb: string = 'http://localhost:51627/songs/alb';

 // albums : Album[];

  songs!: Song[];

  song! : Song;

  constructor(private http : HttpClient,
    private authService : AuthService) {
    /* this.albums = [ {idAlb : 1, nomAlb : "Red"},
      {idAlb : 2, nomAlb : "Lover"}]; */
    /*this.songs = [
    { idSong : 1, nomSong : "Betty", timeSong : 3.14, dateCreation: new Date("01/14/2011"), album : {idAlb : 1, nomAlb : "Red"}},
    { idSong : 2, nomSong : "Loml", timeSong : 4.28, dateCreation : new Date("12/17/2010"), album : {idAlb : 2, nomAlb : "Lover"}},
    { idSong : 3, nomSong :"The one", timeSong : 3.46, dateCreation : new Date("02/20/2020"), album : {idAlb : 1, nomAlb : "Red"}}
    ];*/
    }

  listeSong(): Observable<Song[]> {
    return this.http.get<Song[]>(apiURL+"/all");
  }
    
  ajouterSong(son: Song): Observable<Song> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Song>(apiURL + "/addprod", son, { headers: httpHeaders });
  }

  supprimerSong(id : number) {
    const url = `${apiURL}/delson/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterSong(id: number): Observable<Song> {
    const url = `${apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Song>(url,{headers:httpHeaders});
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
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<Song>(apiURL+"/updateson", son, {headers:httpHeaders});
  }

  listeAlbums(): Observable<AlbumWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<AlbumWrapper>(this.apiURLAlb, { headers: httpHeaders }
    );

  }

  /*consulterAlbum(id:number): Album{
    return this.albums.find(alb => alb.idAlb == id)!;
  } */
      
  rechercherParAlbum(idAlb: number):Observable< Song[]> {
    const url = `${apiURL}/prodscat/${idAlb}`;
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
