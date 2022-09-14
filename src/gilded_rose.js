const { AgedBrie, Backstage, Sulfuras, Default } = require('./classes');

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    const arrResponse = new Array();
    for (let item of this.items) {
      const { name, sellIn, quality } = item;
      switch (item.name) {
        case 'Aged Brie':
          const agedBrie = new AgedBrie(name, sellIn, quality);
          item = agedBrie.update();
          arrResponse.push(item);
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          const backstage = new Backstage(name, sellIn, quality);  
          item = backstage.update();
          arrResponse.push(item);
          break;
        case 'Sulfuras, Hand of Ragnaros':
          const sulfuras = new Sulfuras(name, sellIn, quality);
          item = sulfuras.update();
          arrResponse.push(item);
          break;
        default:
          const def = new Default(name, sellIn, quality);
          item = def.update();
          arrResponse.push(item);
          break;
      }
    }
    return arrResponse;
  }
}

module.exports = {
  Shop,
}
