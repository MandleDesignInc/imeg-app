const keyframes: any[] = [
  { transform: 'translateX(0)' },
  { transform: 'translateX(-100%)', offset: .2 },
  { transform: 'translateX(-100%)' },
];

const optsProto: KeyframeAnimationOptions = {
  duration: 3000,
};

export function slideLeft(slide1: Element, slide2: Element): void {
  slide1.animate(keyframes, optsProto);
  slide2.animate(keyframes, optsProto);
}