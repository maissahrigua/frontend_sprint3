import { Album } from "./album.model";

export class Song {
    idSong! : number;
    nomSong! : string;
    timeSong! : number;
    dateCreation! : Date ;
    album!: Album;
}
    