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
  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case 'Aged Brie':
          if (item.quality < 50) {
            item.quality += 1;
          }
          item.sellIn -= 1;
          if (item.sellIn < 0 && item.quality < 50) {
            item.quality += 1;
          }
          continue;
        case 'Backstage passes to a TAFKAL80ETC concert':
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
          continue;
        case 'Sulfuras, Hand of Ragnaros':
          if (item.sellIn < 0 && item.quality < 50) {
            item.quality += 1;
          }
          continue;
        default:
          if (item.quality > 0 && item.quality < 50) {
            item.quality -= 1;
          }
          item.sellIn -= 1;
          if (item.sellIn < 0 && item.quality > 0) {
            item.quality -= 1;
          } else if (item.sellIn > 0 && item.quality < 50) {
            item.quality += 1;
          }
          break;
      }
      // if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      //   if (item.quality > 0) {
      //     if (item.name != 'Sulfuras, Hand of Ragnaros' && item.quality < 50) {
      //       item.quality = item.quality - 1;
      //     }
      //   }
      // } else {
      //   if (item.quality < 50) {
      //     item.quality = item.quality + 1;
      //     if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
      //       if (item.sellIn < 11) {
      //         if (item.quality < 50) {
      //           item.quality = item.quality + 1;
      //         }
      //       }
      //       if (item.sellIn < 6) {
      //         if (item.quality < 50) {
      //           item.quality = item.quality + 1;
      //         }
      //       }
      //     }
      //   }
      // }
      // if (item.name != 'Sulfuras, Hand of Ragnaros') {
      //   item.sellIn = item.sellIn - 1;
      // }
      // if (item.sellIn < 0) {
      //   if (item.name != 'Aged Brie') {
      //     if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      //       if (item.quality > 0) {
      //         // default ??
      //         if (item.name != 'Sulfuras, Hand of Ragnaros') {
      //           item.quality = item.quality - 1;
      //         }
      //       }
      //     } else {
      //       item.quality = item.quality - item.quality;
      //     }
      //   } else {
      //     if (item.quality < 50) {
      //       item.quality = item.quality + 1;
      //     }
      //   }
      // }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
