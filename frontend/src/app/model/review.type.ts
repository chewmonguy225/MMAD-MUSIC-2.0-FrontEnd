import { User } from './user.type';
import { Item } from './item/item.type';

export interface ReviewId {
  username: string;
  itemId: number;
  itemType: string;
}

export interface Review {
  id?: ReviewId;  // mark id as optional
  user: User;
  item: Item;
  content: string;
  rating: number;
  createdAt: Date;
}

