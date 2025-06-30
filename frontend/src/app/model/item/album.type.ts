import { Artist } from './artist.type';
import { Item } from './item.type'

export class Album extends Item{
    constructor(
        id: number = 0,
        sourceID: String = "",
        artist: Artist = new Artist(-1, "-1", "-1", "-1"),
        name: String,
        imageURL: String = "default.jpg") {
        super(id, sourceID, name, imageURL);
    }
}