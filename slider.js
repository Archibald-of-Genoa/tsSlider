var Slider = /** @class */ (function () {
    function Slider() {
        var _this = this;
        this.currentIndex = 1; // Начинаем с первого реального слайда
        this.isTransitioning = false; // Флаг, чтобы отслеживать, происходит ли переход
        this.slides = document.querySelector(".slides");
        this.slideElements = document.querySelectorAll(".slide");
        this.totalSlides = this.slideElements.length;
        this.prevButton = document.querySelector(".prev");
        this.nextButton = document.querySelector(".next");
        // Добавляем клоны первого и последнего слайдов для бесконечной карусели
        var firstClone = this.slideElements[0].cloneNode(true);
        var lastClone = this.slideElements[this.totalSlides - 1].cloneNode(true);
        this.slides.append(firstClone); // Клон первого слайда в конец
        this.slides.prepend(lastClone); // Клон последнего слайда в начало
        this.nextButton.addEventListener("click", function () { return _this.moveSlider('next'); });
        this.prevButton.addEventListener("click", function () { return _this.moveSlider('prev'); });
        // Добавляем событие 'transitionend' для корректировки позиции и снятия флага перехода
        this.slides.addEventListener('transitionend', function () { return _this.handleTransitionEnd(); });
        // Устанавливаем начальное смещение слайдов
        this.updateSlider(false);
    }
    Slider.prototype.moveSlider = function (direction) {
        if (this.isTransitioning)
            return; // Если слайдер уже в движении, игнорируем последующие клики
        this.isTransitioning = true; // Устанавливаем флаг перехода
        if (direction === "prev") {
            this.currentIndex--;
        }
        else {
            this.currentIndex++;
        }
        this.updateSlider();
    };
    Slider.prototype.updateSlider = function (transition) {
        if (transition === void 0) { transition = true; }
        if (transition) {
            this.slides.style.transition = "transform 0.5s ease-in-out";
        }
        else {
            this.slides.style.transition = "none";
        }
        var offset = -this.currentIndex * 100;
        this.slides.style.transform = "translateX(".concat(offset, "%)");
    };
    Slider.prototype.handleTransitionEnd = function () {
        // Сбрасываем флаг перехода после завершения CSS-анимации
        this.isTransitioning = false;
        // Проверяем, не находимся ли мы на клонированном слайде
        if (this.currentIndex === this.totalSlides + 1) { // Если на клонированном первом слайде
            this.slides.style.transition = "none";
            this.currentIndex = 1; // Перемещаем на первый реальный слайд
            this.updateSlider(false);
        }
        else if (this.currentIndex === 0) { // Если на клонированном последнем слайде
            this.slides.style.transition = "none";
            this.currentIndex = this.totalSlides; // Перемещаем на последний реальный слайд
            this.updateSlider(false);
        }
    };
    return Slider;
}());
document.addEventListener('DOMContentLoaded', function () { return new Slider(); });
