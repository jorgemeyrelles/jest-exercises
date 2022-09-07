const { Item } = require('./item');

class Default extends Item {
  update() {
    if (this.quality > 0 && this.quality < 50) {
      this.quality -= 1;
    }
    this.sellIn -= 1;
    if (this.sellIn < 0 && this.quality > 0) {
      this.quality -= 1;
    } else if (this.sellIn > 0 && this.quality < 50) {
      this.quality += 1;
    }
    return this;
  }
}

module.exports = {
  Default,
}
