export interface Item {
    id: number | null;
    sourceId: string;
    name: string;
    imageURL: string;
    type: 'artist' | 'album' | 'song' | 'user';
  }