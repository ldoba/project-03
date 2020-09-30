//je crée ma class signature

class Signature {
    constructor() {
      this.initVars();
      this.initEvents();
    }
  
    initVars() {
      this.canvas = $('#canvas')[0];
      this.context = this.canvas.getContext("2d");
      this.isMouseClicked = false;
      this.isMouseInCanvas = false;
      this.prevX = 0;
      this.currX = 0;
      this.prevY = 0;
      this.currY = 0;
    }
  
    initEvents() {
      $('#canvas').on("mousemove", (e) => this.onMouseMove(e));
      $('#canvas').on("mousedown", (e) => this.onMouseDown(e));
      $('#canvas').on("mouseup", () => this.onMouseUp());
      $('#canvas').on("mouseout", () => this.onMouseOut());
      $('#canvas').on("mouseenter", (e) => this.onMouseEnter(e));
      $('#reset').on("click", (e) => this.clearDraw());

    }
    //si je clic droit
    onMouseDown(e) {
        this.isMouseClicked = true;
      this.updateCurrentPosition(e);
    }
    // curseur levé
    onMouseUp() {
        this.isMouseClicked = false;
    }
    
    onMouseEnter(e) {
        this.isMouseInCanvas = true;
      this.updateCurrentPosition(e);
    }

    onMouseOut() {
        this.isMouseInCanvas = false;
    }
    // si je me déplace et que je clic droit alors j'actualise la position et je dessine
    onMouseMove(e) {
      if (this.isMouseClicked && this.isMouseInCanvas) {
            this.updateCurrentPosition(e)
            this.draw();
      }
    }
    // je récupère la position de la souris
    updateCurrentPosition(e) {
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.clientX - this.canvas.offsetLeft;
        this.currY = e.clientY - this.canvas.offsetTop;
    }
    
    //Je trace mon dessin
    draw() {
        this.context.beginPath()
        // je relie les points en fonction de leur dernière position
        this.context.moveTo(this.prevX, this.prevY);
        this.context.lineTo(this.currX, this.currY);
        this.context.strokeStyle = "black";
        this.context.lineWidth = 2;
        this.context.stroke();
        this.context.closePath();
    }
    //vider le canvas au clic sur reset
    clearDraw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
  
  //  canvas dépend de la signature
  var canvas = new Signature();
