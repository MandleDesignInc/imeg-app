import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { pluck, catchError, combineLatest, debounceTime, first } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { ContentService } from './content.service';
import { fadeInAnimationTrigger } from './animations';

@Component({
  selector: 'app-image-overlay',
  templateUrl: './image-overlay.component.html',
  styleUrls: ['./image-overlay.component.css'],
  animations: [
    fadeInAnimationTrigger
  ]
})
export class ImageOverlayComponent implements OnInit {

  @HostBinding('@fadeIn') fadeIn = 'closed';

  public readonly fadeInnerImage$ = new BehaviorSubject('closed');

  private readonly imageIndex$ = this.route.params.pipe(
    pluck('imageId'),
    catchError(() => of('')));

  public readonly imageUrl$ = this.content.getGallery().pipe(
    combineLatest(this.imageIndex$, (images: string[], index: number) => images[index] || ''));

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private content: ContentService,
  ) { }

  ngOnInit(): void {
    this.imageUrl$.pipe(debounceTime(50), first()).subscribe(x => {
      this.fadeIn = 'open';
    });
    this.imageUrl$.pipe(debounceTime(150), first()).subscribe(x => {
      this.fadeInnerImage$.next('open');
    });
  }

  public dismiss() {
    this.router.navigate([{ outlets: { modal: null } }]);
  }

}
