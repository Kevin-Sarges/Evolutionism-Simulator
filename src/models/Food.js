class Food {
    constructor(position) {
        this.available = true;
        this.position = position;
    }

    isAvalibe(){
        return this.available;
    }

    getPosition(){
        return this.position;
    }

    consume(){
        this.available = false;
    }

    reset(){
        this.available = true;
        this.position.x = Math.floor(Math.random() * 500);
        this.position.y = Math.floor(Math.random() * 500);
    }
}