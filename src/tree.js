export class TreeDrawer {
  constructor(context) {
    this.context = context;
  }
  drawDataTree(tree, trunkLength = 40) {
    // draw initial tree position
    this.context.translate(tree.x, tree.y);
    this.drawDataBranch(tree, trunkLength);
  }

  drawDataBranch(branch, length) {
    const angle = branch.angle * Math.PI / 180;
    this.context.rotate(angle);
    this.drawBranch(length);
  
    // draw branches
    this.context.translate(0, -length);
    branch.children.forEach(child => this.drawDataBranch(child, length / 1.25));
    
    // draw leafs
    if (!branch.children.length) {
      this.drawLeaf(45);
      this.drawLeaf(-45);
      this.drawLeaf(20);
    }
  
    // reset context
    this.context.translate(0, length);
    this.context.rotate(-angle);
  }

  drawLeaf(angle) {
    this.context.beginPath();
    this.context.strokeStyle = 'green';
    this.context.lineWidth = 1;
    this.context.fillStyle = 'lightgreen';
    this.context.moveTo(0, 0);
    this.context.ellipse(180 / angle / 2, 180 / angle / 2, 2, 5, angle * Math.PI / 180, 0, 2 * Math.PI);
    this.context.stroke();
    this.context.fill();
  }

  drawBranch(length) {
    this.context.beginPath();
    this.context.strokeStyle = 'brown';
    this.context.lineWidth = length / 8;
    this.context.moveTo(0, 0);
    this.context.lineTo(0, -length);
    this.context.stroke();
  }
}
