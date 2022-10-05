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
    const nameMatched = (name).toLowerCase().match('conjured') || [name];

    if (ITEM_MAP.hasOwnProperty(nameMatched[0])) {
      item = new ITEM_MAP[nameMatched[0]](name, sellIn, quality);
    }

    return item;
  }
}

module.exports = ItemFactory;
