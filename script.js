// Пример 1 зачем нужен сеттер
// Set - принимает, Get - отдает
// const sum = {
//   all: {
//     a: 0,
//     b: 0
//   },
//   calculate() {
//     this.all.result = this.all.a + this.all.b;
//   },
//   set a(param) {
//     this.all.a = param;
//     this.calculate();
//   },
//   set b(param) {
//     this.all.b = param;
//     this.calculate();
//   },
//   get a() {
//     return "Значение a: " + this.all.a;
//   },
//   get result() {
//     return this.all.result;
//   }
// };
// sum.a = 3;
// sum.b = 13;
// console.log(sum.a);

const record = document.querySelector("#record");
const shot = document.querySelector("#shot");
const hit = document.querySelector("#hit");
const dead = document.querySelector("#dead");
const enemy = document.querySelector("#enemy");
const again = document.querySelector("#again");

const game = {
  ships: [
    { location: ["26", "36", "46", "56"], hit: ["", "", "", ""] },
    { location: ["11", "12", "13"], hit: ["", "", ""] },
    { location: ["69", "79"], hit: ["", ""] },
    { location: ["32"], hit: [""] }
  ]
};

const play = {
  record: 0,
  shot: 0,
  hit: 0,
  dead: 0,
  set updateData(data) {
    this[data] += 1;
    this.render();
  },
  render() {
    record.textContent = this.record;
    shot.textContent = this.shot;
    hit.textContent = this.hit;
    dead.textContent = this.dead;
  }
};

const show = {
  hit(elem) {
    this.changeClass(elem, "hit");
  },
  miss(elem) {
    this.changeClass(elem, "miss");
  },
  dead(elem) {
    this.changeClass(elem, "dead");
  },
  changeClass(elem, value) {
    elem.className = value;
  }
};

const fire = (event) => {
  const target = event.target;
  if (target.classList.length !== 0 || target.tagName !== "TD") return;
  show.miss(target);
  play.updateData = "shot";

  for (let i = 0; i < game.ships.length; i++) {
    const ship = game.ships[i];
    const index = ship.location.indexOf(target.id);
    if (index >= 0) {
      show.hit(target);
      play.updateData = "hit";
      ship.hit[index] = "x";
      const life = ship.hit.indexOf("");
      if (life < 0) {
        play.updateData = "dead";
        for (const id of ship.location) {
          show.dead(document.getElementById(id));
        }
      }
    }
  }
};

const init = () => {
  enemy.addEventListener("click", fire);
};

init();
