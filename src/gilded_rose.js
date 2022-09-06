class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateAgedBrie(item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
    item.sellIn -= 1;
    if (item.sellIn < 0 && item.quality < 50) {
      item.quality += 1;
    }
    return item;
  }

  updateBackstage(item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
    if (item.sellIn < 11 && item.quality < 50) {
      item.quality += 1;
    }
    if (item.sellIn < 6 && item.quality < 50) {
      item.quality += 1;
    }
    item.sellIn -= 1;
    if (item.sellIn < 0) {
      item.quality = item.quality - item.quality;
    }
    return item;
  }

  updateDefault(item) {
    if (item.quality > 0 && item.quality < 50) {
      item.quality -= 1;
    }
    item.sellIn -= 1;
    if (item.sellIn < 0 && item.quality > 0) {
      item.quality -= 1;
    } else if (item.sellIn > 0 && item.quality < 50) {
      item.quality += 1;
    }
    return item;
  }

  updateSulfuras(item) {
    return item;
  }

  updateQuality() {
    for (let item of this.items) {
      switch (item.name) {
        case 'Aged Brie':
          item = this.updateAgedBrie(item);
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          item = this.updateBackstage(item);
          break;
        case 'Sulfuras, Hand of Ragnaros':
          item = this.updateSulfuras(item);
          break;
        default:
          item = this.updateDefault(item);
          break;
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
