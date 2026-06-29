import { Component } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { SearchBarComponent } from '../../component/search-bar/search-bar.component';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/user/auth/auth.service';
import { UiService } from '../../core/service/ui/ui.service';

@Component({
  selector: 'app-explore-page',
  imports: [BasePageComponent, SearchBarComponent],
  templateUrl: './explore-page.component.html',
  styleUrl: './explore-page.component.css'
})
export class ExplorePageComponent extends BasePageComponent {

  constructor(private router: Router, authService: AuthService, ui: UiService) {
    super(authService, ui);
  }

  onItemSelected(item: any) {
    console.log(item.id)
    this.router.navigate(['/item', item.id]);
  }
}
