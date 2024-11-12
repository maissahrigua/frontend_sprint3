import { Album } from "./album.model";
import { Image } from "./image.model";

export class Song {
    idSong! : number;
    nomSong! : string;
    timeSong! : number;
    dateCreation! : Date ;
    album!: Album;
    image! : Image;
    imageStr!:string;
    images!: Image[];
}
    