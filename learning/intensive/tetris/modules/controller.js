export class Controller {
  constructor (game, view) {
    this.game = game;
    this.view = view;

  }
  init(codeKey) {
    window.addEventListener('keydown', e => {
      if(e.code === codeKey){
        this.view.init();
        this.start();
      }
    })
  };

  start() {
    this.view.showArea(this.game.viewArea);
    this.view.createBlockScore();
    this.view.createBlockNextTetramino();

    const tick = () => {
      setTimeout(() => {
        this.game.moveDown();
        this.view.showArea(this.game.viewArea);
        tick();
      }, 1000);
    }

    tick();

    window.addEventListener('keydown', e => {
      switch (e.code) {
        case 'ArrowLeft':
          this.game.moveLeft();
          this.view.showArea(this.game.viewArea);
        break;
        case 'ArrowUp':
          this.game.rotateTetramino();
          this.view.showArea(this.game.viewArea);
        break;
        case 'ArrowRight':
          this.game.moveRight();
          this.view.showArea(this.game.viewArea);
        break;
        case 'ArrowDown':
          this.game.moveDown();
          this.view.showArea(this.game.viewArea);
        break;
      }
    });
  }
}