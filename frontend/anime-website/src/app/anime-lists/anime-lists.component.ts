import { Component } from '@angular/core';

import { Anime } from '../Anime'

@Component({
  selector: 'app-anime-lists',
  templateUrl: './anime-lists.component.html',
  styleUrls: ['./anime-lists.component.scss']
})
export class AnimeListsComponent {

  animes: Anime[] = [
    {
      id: 1,
      name: 'Mob Psycho',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero aperiam aliquam quam similique, voluptas eaque sunt molestiae, eius saepe ducimus velit beatae maiores provident tenetur dignissimos accusantium nesciunt ipsa maxime.',
      image: '/assets/images/mob_psycho.jpg'
    },
    {
      id: 2,
      name: 'Chainsaw Man',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero aperiam aliquam quam similique, voluptas eaque sunt molestiae, eius saepe ducimus velit beatae maiores provident tenetur dignissimos accusantium nesciunt ipsa maxime.',
      image: '/assets/images/chainsaw_man.jpg'
    },
    {
      id: 3,
      name: 'Bleach: Thousand Year Bloodwar',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero aperiam aliquam quam similique, voluptas eaque sunt molestiae, eius saepe ducimus velit beatae maiores provident tenetur dignissimos accusantium nesciunt ipsa maxime.',
      image: '/assets/images/bleach.jpg',
    },
    {
      id: 4,
      name: 'Bocchi The Rock!',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero aperiam aliquam quam similique, voluptas eaque sunt molestiae, eius saepe ducimus velit beatae maiores provident tenetur dignissimos accusantium nesciunt ipsa maxime.',
      image: '/assets/images/bocchi_the_rock.jpg',

    }
  ]

}
