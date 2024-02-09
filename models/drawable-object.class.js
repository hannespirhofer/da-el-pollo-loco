class DrawableObject {
    x = 120;
    y = 275;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['image/image1.png', 'image/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {        
        // drawImage is an official JS method()
        if (this.img) {
            try {
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            } catch (e) {
                console.warn('Error when rendering the image ', e);
                console.log(this.img.src);
            }
        }
    }

    drawFrame(ctx) {

        if (this instanceof Character || this instanceof Chicken || this instanceof Bottle || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}