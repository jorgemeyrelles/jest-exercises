const ItemFactory = require('./item_factory');

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    return this.items.map((item) => {
      const { name, sellIn, quality } = item;
      const specialItem = ItemFactory.buildItem( name, sellIn, quality );

      return specialItem.update();
    });
  }
}

module.exports = {
  Shop,
}
