export abstract class Item {
    // Add readonly modifier to id if it's never meant to be changed after creation
    constructor(
        public id: number, // No default 0 if it's always assigned by backend
        protected sourceId: string, // Changed to 'string'
        protected name: string,     // Changed to 'string'
        protected imageURL: string, // Changed to 'string'
        protected createdAt: string, // Added for backend consistency
        protected updatedAt: string  // Added for backend consistency
    ) { }

    // Optionally add a static method to create from JSON to ensure default values/types
    static fromJson(json: any): Item {
        // This is a simplified example. In a real app, you might parse dates or validate.
        // This method needs to be implemented by concrete subclasses (Artist, Album, Song)
        // or you'd need a way to determine the concrete type here.
        // For an abstract class, this method usually isn't here unless it's a factory.
        throw new Error("Abstract Item cannot be instantiated directly from JSON. Use specific subclass fromJson.");
    }


    getImageURL(): string {
        // You might want to handle cases where imageURL is null/empty on backend
        return this.imageURL || "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";
    }

    getId(): number {
        return this.id;
    }

    getSourceId(): string {
        return this.sourceId;
    }

    getName(): string {
        return this.name;
    }

    getCreatedAt(): string {
        return this.createdAt;
    }

    getUpdatedAt(): string {
        return this.updatedAt;
    }
}