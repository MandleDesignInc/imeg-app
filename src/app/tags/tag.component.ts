import { Component, OnInit } from '@angular/core';
import { ContentService } from '../core/content.service';
import { Tag, TagPage } from './tags-model';
import { Globals } from '../core/globals';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Component({
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.css'],
    animations: [
        trigger('slideUp', [
            state('in', style({ transform: 'translateY(0)' })),
            transition('void => *', [
                style({ transform: 'translateY(100%)' }),
                animate(500)
            ]),
            transition('* => void', [
                animate(500, style({ transform: 'translateY(-100%)' }))
            ])
        ]),
        trigger('tagState', [
            state('out', style({
                backgroundPosition: '0% 0%'
            })),
            state('in', style({
                backgroundPosition: '50% 0%'
            })),
            transition('out => in', animate('0.5s ease-in-out')),
            transition('in => out', animate('0.5s ease-in-out'))
        ])
    ]
})
class TagComponent implements OnInit {

    public readonly content$ = this.contentService.getPageObservableWithTags(this.getId()).pipe(
        map(page => this.setPage(page)),
        //map((page: TagPage) => page.content.match(new RegExp('(?<=\<.*\>)(.*)(?=<)', 'g'))));
        map((page: TagPage) => page.content.match(new RegExp(/<(.*)*?>/g))));

    id: number;
    page: TagPage;
    constructor(
        private contentService: ContentService,
        public globals: Globals,
        private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.contentService.getPageObservableWithTags(this.getId()).subscribe(page => this.setPage(page));
    }

    // TODO: refactor all of this
    setPage(page: TagPage): TagPage {
        let tags: Tag[] = [];
        let tagsHolder = page.tags;
        tagsHolder.forEach(item => {
            let tag = new Tag();
            tag.id = item.id;
            tag.path = item.path;
            tag.previewImage = item.previewImage;
            tag.name = item.name;
            tags.push(tag);
        });
        page.tags = tags;
        // TODO: move this into data object classes
        page.safeContent = this.sanitizer.bypassSecurityTrustHtml(page.content);
        this.page = page;
        return page;
    }

    getId(): number {
        return 0;
    }

    toggleTagState(index: number): void {
        console.log('before state change : ' + this.page.tags[index].state);
        this.page.tags[index].state = this.page.tags[index].state === 'in' ? 'out' : 'in';
        console.log('after state change : ' + this.page.tags[index].state);
    }

}

export class ServicesComponent extends TagComponent {
    getId(): number {
        return 23;
    }
}

export class MarketsComponent extends TagComponent {
    getId(): number {
        return 24;
    }
}
