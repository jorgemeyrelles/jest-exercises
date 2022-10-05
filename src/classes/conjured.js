const { Item } = require('./item');

class Conjured extends Item {
  update() {
    if (this.quality > 0 && this.quality < 50) {
      this.quality -= 2;
    }
    if (this.sellIn < 0 && this.quality < 50) {
      this.quality -= 2;
    }
    return this;
  }
}

module.exports = {
  Conjured,
}
