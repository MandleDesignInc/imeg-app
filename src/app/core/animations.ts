import { trigger, state, style, transition, animate } from '@angular/animations';

const keyframes: any[] = [
  { transform: 'translateX(0)' },
  { transform: 'translateX(-100%)', offset: .2 },
  { transform: 'translateX(-100%)' },
];

const optsProto: any = {
  duration: 3000,
};

export function slideLeft(slide1: HTMLElement, slide2: HTMLElement): void {
  slide1.animate(keyframes, optsProto);
  slide2.animate(keyframes, optsProto);
}

const closedStyle = {
  opacity: 0,
};

const openedStyle = {
  opacity: 1,
};

export const fadeInAnimationTrigger =
  trigger('fadeIn', [
    state('closed', style(closedStyle)),
    state('open', style(openedStyle)),
    transition('open => closed', [ animate('0.6s') ]),
    transition('closed => open', [ animate('0.2s') ]),
  ]);
