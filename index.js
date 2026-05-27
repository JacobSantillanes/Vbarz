const DEFAULT_PRODUCTS = [
    { id: 1, name: "Blue Airheadz", type: "Flower", category: "Flower", price: 25, prices: { "1/8 oz": 25, "1/4 oz": 45, "1/2 oz": 80, "1 oz": 150 }, img: "0297D29F-CF14-49A5-A8D5-6E7583B832E9.jpeg" },
    { id: 4, name: "Zushi", type: "Flower", category: "Flower", price: 30, prices: { "1/8 oz": 30, "1/4 oz": 50, "1/2 oz": 90, "1 oz": 160 }, img: "34BC68A0-CA05-450C-96EB-D48896FEC3B7.jpeg" },
    { id: 5, name: "Bacio", type: "Flower", category: "Flower", price: 30, prices: { "1/8 oz": 30, "1/4 oz": 50, "1/2 oz": 80, "1 oz": 160 }, img: "bacio-thca-flower.webp" },
    { id: 6, name: "CranberryZ", type: "Flower", category: "Flower", price: 30, prices: { "1/8 oz": 30, "1/4 oz": 50, "1/2 oz": 80, "1 oz": 160 }, img: "9DA83100-BCC6-4720-AA99-84BEE0BB86B1.jpeg" },
    { id: 7, name: "Wrath of Grapes Smalls", type: "Flower", category: "Flower", price: 20, prices: { "1/8 oz": 20, "1/4 oz": 30, "1/2 oz": 60, "1 oz": 100 }, img: "70EBA04E-68E4-48F9-94D3-8C4D90E4EDA9.jpeg" },
    { id: 8, name: "Peach Bellini", type: "Flower", category: "Flower", price: 30, prices: { "1/8 oz": 30, "1/4 oz": 55, "1/2 oz": 100, "1 oz": 180 }, img: "40BFC420-3F58-470A-8FBA-B7DDB74295FF.jpeg" },
    { id: 9, name: "Pink Kitty", type: "Flower", category: "Flower", price: 30, prices: { "1/8 oz": 30, "1/4 oz": 55, "1/2 oz": 100, "1 oz": 180 }, img: "48A7D2AF-7497-48D6-AF97-50CB9531E6BA.jpeg" },
    { id: 10, name: "Ameretto Di Limone", type: "Flower", category: "Flower", price: 30, prices: { "1/8 oz": 30, "1/4 oz": 50, "1/2 oz": 80, "1 oz": 160 }, img: "177ED7D0-B3EF-4145-A6A5-589A88D606BC_4_5005_c.jpeg" },
    { id: 12, name: "Marmalades Smalls", type: "Flower", category: "Flower", price: 20, prices: { "1/8 oz": 20, "1/4 oz": 30, "1/2 oz": 45, "1 oz": 75 }, img: "2B9475DB-4BF8-4BC6-B4F4-969B13533D2A.jpeg" },
    { id: 13, name: "Kiwi Starburst", type: "Flower", category: "Flower", price: 25, prices: { "1/8 oz": 25, "1/4 oz": 45, "1/2 oz": 80, "1 oz": 150 }, img: "5E614A26-A345-414E-92B1-40647DA7E597.jpeg" },
    { id: 14, name: "Salad(7)", type: "Mix", category: "Flower", price: 25, prices: { "1/8 oz": 25, "1/4 oz": 45, "1/2 oz": 70, "1 oz": 120 }, img: "bigstock-345402628.jpg" },
    { id: 15, name: "Z Pie Smalls", type: "Flower", category: "Flower", price: 20, prices: { "1/8 oz": 20, "1/4 oz": 30, "1/2 oz": 60, "1 oz": 100 }, img: "6DA04C3D-F4B0-4A9D-B550-18222A40365A.jpeg" },
    {
        id: 18,
        name: "TEG's PrePacked 3.5G Jars",
        type: "Flower",
        category: "Flower",
        price: 60,
        prices: { "8th": 60, "14G": 200 },
        img: "701139FA-2C57-4985-AB8E-6F95B1E08B84.JPG",
        flavors: {
            "Fuzzy Dice": "02_Fuzzy_Dice_-_White-2_300x300.webp",
            "Artic Wall": "569d1472301bf359fcaa9a0aae59ef38.avif",
            "Orange Juice": "1713030909-retail_menu_orangejuice.avif",
            "Toasted Strudel": "1743316349-toasted_strudel.avif"
        }
    },
    {
        id: 19,
        name: "Chron Nerds PrePacked 3.5G DUff Jars",
        type: "Flower",
        category: "Flower",
        price: 35,
        prices: { "1/8 oz": 35, "1/4 oz": 65, "1/2 oz": 110, "1 oz": 210 },
        img: "7A066C65-F95D-4BA0-AE9C-AA132D283A52.jpeg",
        flavors: {
            "Pink Doughnuts": "2C8AF6EC-3B4D-44BC-B50B-3210B1D2026D_4_5005_c.jpeg",
            "OG": "B3072125-1B6A-4012-89C2-551005C6EB46_4_5005_c.jpeg",
            "Cherries": "8E0A9BB9-C725-4CD2-A9D3-835598B4DCB4_4_5005_c.jpeg",
            "Orange Creamsicle": "",
            "Lemon Lime": "DF5DE2D9-1B03-48E3-8B87-25C5742A6CD6_4_5005_c.jpeg",
        }
    },
    {
        id: 20, name: "1g Iced Cart", type: "Cartridge", category: "Vapes", price: 25, prices: { "1 qty": 25, "2 qty": 45, "5 qty": 100 }, img: "1752197166-download.png.jpeg",
        flavors: {
            "Rainbow Beltz-I": "1752197166-download.png.jpeg",
            "Blue Zushi-I": "1752197166-download.png.jpeg",
            "Runtz-I": "1752197166-download.png.jpeg",
            "Lemon Tree-S": "1752197166-download.png.jpeg",
            "Sugar Land-S": "1752197166-download.png.jpeg",
            "NYC Diesel-S": "1752197166-download.png.jpeg",
            "Gelonade-S": "1752197166-download.png.jpeg"
        }
    },
    {
        id: 21, name: "1g 40 Lights Cart", type: "Cartridge", category: "Vapes", price: 25, prices: { "1 qty": 25, "2 qty": 45, "5 qty": 100 }, img: "20230523095045f2fc5501ea744fe1b3aaa1a14c3a21ed.png.webp",
        flavors: {
            "Zebra Stripes(I)": "",
            "Banana Smash(I)": "",
            "Blackberry Fire(I)": "",
            "Monjito(I)": "",
            "Biscotti(I)": "",
            "Georgia Pie(I)": "",
            "Kush Mintz(H)": "",
            "Raspberry Lemonade(H)": "",
            "Cookies & Cream(H)": "",
            "Trainwreck(S)": "",
            "Dole Whip(S)": "",
            "Sour Diesel(S)": ""
        }
    },
    {
        id: 22, name: "1g RedEye Disposable", type: "Disposable", category: "Vapes", price: 30, prices: { "1 qty": 30, "2 qty": 55, "5 qty": 100 }, img: "IMG_9417 2.jpg",
        flavors: {
            "Meow Og (I)": "",
            "Candy Milkshake (H)": "",
            "Runtz (H)": "",
            "Gummies (S)": "",
            "Kiwi Berry Burst (S)": "",
            "Lemonhead (S)": "",
            "Pack Land (S)": ""
        }
    },
    {
        id: 23, name: "1.2 Slugger Disposable", type: "Disposable", category: "Vapes", price: 30, prices: { "1 qty": 30, "2 qty": 55, "5 qty": 100 }, img: "9c3064b5526807851a867c4cf343828e.webp",

    },
    {
        id: 24, name: "2g Choice Labs Disposable", type: "Disposable", category: "Vapes", price: 30, prices: { "1 qty": 30, "2 qty": 55, "5 qty": 100 }, img: "IMG_5214.jpeg",
        flavors: {
            "Grape Jelly (I) x Carmel Apple (I)": "",
            "White Peach Freeze (I) x Toxic Paradise (H)": "",
            "Hibiscus Rush (H) x Airhead Extremes (S)": "",
            "Honey Cream (I) x Wild Cherry (S)": "",
            "Red Blow Pop (H) x KoolAid Jammers (I)": "",
            "Diamond Dust (H) x Sweet Tooth (I)": "",
            "Pink Gushers (H) x Atomic Bomb (S)": "",
            "Butter Fingers (S) x Pizookie (I)": "",
            "Red Starburst (S) x Iced Sangria (I)": "",
            "Lecherita (S) x Blue Jam (H)": ""
        }
    },
    {
        id: 25, name: "2g Boutiq Disposable", type: "Disposable", category: "Vapes", price: 30, prices: { "1 qty": 30, "2 qty": 55, "5 qty": 100 }, img: "boutiq-switch-v5-2g-disposable-PINK-Z-DRAGONFRUIT-TROPICANA.jpg",
        flavors: {
            "Cherry lime": "boutiq-switch-v5-2g-disposable-PINK-Z-DRAGONFRUIT-TROPICANA.jpg",
            "Blue matcha": "boutiq-switch-v5-2g-disposable-PINK-Z-DRAGONFRUIT-TROPICANA.jpg",
            "Purple papaya": "boutiq-switch-v5-2g-disposable-PINK-Z-DRAGONFRUIT-TROPICANA.jpg",
            "Lime haze": "boutiq-switch-v5-2g-disposable-PINK-Z-DRAGONFRUIT-TROPICANA.jpg",
            "Grape soda": "boutiq-switch-v5-2g-disposable-PINK-Z-DRAGONFRUIT-TROPICANA.jpg",
            "Maui wow or": "boutiq-switch-v5-2g-disposable-PINK-Z-DRAGONFRUIT-TROPICANA.jpg",
            "Italian ice": "boutiq-switch-v5-2g-disposable-PINK-Z-DRAGONFRUIT-TROPICANA.jpg",
            "Tangie": "boutiq-switch-v5-2g-disposable-PINK-Z-DRAGONFRUIT-TROPICANA.jpg"
        }
    },
    {
        id: 26, name: "2g Muha meds Disposable", type: "Disposable", category: "Vapes", price: 30, prices: { "1 qty": 30, "2 qty": 55, "5 qty": 100 }, img: "0cd38ef790f0f29429d15425e57a69f9.avif",
        flavors: {
            "Galactic Diesel(I)": "",
            "Sweet Dreamz OG(I)": "",
            "Horchata(I)": "",
            "Tahoe OG(I)": "",
            "Blue Dreamz(H)": "",
            "Blue Shlushie(H)": "",
            "Watermelon Moonshine(H)": "",
            "Bubblegum Burst(S)": "",
            "Habibi(S)": "",
            "Pinapple Express(S)": "",
            "Frozen Pomegranate(S)": "",
        }
    },
    {
        id: 27, name: "2g Omakase Disposable", type: "Disposable", category: "Vapes", price: 35, prices: { "1 qty": 30, "2 qty": 55, "5 qty": 100 }, img: "img_0188-610x610.webp",
        flavors: {
            "Blue zuzhi": "img_0188-610x610.webp",
            "Yuzu beltz": "img_0188-610x610.webp",
            "Matcha tiramisu": "img_0188-610x610.webp",
            "Soju mojito": "img_0188-610x610.webp",
            "Strawberry shortcake": "img_0188-610x610.webp",
            "Nashi nectar": "img_0188-610x610.webp",
            "Lemon cherry blossom": "img_0188-610x610.webp",
            "Fuji apple": "img_0188-610x610.webp",
            "Hokkaido melon": "img_0188-610x610.webp",
            "Sherb money": "img_0188-610x610.webp",
            "White truffle wagyu": "img_0188-610x610.webp",
            "Skittlez": "img_0188-610x610.webp",
            "Peach ramune": "img_0188-610x610.webp",
            "Lychee ice": "img_0188-610x610.webp",
            "Cotton candy souffle": "img_0188-610x610.webp",
            "Grape guava": "img_0188-610x610.webp"
        }
    },
    {
        id: 28, name: "2g Besos Disposable", type: "Disposable", category: "Vapes", price: 35, prices: { "1g": 35, "2g": 60, "4g": 100 }, img: "WhatsApp-Image-2026-02-19-at-23.50.09.jpeg.webp",
        flavors: {
            "Agua de Fresa (S)": "",
            "Cherry Cola (S)": "",
            "Coconut Kiss (H)": "",
            "La Kush Cake (H)": "",
            "Cotton Candy (H)": "",
            "White Runtz (H)": "",
            "Guava Gelato (I)": "",
            "Pan Dulce (I)": "",
            "Filled Churros (I)": "",
            "Tamarindo (I)": ""
        }
    },
    {
        id: 29, name: "2g Turn Disposable", type: "Disposable", category: "Vapes", price: 35, prices: { "1 qty": 35, "2 qty": 60, "4 qty": 100, "5 qty": 110 }, img: "Turn-Good-FKN-Milkshake-2g-AIO-bf5637d9-2a26-4602-a181-cf3a0434b5db.png",

    },
    {
        id: 30, name: "2g Luigi Disposable", type: "Disposable", category: "Vapes", price: 35, prices: { "1 qty": 35, "2 qty": 60, "4 qty": 100, "5 qty": 110 }, img: "Firevine-Fruit-1-scaled-1-scaled.jpg.webp",
        flavors: {
            "Halo mocha-Indica": "Firevine-Fruit-1-scaled-1-scaled.jpg.webp",
            "Chron candy havoc-hy": "Firevine-Fruit-1-scaled-1-scaled.jpg.webp",
            "Oblivion surge-indica": "Firevine-Fruit-1-scaled-1-scaled.jpg.webp",
            "Voltage bloom-s": "Firevine-Fruit-1-scaled-1-scaled.jpg.webp",
            "Electric static haze-s": "Firevine-Fruit-1-scaled-1-scaled.jpg.webp",
            "Sugar skull sour-hy": "Firevine-Fruit-1-scaled-1-scaled.jpg.webp"
        }
    },
    {
        id: 31, name: "2g Revenge Disposable", type: "Disposable", category: "Vapes", price: 35, prices: { "1 qty": 35, "2 qty": 60, "4 qty": 100, "5 qty": 110 }, img: "photo_2025-07-19_18-24-06.webp",
        flavors: {
            "Red viper-I": "photo_2025-07-19_18-24-06.webp",
            "Dark matter-I": "photo_2025-07-19_18-24-06.webp",
            "Ghost walker-I": "photo_2025-07-19_18-24-06.webp",
            "Rainbow needs-Hy": "photo_2025-07-19_18-24-06.webp",
            "Speaker knockerz-Hy": "photo_2025-07-19_18-24-06.webp",
            "Twisted sprite-S": "photo_2025-07-19_18-24-06.webp"
        }
    },
    {
        id: 32, name: "2g Blinker Disposable + Preroll", type: "Disposable", category: "Vapes", price: 35, prices: { "1 qty": 35, "2 qty": 60, "4 qty": 100, "5 qty": 110 }, img: "5956530924546017803.jpg",
         flavors: {
            "Juicy watermelon(H) x Baja burst(I)": "5956530924546017803.jpg",
            "Orange crush(H x Blue Razz(S)": "5956530924546017803.jpg",
            "Island Punch(H) x Peach Ringz/S)": "5956530924546017803.jpg",
            "Hawaiian Runtz(S) x grape ape(I)": "5956530924546017803.jpg",
            "Cherry bomb(s) x cola pop(I)": "5956530924546017803.jpg"
        }
    },
    {
        id: 35, name: "2g Highclass Duo Disposable", type: "Disposable", category: "Vapes", price: 35, prices: { "1 qty": 35, "2 qty": 60, "4 qty": 100, "5 qty": 110 }, img: "WhatsApp-Image-2025-12-09-at-4.08.00-AM.jpeg",
        flavors: {
            "Watermelon Rancher (H) x Zkittlez (I)": "",
            "Strawberry Banana (H) x Jealousy (H)": "",
            "Tropical Furry (S) x Gorilla Glue (H)": "",
            "Guava Passion (S) x King Louie (I)": "",
            "Plush Berry (I) x Sour Diesel (S)": "",
            "Grape Slush (I) x Couch Lock (I)": "",
            "Orange Yuzu (S) x Jack Herer (S)": "",
            "Tigers Blood (I) x White Widow (H)": "",
            "Z-Cube (I) x Gelato33 (H)": "",
            "Mad Blue (I) x Pie Hoe (H)": ""
        }
    },
    {
        id: 36, name: "2g Pluto Disposable", type: "Disposable", category: "Vapes", price: 35, prices: { "1 qty": 35, "2 qty": 60, "4 qty": 100, "5 qty": 110 }, img: "photo_5820980489672657871_y-1-619x800.jpg",
        flavors: {
            "Papaya gas-I": "photo_5820980489672657871_y-1-619x800.jpg",
            "Key lime pie-I": "photo_5820980489672657871_y-1-619x800.jpg",
            "Blueberry muffin-I": "photo_5820980489672657871_y-1-619x800.jpg",
            "Krispy Kreme-I": "photo_5820980489672657871_y-1-619x800.jpg",
            "LA confidential-I": "photo_5820980489672657871_y-1-619x800.jpg",
            "Lunar limeade-I": "photo_5820980489672657871_y-1-619x800.jpg",
            "Bionicos-I": "photo_5820980489672657871_y-1-619x800.jpg",
            "Cereal milk-H": "photo_5820980489672657871_y-1-619x800.jpg",
            "Cotton candy-H": "photo_5820980489672657871_y-1-619x800.jpg",
            "Racks up Runtz-H": "photo_5820980489672657871_y-1-619x800.jpg",
            "Berry gelato-h": "photo_5820980489672657871_y-1-619x800.jpg",
            "Piña colada-H": "photo_5820980489672657871_y-1-619x800.jpg",
            "White widow-H": "photo_5820980489672657871_y-1-619x800.jpg",
            "Mango mojito-h": "photo_5820980489672657871_y-1-619x800.jpg",
            "Sandia-s": "photo_5820980489672657871_y-1-619x800.jpg",
            "6 of act-s": "photo_5820980489672657871_y-1-619x800.jpg",
            "Zatlanta-s": "photo_5820980489672657871_y-1-619x800.jpg"
        }
    },
    {
        id: 37, name: "1g Raw Garden Refined Live Resin Cartridge", type: "Cartridge", category: "Vapes", price: 35, prices: { "1 qty": 35, "2 qty": 60, "4 qty": 100 }, img: "31E7AE14-964B-45DD-899C-301AC849DC93.JPG",
        flavors: {
            "Kosher Chem(I)": "",
            "Sky Doggie(I)": "",
            "Secret Fire(I)": "",
            "Storm Fire(I)": "",
            "GG4(I)": "",
            "Sherbet Haze(S)": "",
            "Sleeroy(S)": "",
            "Slymer(S)": ""
        }
    },
    {
        id: 38, name: "1g Stiiizy Disposable", type: "Disposable", category: "Vapes", price: 35, prices: { "1 qty": 35, "2 qty": 60, "4 qty": 100, "5 qty": 110 }, img: "STIIIZY_-_LRLD_1g_AIO_-_Sativa.webp",

    },
    {
        id: 39, name: "1g Plug N Play Pods", type: "Pods", category: "Vapes", price: 35, prices: { "1 qty": 35, "2 qty": 65, "3 qty": 90 }, img: "PLUGPlay-Pineapple-Express-DNA-Plug-1g-Buzz-Delivery-89f1a723-edb6-4ffc-9252-e9123aa1cf5f.png",
        flavors: {
            "Bubblegum Kush (I)": "",
            "King Louie (I)": "",
            "Fire Og (I)": "",
            "Grape Ape Soda (H)": "",
            "Grease Monkey (H)": "",
            "Banana Mylk (H)": "",
            "Sweet Hearts (H)": "",
            "Limoncello (H)": "",
            "White Runtz (H)": "",
            "Blue Dream (S)": "",
            "Super Lemon Haze (S)": ""
        }
    },
    {
        id: 40, name: "Fade 3 in 1", type: "Disposable", category: "Vapes", price: 35, prices: { "1 qty": 30, "2 qty": 55, "5 qty": 100 }, img: "E0481C03-CB56-4F17-8568-398CB8D306C6.JPG",
        flavors: {
            "Marshmallow Puff (I)": "",
            "Grandaddy Purp (I)": "",
            "Caramel Apple (I)": "",
            "Glazed Donut (I)": "",
            "Grape Juice (I)": "",
            "Jelly Bean Mango (I)": "",
            "Blue Nerdz (I)": "",
            "Honey Buns (I)": "",
            "Dubai Chocolate (I)": "",
            "Orange Popsicle (H)": "",
            "Cookies & Cream (H)": "",
            "Cantaloupe Crush (H)": "",
            "Blackberry Lemonade (H)": "",
            "Cherry Berry (H)": "",
            "Fruit Bedrock (H)": "",
            "Guava Blast (S)": "",
            "Kiwi Strawberry (S)": "",
            "Frosted Sugar Plum (S)": "",
            "Lemon Berry Tart (S)": "",
            "Apple Rings (S)": ""
        }
    },

    {
        id: 41, name: "Hitz", type: "Disposable", category: "Vapes", price: 30, priceRange: "Prices Range From $25-$30", prices: { "1 qty": 30, "2 qty": 55, "5 qty": 100 }, img: "BF5277A0-15F7-4DB7-BF8F-22E74ABB45D8.JPG",
        flavors: {
            "WATERMELON SLICE (I)": "",
            "GUMMY SPLASH (I)": "",
            "HOLY GRAPE (I)": "",
            "MANGO ICE (I)": "",
            "PINK PINEAPPLES (H)": "",
            "FROZEN BLOSSOM (H)": "",
            "MANGONEDA (H)": "",
            "TRIPLE BERRY (S)": "",
            "CITRUS SUNSET (S)": "",
            "AÇAÍ BERRY (S)": ""
        }
    },


    { id: 42, name: "SaberTooth Crumble🍯", type: "Wax", category: "Extras", price: 25, prices: { "4g": 25, "7g": 40, "14g": 60, "1 oz": 100, "4 oz": 300 }, img: "214256F1-57B1-48D2-889F-1BA4162E38A0.jpeg" },
    { id: 43, name: "Luminate Wax Box", type: "Wax", category: "Extras", price: 10, prices: { "1g": 10, "4g": 30, "7g": 50, "14g": 70, "28g": 120 }, img: "74A61D36-79DC-4101-AEAE-72BF80766E2E-1.webp" },
    { id: 44, name: "ABCDE LIVE RESIN🔠", type: "Resin", category: "Extras", price: 25, prices: { "1g": 25 }, img: "1707332691-cherry_punch_sauce.jpeg" },
    { id: 45, name: "Rosin MotorBreath Banana🍌", type: "Rosin", category: "Extras", price: 40, prices: { "1g": 40, "3g": 100, "14g": 450, "28g": 800 }, img: "565742BE-5748-4A08-A126-289F5C407B9E.jpeg" },
    { id: 46, name: "Rosin Nana Garlic🧄", type: "Rosin", category: "Extras", price: 40, prices: { "1g": 40, "3g": 100, "14g": 450, "28g": 800 }, img: "AEE2B241-2D8C-414A-9089-854ADB9B7C4C.JPG" },
    { id: 47, name: "Rosin Cherry Gas🍒", type: "Rosin", category: "Extras", price: 40, prices: { "1g": 40, "3g": 100, "14g": 450, "28g": 800 }, img: "565742BE-5748-4A08-A126-289F5C407B9E.jpeg" },
    { id: 48, name: "Flum UT 50K Puffs", type: "Nicotine", category: "Extras", price: 30, prices: { "1 qty": 30, "2 qty": 50, "5 qty": 100 }, img: "Untitled-design-2025-09-22T105556.679.png" },
    {
        id: 49, name: "Geek Bars💨", type: "Nicotine", category: "Extras", price: 30, prices: { "1 qty": 30, "2 qty": 50, "5 qty": 100 }, img: "IMG_9418 2.jpg",
        flavors: {
            "Blueberry Watermelon": "",
            "Frozen Watermelon": "",
            "Frozen White Grapes": "",
            "Sour Strawberry": "",
            "Grape Blow Pop": "",
            "Juice Peach Ice": ""
        }
    },
    { id: 50, name: "1G Preroll Cone", type: "Prerolls", category: "Extras", price: 10, prices: { "1 qty": 10, "3 qty": 20 }, img: "AB9B0B16-281C-4DBF-95C3-5F88C2DBC0CD.JPG", },
    { id: 51, name: "1G Holy Water Preroll", type: "Prerolls", category: "Extras", price: 25, prices: { "1 qty": 25, "2 qty": 45, "5 qty": 100 }, img: "BLAZE-PRODUCT-IMAGE-TEMPLATE-06de5449-a9a1-479c-9624-ef2180e82e23.png" },
    { id: 52, name: "2G Farm2Lab Infused Blunt", type: "Blunts", category: "Extras", price: 25, prices: { "1 qty": 25, "2 qty": 45, "5 qty": 100 }, img: "Screenshot 2026-04-22 at 20.26.27.png" },
    { id: 53, name: "Slugger 5Pk Blunts", type: "Blunts", category: "Extras", price: 40, prices: { "1 qty": 40, "5 qty": 175 }, img: "1761870034763-798084393-Sluggers Mini Blunt 5pk Jet Fuel OG.jpg" },
    { id: 54, name: "3Stoogies *3 1.5 Flower .5 Rosin*", type: "Hybrid", category: "Extras", price: 35, prices: { "1 Hashole": 35, "Entire 3Pack": 90 }, img: "AC7FBDEC-A4B9-41F3-B26E-AEA64A3D616A.jpeg" },
    { id: 55, name: "Sourz 600Mg Gummies🍬", type: "Edibles", category: "Extras", price: 20, prices: { "1 qty": 20, "3 qty": 50, "5 qty": 75 }, img: "598BA7D1-5E55-4412-88C0-18018B4F45A2.jpeg" },
    { id: 56, name: "VBarz *750MG* 🥣", type: "Edibles", category: "Extras", price: 30, prices: { "1 qty": 30, "2 qty": 50, "5 qty": 100 }, img: "0CDD5D2B-C790-40BE-8A6E-916139ACFCCC.JPG" },
    { id: 57, name: "Yocan Battery 🔋", type: "Battery", category: "Extras", price: 25, prices: { "1 qty": 25, "2 qty": 45, "5 qty": 100 }, img: "YocanKodoPro-Colors.webp" },
    { id: 58, name: "PNP Battery", type: "Battery", category: "Extras", price: 35, prices: { "1 qty": 35, "4 qty": 100 }, img: "pp_blackbatt.webp" },
    {
        id: 59, name: "1g Flavorade Cartridge", type: "Cartridge", category: "Vapes", price: 50, prices: { "1 qty": 50, "2 qty": 90 }, img: "2d910a75cd35cedd29a43712dd50850f.jpg",
        flavors: {
            "Sin mint": "2d910a75cd35cedd29a43712dd50850f.jpg",
            "Dutch cheese": "2d910a75cd35cedd29a43712dd50850f.jpg",
            "Afghan jealousy": "2d910a75cd35cedd29a43712dd50850f.jpg",
            "Dolato": "2d910a75cd35cedd29a43712dd50850f.jpg",
            "Mint macaron": "2d910a75cd35cedd29a43712dd50850f.jpg",
            "Royal Dutch": "2d910a75cd35cedd29a43712dd50850f.jpg",
            "Super silver herer": "2d910a75cd35cedd29a43712dd50850f.jpg",
            "Cheeze of": "2d910a75cd35cedd29a43712dd50850f.jpg"
        }
    },
    {
        id: 60, name: "1g Cold Fire Cartridge", type: "Cartridge", category: "Vapes", price: 50, prices: { "1 qty": 50, "2 qty": 90 }, img: "3f78e31070a2ea1464821e32d8ee96ae.avif",
        flavors: {
            "Pb & Jane": "3f78e31070a2ea1464821e32d8ee96ae.avif",
            "Banana killer": "3f78e31070a2ea1464821e32d8ee96ae.avif",
            "Capital haze runtz": "3f78e31070a2ea1464821e32d8ee96ae.avif",
            "Zapata honey fuel": "3f78e31070a2ea1464821e32d8ee96ae.avif"
        }
    },

];

let PRODUCTS = [];

let cart = JSON.parse(localStorage.getItem('cart') || '[]');


document.addEventListener('DOMContentLoaded', async () => {
    // Elements
    const ageGate = document.getElementById('age-gate');
    const mainContent = document.getElementById('main-content');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');

    const categoryFilters = document.getElementById('category-filters');
    const productsContainer = document.getElementById('products-container');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    // mobileMenu replaced by sidebar

    // Cart Elements
    const cartIconBtn = document.getElementById('cart-icon-btn');
    const cartCount = document.getElementById('cart-count');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');

    // Cart Logic
    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };

    const toggleCart = () => {
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('hidden');
    };

    cartIconBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    // Event delegation for the close button due to Lucide replacing the icon SVG
    cartSidebar.addEventListener('click', (e) => {
        if (e.target.closest('#close-cart') || e.target.closest('.close-cart-icon')) {
            toggleCart();
        }
    });

    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                window.location.href = 'https://instagram.com/Saboresgotsit';
            } else {
                alert('Your bag is empty!');
            }
        });
    }

    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'cart-item';
            cartItemEl.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <span class="cart-item-remove" data-index="${index}">Remove</span>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemEl);
        });

        cartTotalPrice.textContent = `$${total}`;

        if (cart.length > 0) {
            cartCount.textContent = cart.length;
            cartCount.classList.remove('hidden');
        } else {
            cartCount.classList.add('hidden');
        }

        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-item-remove')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            cart.splice(index, 1);
            saveCart();
        }
    });

    renderCart();

    // Age Gate Logic
    btnYes.addEventListener('click', () => {
        ageGate.classList.add('hidden');
        mainContent.classList.remove('hidden');
    });

    btnNo.addEventListener('click', () => {
        alert("You must be 21 or older to enter this site.");
        // Redirect somewhere safe
        window.location.href = "https://google.com";
    });

    // ── Sidebar ──────────────────────────────────────────────────────────────
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarClose = document.getElementById('sidebar-close');

    const openSidebar = () => {
        sidebar.classList.add('open');
        sidebarOverlay.classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
        checkAdminStatus();
    };
    const closeSidebar = () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.add('hidden');
    };

    mobileMenuIcon.addEventListener('click', openSidebar);
    sidebarClose.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Close sidebar when a nav link is clicked
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', closeSidebar);
    });

    // ── Admin Login in Sidebar ────────────────────────────────────────────────
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminLoggedIn = document.getElementById('admin-logged-in');
    const sbLoginError = document.getElementById('sb-login-error');

    const checkAdminStatus = async () => {
        try {
            const res = await fetch('/api/auth-status', { credentials: 'include' });
            const data = await res.json();
            if (data.authenticated) {
                adminLoginForm.classList.add('hidden');
                adminLoggedIn.classList.remove('hidden');
                if (window.lucide) window.lucide.createIcons();
            } else {
                adminLoginForm.classList.remove('hidden');
                adminLoggedIn.classList.add('hidden');
            }
        } catch {
            // Server not running — hide admin section gracefully
        }
    };

    document.getElementById('sb-password').addEventListener('keydown', e => {
        if (e.key === 'Enter') document.getElementById('sb-login-btn').click();
    });

    document.getElementById('sb-login-btn').addEventListener('click', async () => {
        const username = document.getElementById('sb-username').value.trim();
        const password = document.getElementById('sb-password').value;
        sbLoginError.classList.add('hidden');
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            });
            if (res.ok) {
                adminLoginForm.classList.add('hidden');
                adminLoggedIn.classList.remove('hidden');
                if (window.lucide) window.lucide.createIcons();
            } else {
                sbLoginError.classList.remove('hidden');
            }
        } catch {
            sbLoginError.classList.remove('hidden');
        }
    });

    document.getElementById('sb-logout-btn').addEventListener('click', async () => {
        await fetch('/api/logout', { method: 'POST', credentials: 'include' }).catch(() => {});
        adminLoggedIn.classList.add('hidden');
        adminLoginForm.classList.remove('hidden');
        document.getElementById('sb-username').value = '';
        document.getElementById('sb-password').value = '';
    });

    // Render Products
    const renderProducts = (category = 'All') => {
        productsContainer.innerHTML = '';

        const filteredProducts = category === 'All'
            ? PRODUCTS
            : PRODUCTS.filter(p => p.category === category);

        filteredProducts.forEach(product => {
            const badgeClass = product.type === 'Indica' ? 'badge-indica'
                : product.type === 'Sativa' ? 'badge-sativa'
                    : 'badge-hybrid';

            let quantitySelector = '';
            if (product.prices) {
                const options = Object.keys(product.prices).map(qty => {
                    let label = qty;
                    if (qty === '1/8 oz') label = '1/8 of an oz';
                    else if (qty === '1/4 oz') label = '1/4 of an oz';
                    else if (qty === '1/2 oz') label = '1/2 of an oz';
                    else if (qty === '1 oz') label = 'An oz';
                    return `<option value="${qty}">${label}</option>`;
                }).join('');
                quantitySelector = `
                    <div class="product-qty-wrapper">
                        <select class="product-qty-select" data-id="${product.id}">
                            ${options}
                        </select>
                    </div>
                `;
            }

            let flavorSelector = '';
            if (product.flavors) {
                const flavorOptions = Object.keys(product.flavors).map(flavor => {
                    return `<option value="${flavor}">${flavor}</option>`;
                }).join('');
                flavorSelector = `
                    <div class="product-qty-wrapper" style="margin-top: 0.5rem;">
                        <select class="product-flavor-select" data-id="${product.id}">
                            ${flavorOptions}
                        </select>
                    </div>
                `;
            }

            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.img}" alt="${product.name}">
                    <span class="product-badge ${badgeClass}">${product.type}</span>
                </div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-details">
                    <span class="product-price" data-base-price="${product.price}">$${product.price}</span>
                    ${product.priceRange ? `<div class="product-price-range">${product.priceRange}</div>` : ''}
                </div>
                ${quantitySelector}
                ${flavorSelector}
                <button class="btn-add" data-id="${product.id}">Add to Bag</button>
            `;
            productsContainer.appendChild(card);
        });
    };

    productsContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('product-qty-select')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = PRODUCTS.find(p => p.id === productId);
            if (product) {
                const qty = e.target.value;
                let newPrice = product.price;

                if (product.prices && product.prices[qty]) {
                    newPrice = product.prices[qty];
                }

                const card = e.target.closest('.product-card');
                const priceEl = card.querySelector('.product-price');
                priceEl.textContent = `$${newPrice}`;
            }
        }
    });

    productsContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('product-flavor-select')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = PRODUCTS.find(p => p.id === productId);
            if (product && product.flavors) {
                const flavor = e.target.value;
                const newImg = product.flavors[flavor];
                const card = e.target.closest('.product-card');
                const imgEl = card.querySelector('.product-image-container img');
                if (imgEl) {
                    imgEl.src = newImg;
                }
            }
        }
    });

    productsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = PRODUCTS.find(p => p.id === productId);
            if (product) {
                const itemToAdd = { ...product };

                if (product.prices) {
                    const card = e.target.closest('.product-card');
                    const qtySelect = card.querySelector('.product-qty-select');
                    if (qtySelect) {
                        const qty = qtySelect.value;
                        itemToAdd.name = `${itemToAdd.name} (${qtySelect.options[qtySelect.selectedIndex].text})`;

                        if (product.prices && product.prices[qty]) {
                            itemToAdd.price = product.prices[qty];
                        }
                    }
                }

                if (product.flavors) {
                    const card = e.target.closest('.product-card');
                    const flavorSelect = card.querySelector('.product-flavor-select');
                    if (flavorSelect) {
                        const flavor = flavorSelect.value;
                        itemToAdd.name = `${itemToAdd.name} - ${flavor}`;
                        itemToAdd.img = product.flavors[flavor];
                    }
                }

                cart.push(itemToAdd);
                saveCart();
                // Auto open cart when adding
                cartSidebar.classList.add('open');
                cartOverlay.classList.remove('hidden');
            }
        }
    });

    // Filter Logic
    categoryFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const category = e.target.getAttribute('data-category');
            renderProducts(category);
        }
    });

    // ── Load products from API, fall back to hardcoded list ───────────────────
    productsContainer.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:3rem;color:rgba(255,255,255,0.4);font-size:.95rem;letter-spacing:.05em">
            Loading menu…
        </div>`;

    try {
        const res = await fetch('/api/products');
        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                PRODUCTS = data;
            } else {
                PRODUCTS = DEFAULT_PRODUCTS;
            }
        } else {
            PRODUCTS = DEFAULT_PRODUCTS;
        }
    } catch {
        // Server unreachable — use hardcoded fallback
        PRODUCTS = DEFAULT_PRODUCTS;
    }

    renderProducts();

});
