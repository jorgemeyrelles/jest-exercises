const { AgedBrie, Backstage, Sulfuras, Default } = require('./classes');

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    return this.items.map((item) => {
      const { name, sellIn, quality } = item;
      switch (item.name) {
        case 'Aged Brie':
          const agedBrie = new AgedBrie(name, sellIn, quality);
          return agedBrie.update();
        case 'Backstage passes to a TAFKAL80ETC concert':
          const backstage = new Backstage(name, sellIn, quality);  
          return backstage.update();
        case 'Sulfuras, Hand of Ragnaros':
          const sulfuras = new Sulfuras(name, sellIn, quality);
          return sulfuras.update();
        default:
          const def = new Default(name, sellIn, quality);
          return def.update();
      }
    });
  }
}

module.exports = {
  Shop,
}
