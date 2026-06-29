import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../../model/item/item.type';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private reviewOpenSubject = new BehaviorSubject<boolean>(false);
  private selectedItemSubject = new BehaviorSubject<Item | null>(null);

  reviewOpen$ = this.reviewOpenSubject.asObservable();
  selectedItem$ = this.selectedItemSubject.asObservable();

  get reviewOpen(): boolean {
    return this.reviewOpenSubject.value;
  }

  get selectedItem(): Item | null {
    return this.selectedItemSubject.value;
  }

  openReviewBuilder(item?: Item) {
    this.selectedItemSubject.next(item ?? null);
    this.reviewOpenSubject.next(true);
  }

  closeReviewBuilder() {
    this.reviewOpenSubject.next(false);
    this.selectedItemSubject.next(null);
  }
}