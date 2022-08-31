const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
  
  it("SellIn decreasing one", function() {
    const gildedRose = new Shop([new Item("foo", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
  });

  it("Quality decreasing one", function() {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("Quality can not be lower than zero", function() {
    const gildedRose = new Shop([new Item("foo", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("Quality do decrease one if sellIn is on the time", function() {
    const gildedRose = new Shop([new Item("foo", 1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
  });

  it("Quality do decrease twice as days passed way over 2 expirate day", function() {
    const gildedRose = new Shop([new Item("foo", -1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });

  it("The difference of quality changing sellIn date", function() {
    const gildedRoseOnTime = new Shop([new Item("foo", 1, 5)]);
    const itemsOnTime = gildedRoseOnTime.updateQuality();
    const gildedRoseOverTime = new Shop([new Item("foo", -1, 5)]);
    const itemsOverTime = gildedRoseOverTime.updateQuality();
    expect(itemsOnTime[0].quality - itemsOverTime[0].quality).toBe(1);
  });

  it("Quality can not be negative", function() {
    const gildedRose = new Shop([new Item("foo", -1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });

  it("Quality of aged Brie increase one more as the days pass way", function() {
    const gildedRoseOneDay = new Shop([new Item("Aged Brie", 1, 1)]);
    const itemsOneDay = gildedRoseOneDay.updateQuality();
    expect(itemsOneDay[0].quality).toBe(2);
  });
  
  it("SellIn less than 0, quality should increase twice", function() {
    const gildedRoseOneDay = new Shop([new Item("Aged Brie", -1, 1)]);
    const itemsOneDay = gildedRoseOneDay.updateQuality();
    expect(itemsOneDay[0].quality).toBe(3);
  });

  it("Quality of any product can not be more than 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });
  
  it("Quality of Sulfuras do not change for any sellIn value", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 7)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(7);
  });

  it("SellIn of Sulfuras does not change", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 7)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(5);
  });
  
  it("SellIn of Aged Brie reduce by one", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 7)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
  });
  
  it("Quality of Backstage passes increase as the days pass way [1]", function() {
    const backstage = "Backstage passes to a TAFKAL80ETC concert";
    const gildedRoseTenDay = new Shop([new Item(backstage, 10, 1)]);
    const itemsTenDay = gildedRoseTenDay.updateQuality();
    expect(itemsTenDay[0].quality).toBe(3);
  });
  
  it("Quality of Backstage passes increase as the days pass way [2]", function() {
    const backstage = "Backstage passes to a TAFKAL80ETC concert";
    const gildedRoseFiveDays = new Shop([new Item(backstage, 5, 1)]);
    const itemsFiveDays = gildedRoseFiveDays.updateQuality();
    expect(itemsFiveDays[0].quality).toBe(4);
  });
  
  it("Quality of Backstage passes increase as the days pass way [3]", function() {
    const backstage = "Backstage passes to a TAFKAL80ETC concert";
    const gildedRoseFiveDays = new Shop([new Item(backstage, 0, 10)]);
    const itemsFiveDays = gildedRoseFiveDays.updateQuality();
    expect(itemsFiveDays[0].quality).toBe(0);
  });
  
});
