class Slider {
  private currentIndex: number = 1; // Начинаем с первого реального слайда
  private slides: HTMLDivElement;
  private slideElements: NodeListOf<HTMLElement>;
  private totalSlides: number;
  private prevButton: HTMLButtonElement;
  private nextButton: HTMLButtonElement;
  private isTransitioning: boolean = false; // Флаг, чтобы отслеживать, происходит ли переход

  constructor() {
      this.slides = document.querySelector(".slides")!;
      this.slideElements = document.querySelectorAll(".slide")!;
      this.totalSlides = this.slideElements.length;

      this.prevButton = document.querySelector(".prev")!;
      this.nextButton = document.querySelector(".next")!;

      const firstClone = this.slideElements[0].cloneNode(true) as HTMLElement;
      const lastClone = this.slideElements[this.totalSlides - 1].cloneNode(true) as HTMLElement;

      this.slides.append(firstClone);  
      this.slides.prepend(lastClone);  

      this.nextButton.addEventListener("click", () => this.moveSlider('next'));
      this.prevButton.addEventListener("click", () => this.moveSlider('prev'));

      this.slides.addEventListener('transitionend', () => this.handleTransitionEnd());

      this.updateSlider(false);
  }

  private moveSlider(direction: "prev" | "next") {
      if (this.isTransitioning) return; 

      this.isTransitioning = true; 

      if (direction === "prev") {
          this.currentIndex--; 
      } else {
          this.currentIndex++; 
      }

      // Корректируем индекс, если он выходит за пределы
      if (this.currentIndex > this.totalSlides) {
          this.currentIndex = 1; // Перемещаем на первый реальный слайд
      } else if (this.currentIndex < 1) {
          this.currentIndex = this.totalSlides; // Перемещаем на последний реальный слайд
      }

      this.updateSlider();
  }

  private updateSlider(transition: boolean = true) {
      if (transition) {
          this.slides.style.transition = "transform 0.5s ease-in-out";
      } else {
          this.slides.style.transition = "none";
      }

      const offset = -this.currentIndex * 100;
      this.slides.style.transform = `translateX(${offset}%)`;
  }

  private handleTransitionEnd() {
      this.isTransitioning = false;

      if (this.currentIndex === this.totalSlides + 1) { 
          this.slides.style.transition = "none";
          this.currentIndex = 1; 
          this.updateSlider(false);
      } else if (this.currentIndex === 0) { 
          this.slides.style.transition = "none";
          this.currentIndex = this.totalSlides; 
          this.updateSlider(false);
      }
  }
}

document.addEventListener('DOMContentLoaded', () => new Slider());
