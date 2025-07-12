import { Item } from "./item.type";
import { Artist } from "./artist.type";

export class Album extends Item {
    artists: Artist[];

    constructor(
        id: number,
        sourceId: string,
        name: string,
        imageURL: string,
        createdAt: string,
        updatedAt: string,
        artists: Artist[]
    ) {
        super(id, sourceId, name, imageURL, createdAt, updatedAt);
        this.artists = artists;
    }

    static override fromJson(json: any): Album {
        return new Album(
            json.id,
            json.sourceId,
            json.name,
            json.imageURL,
            json.createdAt,
            json.updatedAt,
            Array.isArray(json.artists)
                ? json.artists.map((artistJson: any) => Artist.fromJson(artistJson))
                : []
        );
    }
}
