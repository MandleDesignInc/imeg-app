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
    projectHeadline: string;

    news: News;

    projectSpotlightProjects: string;
    projectSpotlight: string;

    projects: Projects;

    contacts: Contact;

    locations: Location;

    map: string;
    safeMap: SafeHtml;
}

export class News {
  headline: string;
  articles: Article;
}

export class Article {
  title: string;
  content: string;
  safeContent: SafeHtml;
  link: string;
}

export class Projects {
  project: Project;
}

export class Project {
  projectHeadline: string;
  previewImage: string;
  title: string;
  path: string;
}

export class Contact {
  name: string;
  title: string;
  email: string;
}

export class Location {
  title: string;
  description: string;
  descriptionSafe: SafeHtml;
}
