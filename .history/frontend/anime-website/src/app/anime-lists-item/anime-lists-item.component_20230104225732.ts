import { Component } from '@angular/core';

import { Anime } from './Anime'

@Component({
  selector: 'app-anime-lists-item',
  templateUrl: './anime-lists-item.component.html',
  styleUrls: ['./anime-lists-item.component.scss']
})
export class AnimeListsItemComponent {

  animes: Anime[] = [
    {
      id: 1,
      name: 'Mob Psycho',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero aperiam aliquam quam similique, voluptas eaque sunt molestiae, eius saepe ducimus velit beatae maiores provident tenetur dignissimos accusantium nesciunt ipsa maxime.',

    },
    {
      id: 2,
      name: 'Chainsaw Man',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero aperiam aliquam quam similique, voluptas eaque sunt molestiae, eius saepe ducimus velit beatae maiores provident tenetur dignissimos accusantium nesciunt ipsa maxime.'
    },
    {
      id: 3,
      name: 'Bleach: Thousand Year Bloodwar',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero aperiam aliquam quam similique, voluptas eaque sunt molestiae, eius saepe ducimus velit beatae maiores provident tenetur dignissimos accusantium nesciunt ipsa maxime.'
    }
  ]

}
