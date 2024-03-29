import { GetResource } from "../services/services";

function cards() {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 38;
      this.changeToUAH();

      // Добавление класса по умолчанию, если он еще не добавлен
      if (!this.classes.includes("menu__item")) {
        this.classes = ["menu__item", ...this.classes];
      }
    }

    changeToUAH() {
      this.price = +this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      // добавления мейн класса если не переданы какие либо классы
      // if (this.classes.length === 0) {
      //   this.element = "menu__item";
      //   element.classList.add(this.element);
      // } else {
      this.classes.forEach((className) => element.classList.add(className));
      // }

      element.innerHTML = `      
      
          <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
    `;
      this.parent.append(element);
    }
  }

  GetResource("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, alt, title, descr, price }) => {
      new MenuCard(img, alt, title, descr, price, ".menu .container").render();
    });
  });
}

export default cards;
