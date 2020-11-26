export class Voxel {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.selected = false;
    }

    set selected(newVal = !this.selected) {
        this.selected = newVal;
    }

    get selected() {
        return this.selected;
    }
}
