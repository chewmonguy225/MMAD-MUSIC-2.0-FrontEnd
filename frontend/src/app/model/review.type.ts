import { Item } from "./item/item.type";
import { User } from "./user.type";

export interface Review {
  id: number;           // Matches ReviewResponseDTO.id
  rating: number;       // Matches ReviewResponseDTO.rating
  description: string;  // Matches ReviewResponseDTO.description (backend uses 'description', so let's stick to it for consistency)
  itemId: number;       // Matches ReviewResponseDTO.itemId
  itemName: string;     // Matches ReviewResponseDTO.itemName
  userId: number;       // Matches ReviewResponseDTO.userId
  username: string;     // Matches ReviewResponseDTO.username
  createdAt?: string;   // Backend sends ISO string like "2025-07-09T12:00:00". Type as string, or convert to Date on client.
  updatedAt?: string;   // Matches ReviewResponseDTO.updatedAt
}

// For POST /reviews (creation)
export interface ReviewPostRequestPayload {
  username: string;
  itemId: number;   
  rating: number;    
  description: string;  
}

// For PUT /reviews/{id} (update - if you chose the JSON body approach for PUT)
export interface UpdateReviewPayload {
  rating: number;       // Matches UpdateReviewRequest.rating
  description: string;  // Matches UpdateReviewRequest.description
}