import { Item } from './item.type'

export class Song extends Item{
    constructor(
        id: number = 0,
        sourceID: String = "",
        artistID: number = 0,
        albumID: number =0,
        name: String,
        imageURL: String = "default.jpg") {
        super(id, sourceID, name, imageURL);
    }
}