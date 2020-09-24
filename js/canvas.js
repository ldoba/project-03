var Canvas = {
    init: function () {

        var that = this;

        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.paint = false;
        window.addEventListener('mousedown', function () {
            that.paint = true;
        });
        window.addEventListener('mouseup', function () {
            that.paint = false;
        });
        // suivi des coordonnées au clic
        this.canvas.addEventListener('mousedown', function (e) {
            that.draw(e.pageX, e.pageY);
        });
        this.canvas.addEventListener('mouseup', function (e) {
            that.draw(e.pageX, e.pageY);
        });
        //si clic gauche (mousedown) -> on dessine (draw) en fonction des coordonnées récupérées
        this.canvas.addEventListener('mousemove', function (e) {
            if (that.paint === true) {
                that.draw(e.pageX, e.pageY);
            }
        });
        //au clic sur le bouton on vide le canvas
        document.getElementById('reset').addEventListener('click', function () {
            that.clearDraw();
        });
    },

    draw: function (mouseX, mouseY) {
        var cvsOffset = $(this.canvas).offset();

        this.context.beginPath();
        this.context.fillStyle = "blue";
        this.context.arc(mouseX - cvsOffset.left, mouseY - cvsOffset.top, 1.5, 0, 2 * Math.PI);
        this.context.fill();
        this.context.closePath();
    },

    clearDraw: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

window.addEventListener('load', function () {
    Canvas.init();
});