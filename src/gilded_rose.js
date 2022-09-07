const { AgedBrie, Backstage, Sulfuras, Default } = require('./classes');

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      const { name, sellIn, quality } = item;
      switch (item.name) {
        case 'Aged Brie':
          const agedBrie = new AgedBrie(name, sellIn, quality);
          item = agedBrie.update();
          return [item];
        case 'Backstage passes to a TAFKAL80ETC concert':
          const backstage = new Backstage(name, sellIn, quality);  
          item = backstage.update();
          return [item];
        case 'Sulfuras, Hand of Ragnaros':
          const sulfuras = new Sulfuras(name, sellIn, quality);
          item = sulfuras.update();
          return [item];
        default:
          const def = new Default(name, sellIn, quality);
          item = def.update();
          return [item];
      }
    }
    return this.items;
  }
}

module.exports = {
  Shop,
}
