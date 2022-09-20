const { AgedBrie, Backstage, Sulfuras, Default } = require('./classes');

const ITEM_MAP = {
  'Aged Brie': AgedBrie,
  'Backstage passes to a TAFKAL80ETC concert': Backstage,
  'Sulfuras, Hand of Ragnaros': Sulfuras
};

class ItemFactory {
  static buildItem(name, sellIn, quality) {
    let item = new Default(name, sellIn, quality);

    if (ITEM_MAP.hasOwnProperty(name)) {
      item = new ITEM_MAP[name](name, sellIn, quality);
    }

    return item;
  }
}

module.exports = ItemFactory;
