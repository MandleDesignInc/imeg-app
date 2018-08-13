import {TagList} from '../tags/tags-model';
import {SafeHtml} from '@angular/platform-browser';

export class Region {
    id: string;
    title: string;
    subtitle: string;
    alias: string;
    content: string;

    headerImage: string;
    headerBackgroundImage: string;

    news: string;
    projectHeadline: string;
    projects: string;

    headline: string;
    articles: string;
    project: string;


    map: string;
    safeMap: SafeHtml;
}

export class Article {
  title: string;
  content: string;
  link: string;
}
export class regionArticles {
  articles: Article[];
}
