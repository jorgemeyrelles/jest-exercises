const { Conjured, AgedBrie, Backstage, Sulfuras, Default } = require('./classes');

const ITEM_MAP = {
  'Aged Brie': AgedBrie,
  'Backstage passes to a TAFKAL80ETC concert': Backstage,
  'Sulfuras, Hand of Ragnaros': Sulfuras,
  'conjured': Conjured
};

class ItemFactory {
  static buildItem(name, sellIn, quality) {
    let item = new Default(name, sellIn, quality);
    const conjured = (name).toLowerCase().match('conjured');

    if (ITEM_MAP.hasOwnProperty(name)) {
      item = new ITEM_MAP[name](name, sellIn, quality);
    }
    if (conjured) {
      item = new ITEM_MAP[conjured[0]](name, sellIn, quality);
    }

    return item;
  }
}

module.exports = ItemFactory;
