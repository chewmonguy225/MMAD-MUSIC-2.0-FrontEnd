export interface SearchResult {
    id: number | null;
  
    sourceId: string;
    provider: 'SPOTIFY';
  
    name: string;
    imageURL: string;
  
    type: 'artist' | 'album' | 'song' | 'user';
  
    artists?: string[];
  }