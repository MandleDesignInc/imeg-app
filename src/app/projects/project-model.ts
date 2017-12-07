import {TagList} from '../tags/tags-model';
import {SafeHtml} from '@angular/platform-browser';

export class Project {
    id: string;
    title: string;
    subtitle: string;
    alias: string;
    content: string;
    safeContent: SafeHtml;
    headerImage: string;
    previewImage: string;
    location: string;
    size: string;
    sidebarContent: string;
    safeSidebarContent: SafeHtml;
    tags: TagList;
}

export class ProjectList {
    projects: Project[];
    headerImage: string;
    tag: string;
    content: string;
    safeContent: SafeHtml;
}