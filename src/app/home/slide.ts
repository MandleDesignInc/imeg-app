export class ImegSlide {
  constructor(public id: string, public caption: string, public image: string, public link: string, public state: string = 'inactive') {

  }

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }
}

export class ModxSlideModel {

  MIGX_id: string;
  caption: string;
  image: string;
  link: string;


}
