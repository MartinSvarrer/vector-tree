import { throttle } from './throttle.js';
import { TreeDrawer } from './tree.js';

/**
* @type {HTMLCanvasElement}
*/
const canvas = document.getElementById('treeCanvas');
const context = canvas.getContext('2d');
const tree = new TreeDrawer(context);


const tree1 = {
  x: canvas.width / 2,
  y: canvas.height,
  angle: 0,
  children: [
    {
      angle: 35,
      children: [{
        angle: 35,
        children: [],
      },
      {
        angle: -10,
        children: []
      }
      ],
    },
    {
      angle: -10,
      children: [
        {
          angle: -35,
          children: [],
        },
        {
          angle: -10,
          children: []
        },
        {
          angle: 20,
          children: []
        }
      ]
    }
  ],
};

function clearCanvas() {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function applyForceToDataBranch(branch, forceX, forceY) {
  branch.angle *= forceY;
  branch.angle += forceX;
  branch.children.forEach(child => applyForceToDataBranch(child, forceX, forceY));
}

function onMouseMove(evt) {
  const mouseY = evt.clientY - canvas.offsetTop - canvas.height / 2;
  const forceY = 1 + mouseY / canvas.height / 2;

  const mouseX = evt.clientX - canvas.offsetLeft - canvas.width / 2;
  const forceX = mouseX / canvas.width * 2 * 15;

  const treeClone = JSON.parse(JSON.stringify(tree1));
  applyForceToDataBranch(treeClone, forceX, forceY);

  clearCanvas();
  tree.drawDataTree(treeClone);
}

tree.drawDataTree(tree1);
canvas.addEventListener('mousemove', throttle(onMouseMove, 100));