
import {SafeHtml} from '@angular/platform-browser';

export class Pages {
    results: Page[];
}

export class Page {

    id: number;
    type: string;
    contentType: string;
    pagetitle: string;
    longtitle: string;
    description: string;
    alias: string;
    link_attributes: string;
    published: boolean;
    pub_date: number;
    unpub_date: number;
    parent: number;
    isFolder: boolean;
    introtext: string;


    content: string;
    safeContent: SafeHtml;


    richtext: boolean;
    template: number;
    menuindex: number;
    searchable: boolean;
    cacheable: boolean;
    createdby: number;
    createdon: string;
    editedby: number;
    editedon: string;
    deleted: boolean;
    deletedby: number;
    publishedon: number;
    publishedby: number;
    menutitle: string;
    donthit: boolean;
    privateweb: boolean;
    privatemgr: boolean;
    content_dispo: boolean;
    hidemenu: boolean;
    class_key: string;
    context_key: string;
    content_type: number;
    uri: string;
    uri_override: number;
    hide_children_in_tree: number;
    show_in_tree: number;
}

export class NavigationItem {
    path: string;
    title: string;
    template: number;
    id: number;
    alias: string;

    constructor(id: number, alias: string, title: string, template: number) {
        this.id = id;
        this.alias = alias;
        this.path = '/' + alias;
        this.title = title;
        this.template = template;
    }
}

export class Slide {

    MIGX_id: string;
    caption: string;

    image: string;

}




