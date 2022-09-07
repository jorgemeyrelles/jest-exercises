const { Item } = require('./item');

class Backstage extends Item {
  update() {
    if (this.quality < 50) {
      this.quality += 1;
    }
    if (this.sellIn < 11 && this.quality < 50) {
      this.quality += 1;
    }
    if (this.sellIn < 6 && this.quality < 50) {
      this.quality += 1;
    }
    this.sellIn -= 1;
    if (this.sellIn < 0) {
      this.quality = this.quality - this.quality;
    }
    return this;
  }
}

module.exports = {
  Backstage,
};
