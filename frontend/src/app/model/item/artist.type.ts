import { Item } from "./item.type";

export class Artist extends Item {


    constructor(
        id: number,
        sourceId: string,
        name: string,  
        imageURL: string,
        createdAt: string, 
        updatedAt: string 
    ) {
        // Pass all required parameters to the super (Item) constructor
        super(id, sourceId, name, imageURL, createdAt, updatedAt);
    }

    // You can add static factory methods to help create instances from API data
    static override fromJson(json: any): Artist {
   
        return new Artist(
            json.id,
            json.sourceId,
            json.name,
            json.imageURL,
            json.createdAt,
            json.updatedAt
        );
    }
}