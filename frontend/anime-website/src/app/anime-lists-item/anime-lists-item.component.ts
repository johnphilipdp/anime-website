import { Component, Input } from '@angular/core';

import { Anime } from '../Anime'

@Component({
  selector: 'app-anime-lists-item',
  templateUrl: './anime-lists-item.component.html',
  styleUrls: ['./anime-lists-item.component.scss']
})
export class AnimeListsItemComponent {
@Input() anime?: Anime

}
