import { Component, OnInit } from '@angular/core';
import { SongService } from '../../../service/item/song/song.service';
import { Song } from '../../../model/item/song.type';
import { catchError, of } from 'rxjs';
import { ItemComponent } from '../item.component';

@Component({
  selector: 'app-artist',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent extends ItemComponent implements OnInit {

  constructor(private songService: SongService) {
    super(songService);
  }

  ngOnInit(): void {
    
  }

  onSpotifyClick(): void {
    if (this.item?.getSourceId()) {  // Ensure item and sourceId are valid
      const spotifyUrl = `https://open.spotify.com/artist/${this.item.getSourceId()}`;
      window.open(spotifyUrl, "_blank");  // Opens Spotify page
    } else {
      console.error('Item or SourceId is missing');
    }
  }
  
}
