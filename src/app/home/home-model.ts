import {Tile} from '../tiles/tile';
import {Page} from '../core/content-model';

export class HomePage {
    page: Page;
    tiles: Tile[];
    merger: Merger;
}

export class Merger {
  id: number;
  title: string;
  description: string;
  link: string;
}
