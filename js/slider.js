//SLIDER

const sliderTuto = document.querySelector(".slider-container");


//Déclaration des classes

class Slider {
    constructor(slider) {
        this.slider = slider;
        //selection de tous les items de slider-items
        this.slides = this.slider.querySelector(".slider-items").children;
        //La longueur du tableau = totalSlides
        this.totalSlides = this.slides.length;
        var totalSlides = this.slides.lenght;
        //on récupère la taille du container
        this.containerWidth = this.slider.offsetWidth;
        //next slide button
        this.nextSlide = this.slider.querySelector(".next-slide");
        //previous slide button
        this.prevSlide = this.slider.querySelector(".prev-slide");
        //pause  button
        this.pause = this.slider.querySelector(".pause");
        //play  button
        this.play = this.slider.querySelector(".play");
        //appel fonction next
        var that = this;
        this.nextSlide.onclick = function () {
            that.next()
        };
        //appel fonction prev
        this.prevSlide.onclick = function () {
            that.prev()
        };
        this.index = 0;
        this.jumpWidth = 0;
        //appel fonction setwidth
        this.setWidth()

        //automatic slider
        var autoslider = setInterval(function () {
            that.next()}, 5000);
        window.onload = autoslider;

        //stop auto
        this.pause.onclick = function() {
            clearInterval(autoslider);
        };

        //play auto
        this.play.onclick = function () {
            setInterval(function () {
                that.next()}, 5000);
            };
    }
    //set width of all slides items
    setWidth() {
        var totalWidth = 0;
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].style.width = this.containerWidth + "px";
            totalWidth = totalWidth + this.containerWidth;
        }
        //set width of slider-items container
        this.slider.querySelector(".slider-items").style.width = totalWidth + "px";
    }
    //suivant méthode
    next() {
        if (this.index == this.totalSlides - 1) {
            this.index = 0;
            this.jumpWidth = 0;
        }
        else {
            this.index++;
            this.jumpWidth = this.jumpWidth + this.containerWidth;
        }
        this.slider.querySelector(".slider-items").style.marginLeft = -this.jumpWidth + "px";
    }
    //precédent méthode
    prev() {
        if (this.index == 0) {
            this.index = this.totalSlides - 1;
            this.jumpWidth = (this.totalSlides - 1) * this.containerWidth;
        }
        else {
            this.index--;
            this.jumpWidth = this.jumpWidth - this.containerWidth;
        }
        this.slider.querySelector(".slider-items").style.marginLeft = -this.jumpWidth + "px";
    }
}


//création d'objet

var sliderImages = new Slider(sliderTuto);
