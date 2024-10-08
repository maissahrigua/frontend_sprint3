import { Album } from "./album.model";

export class AlbumWrapper{
    _embedded!: { albums: Album[]};
}