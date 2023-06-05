const mainMenu = document.querySelector(".main-menu");
const game = document.querySelector(".game");
const startBtn = document.querySelector(".main-menu__start-btn");
const cursorFollowItem = document.querySelector(".cursor-follow-item");
const moneyEl = document.querySelector(".money__value");
const grids = document.querySelectorAll(".grid");
const shopItems = document.querySelectorAll(".shop__item");

const mainMenuAnimationDuration = 500;
const gridRows = 5;
const gridCols = 7;
const sproutTime = {
  "Apple Seed": 60,
  "Blueberry Seed": 15,
  "Carrot Seed": 30,
  "Wheat Seed": 10,
};
const grownSources = {
  "Apple Seed": "img/apple.png",
  "Blueberry Seed": "img/blueberry.png",
  "Carrot Seed": "img/carrot.png",
  "Wheat Seed": "img/wheat.png",
};
const sellingPrices = {
  "Apple Seed": 40,
  "Blueberry Seed": 20,
  "Carrot Seed": 10,
  "Wheat Seed": 5,
};

let money = 30;
let holdingItem = false;
let itemHolding = null;

function init() {
  for (const grid of grids) {
    for (let i = 0; i < gridRows * gridCols; i++) {
      const plot = document.createElement("div");
      plot.classList.add("plot");
      plot.addEventListener("click", () => {
        if (holdingItem && plot.children.length === 0) {
          const name =
            itemHolding.querySelector(".shop__item__name").textContent;
          const price =
            itemHolding.querySelector(".shop__item__price").textContent;
          const imgSrc = itemHolding.querySelector(".shop__item__img").src;
          const plant = document.createElement("img");
          plant.classList.add("plant");
          plant.src = imgSrc;
          money -= price;
          moneyEl.textContent = money;
          holdingItem = false;
          itemHolding = null;
          cursorFollowItem.src = "";
          plot.appendChild(plant);
          setTimeout(() => {
            plant.src = grownSources[name];
            plant.classList.add("grown");
            plot.addEventListener(
              "click",
              () => {
                plot.removeChild(plant);
                money += sellingPrices[name];
                moneyEl.textContent = money;
              },
              { once: true }
            );
          }, sproutTime[name] * 1000);
        }
      });
      grid.appendChild(plot);
    }
  }

  for (const shopItem of shopItems) {
    shopItem.addEventListener("click", () => {
      const price = shopItem.querySelector(".shop__item__price").textContent;
      const imgSrc = shopItem.querySelector(".shop__item__img").src;
      if (price > money) {
        alert("Not Enough Money");
        return;
      }
      cursorFollowItem.src = imgSrc;
      holdingItem = true;
      itemHolding = shopItem;
    });
  }
}

startBtn.addEventListener("click", () => {
  mainMenu.style.animationDuration = `${mainMenuAnimationDuration}ms`;
  mainMenu.classList.add("animate");
  setTimeout(() => {
    mainMenu.style.display = "none";
    game.style.display = "initial";
  }, mainMenuAnimationDuration);
  init();
});

document.addEventListener("mousemove", (e) => {
  cursorFollowItem.style.left = `${e.clientX}px`;
  cursorFollowItem.style.top = `${e.clientY}px`;
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    cursorFollowItem.src = "";
    holdingItem = false;
    itemHolding = null;
  }
});
