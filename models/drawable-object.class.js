class DrawableObject {
    x = 120;
    y = 275;
    height = 150;
    width = 100;
    img;
    audio;
    imageCache = {};
    currentImage = 0;


    /**
     * This method creates a new Image Object
     * @param {String} path Url of the Image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This method loops through the array and calls loadImage on each url and sets the imageCache
     * @param {Array} arr Array with many image Urls
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * This method draws the image to the context "ctx" and calls drawImage() which is official js method
     * @param {Object} ctx Canvas 2d context
     */
    draw(ctx) {
        if (this.img) {
            try {
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            } catch (e) {
                console.warn('Error when rendering the image ', e);
                console.log(this.img.src);
            }
        }
    }

    /**
     * This is a helper function for the collision and can be activated in the addtoMap() method to draw a rectangle around the img
     * @param {Object} ctx Canvas 2d context
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Bottle || this instanceof Coin || this instanceof Poult) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}