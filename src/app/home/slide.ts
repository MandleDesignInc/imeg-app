export class Slide {

    MIGX_id: string;
    caption: string;
    image: string;

    state: string = 'inactive';


    toggleState() {
        this.state = this.state === 'active' ? 'inactive' : 'active';
    }

}

