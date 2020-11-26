class Voxel {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.selected = false;
    }

    set selected(status) {
        this._selected = status;
    }

    get selected() {
        return this._selected;
    }

    toggleStatus = () => {
        this._selected = !this._selected;
    }

    equals(otherVox) {
        return this.x === otherVox.x && this.y === otherVox.y;
    }

}

export default Voxel;