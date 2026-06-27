import { UserDTO } from "../service/user/user.service";
import { Item } from "./item/item.type";

export interface Review {
  id: number;
  rating: number;
  description: string;
  item: Item;
  user: UserDTO;
  createdAt?: string;
  updatedAt?: string;
}