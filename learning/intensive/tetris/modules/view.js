import { BLOCK, ROWS, COLUMNS } from "../index.js";

export class View {
  constructor (container) {
    this.container = container;
    this.preview();
  }

  colors = {
    J: 'FireBrick',
    I: 'CadetBlue',
    O: 'Gold',
    L: 'SlateBlue',
    2: 'RoyalBlue',
    T: 'Indigo',
    S: 'MediumSeaGreen',
  };
  
  canvas = document.createElement('canvas');
  context = this.canvas.getContext('2d');

  preview() {
    this.container.textContent = '';
    const preview = document.createElement('div');
    preview.innerHTML = "press 'Enter'<br>to start the game";
    this.container.append(preview);
    preview.style.cssText = `
      border: 3px solid black;
      font-size: 18px;
      text-align: center;
      padding: 50px;
      grid-column: 1 / 3;
    `;
  }

  init() {
    this.container.textContent = '';
    this.canvas.classList.add('game-area');
    this.canvas.style.gridArea = 'game';
    this.container.append(this.canvas);
    this.canvas.width = BLOCK * COLUMNS;
    this.canvas.height = BLOCK * ROWS;
  };
  
  createBlockScore() {
    const scoreBlock = document.createElement('div');
    scoreBlock.style.cssText = `
    border: 2px solid black;
    font-size: 18px;
    padding: 20px;
    grid-area: stat;
    `;

    const lines = document.createElement('p');
    const score = document.createElement('p');
    const level = document.createElement('p');
    const record = document.createElement('p');

    scoreBlock.append(lines, score, level, record);
    this.container.append(scoreBlock);

    return(lns, scr, lvl, rec) => {
      lines.textContent = `lines: ${lns}`;
      score.textContent = `score: ${scr}`;
      level.textContent = `level: ${lvl}`;
      record.textContent = `record: ${rec}`;
    }
  }

  createBlockNextTetramino() {
    const tetraminoBlock = document.createElement('div');
    tetraminoBlock.style.cssText = `
    width: ${BLOCK * 4}px;
    height: ${BLOCK * 4}px;
    border: 2px solid black;
    padding: 10px;
    grid-area: next;
    display: flex;
    align-items: center;
    justify-content: center;
    `;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    tetraminoBlock.append(canvas);

    this.container.append(tetraminoBlock);

    return (tetramino) => {
      canvas.width = BLOCK * tetramino.length;
      canvas.height = BLOCK * tetramino.length;
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let y = 0; y < tetramino.length; y++) {
        const line = tetramino[y];
    
        for (let x = 0; x < line.length; x++) {
          const block = line[x];
          if (block !== 'o') {
            context.fillStyle = this.colors[block];
            context.strokeStyle = 'white';
            context.fillRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);
            context.strokeRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);
          }
        }
      }
    }
  }

  showArea(area) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let y = 0; y < area.length; y++) {
      const line = area[y];
  
      for (let x = 0; x < line.length; x++) {
        const block = line[x];
        if (block !== 'o') {
          this.context.fillStyle = this.colors[block];
          this.context.strokeStyle = 'white';
          this.context.fillRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);
          this.context.strokeRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);
        }
      }
    }
  };
}