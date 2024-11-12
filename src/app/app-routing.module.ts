import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongsComponent } from './songs/songs.component';
import { AddSongComponent } from './add-song/add-song.component';
import { UpdateSongComponent } from './update-song/update-song.component';
import { RechercheParAlbumComponent } from './recherche-par-album/recherche-par-album.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeAlbumsComponent } from './liste-albums/liste-albums.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SongGuard } from './song.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

const routes: Routes = [
  {path: "songs", component : SongsComponent},
  {path: "add-song", component : AddSongComponent, canActivate:[SongGuard]},
  {path: "updateSong/:id", component: UpdateSongComponent},
  {path: "rechercheParAlbum", component : RechercheParAlbumComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "listeAlbums", component : ListeAlbumsComponent},
  {path:'register',component:RegisterComponent},
  {path: 'login', component: LoginComponent},
  { path: 'verifEmail', component: VerifEmailComponent },
  {path: 'app-forbidden', component: ForbiddenComponent},
  { path: "", redirectTo: "songs", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
