const { AgedBrie, Backstage, Sulfuras, Default } = require('./classes');

const ITEM_MAP = {
  'Aged Brie': AgedBrie,
  'Backstage passes to a TAFKAL80ETC concert': Backstage,
  'Sulfuras, Hand of Ragnaros': Sulfuras
};

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    return this.items.map((item) => {
      const { name, sellIn, quality } = item;
      if (ITEM_MAP.hasOwnProperty(name)) {
        const specialItem = new ITEM_MAP[name](name, sellIn, quality);
        return specialItem.update();
      }

      const def = new Default(name, sellIn, quality);
      return def.update();
    });
  }
}

module.exports = {
  Shop,
}
