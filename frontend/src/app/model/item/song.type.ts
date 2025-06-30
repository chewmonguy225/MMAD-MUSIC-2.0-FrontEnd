import { Item } from './item.type'
import { Artist } from './artist.type';
import { Album } from './album.type';

export class Song extends Item{
    constructor(
        id: number = 0,
        sourceID: String = "",
        artist: Artist = new Artist(-1, "-1", "-1", "-1"),
        album: Album = new Album(-1, "-1", artist, "-1", "-1"),
        name: String,
        imageURL: String = "default.jpg") {
        super(id, sourceID, name, imageURL);
    }
}