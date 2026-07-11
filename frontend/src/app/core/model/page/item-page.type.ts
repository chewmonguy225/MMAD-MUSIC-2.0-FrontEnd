import { Album } from '../item/album.type';
import { Item, MusicProvider } from '../item/item.type';
import { ItemReviewViewModel } from '../review/ItemReviewsResponse';

export interface ItemPage {
  item: Item;

  reviews: ItemReviewViewModel[];

  // Optional depending on item type
  songs?: SimplifiedSong[];
  albums?: Album[];
}

export interface SimplifiedSong {
  name: string;
  sourceId: string;
  provider: MusicProvider;
}