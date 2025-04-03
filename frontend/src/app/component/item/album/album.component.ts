import { Component, OnInit } from '@angular/core';
import { ItemComponent } from '../item.component';
import { AlbumService } from '../../../service/item/album/album.service';
import { ArtistService } from '../../../service/item/artist/artist.service';

@Component({
  selector: 'app-album',
  imports: [],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent extends ItemComponent implements OnInit{

  constructor(private albumService: AlbumService){
    super(albumService);

  }

  ngOnInit(): void {
      
  }

  override onSpotifyClick(): void {
    if (this.item?.getSourceId()) {  // Ensure item and sourceId are valid
      const spotifyUrl = `https://open.spotify.com/album/${this.item.getSourceId()}`;
      window.open(spotifyUrl, "_blank");  // Opens Spotify page
    } else {
      console.error('Item or SourceId is missing');
    }
  }
}
