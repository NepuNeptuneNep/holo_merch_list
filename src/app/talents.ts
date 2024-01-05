export class Talent {
    name: string;
    website_string: string;
    special_sets: string[];
  
    constructor(name: string, special_sets: string[], website_string = "") {
      this.name = name;

      if(website_string !== "")  {
        this.website_string = website_string;  
      }
      else 
      {
        this.website_string = name.toLowerCase().replace(/\s+/g, '-');
      }
       this.special_sets = special_sets;
    }
  }

  export const talents: Talent[] = [

    //HOLOLIVE GENERATION 0
    new Talent("Tokino Sora", []),
    new Talent("Roboco", []),
    new Talent("Sakura Miko", []),
    new Talent("Hoshimachi Suisei", []),
    new Talent("AZKi", []),

    //HOLOLIVE 1ST GENERATION
    new Talent("Yozora Mei", []),
    new Talent("Shirakami Fubuki", []),
    new Talent("Natsuiro Matsuri", []),
    new Talent("Akai Haato", []),
    new Talent("Aki Rosenthal", []),
    new Talent("Hitomi Chris", []),

    //HOLOLIVE 2ND GENERATION
    new Talent("Minato Aqua", []),
    new Talent("Murasaki Shion", []),
    new Talent("Nakiri Ayame", []),
    new Talent("Yuzuki Choco", []),
    new Talent("Oozora Subaru", []),

    //HOLOLIVE GAMERS
   // new Talent("Shirakami Fubuki", []), COMMENTED OUT DUE TO BEING IN 1ST GEN
    new Talent("Ookami Mio", []),
    new Talent("Nekomata Okayu", []),
    new Talent("Inugami Korone", []),

    //HOLOLIVE 3RD GENERATION / HOLOLIVE FANTSASY
    new Talent("Usada Pekora", []),
    new Talent("Shiranui Flare", []),
    new Talent("Shirogane Noel", []),
    new Talent("Houshou Marine", []),
    new Talent("Uruha Rushia", []), //HAS SET BUT NO IMAGE

    //HOLOLIVE 4TH GENERATION / HOLOFORCE
    new Talent("Amane Kanata", []),
    new Talent("Tsunomaki Watame", []),
    new Talent("Tokoyami Towa", ["//shop.geekjack.net/products/tokoyami-towa-birthday-commemorative-2021-full-set"]),
    new Talent("Himemori Luna", []),
    new Talent("Kiryu Coco", []),

    //HOLOLIVE 5TH GENERATION / NEPOLABO
    new Talent("Yukihana Lamy", []),
    new Talent("Momosuzu Nene", []),
    new Talent("Shishiro Botan", []),
    new Talent("Omaru Polka", []),
    new Talent("Mano Aloe", []), //nothing, probably?

    //HOLOLIVE 6TH GENERATION / SECRET SOCIETY HOLOX
    new Talent("Laplus Darkness", []),
    new Talent("Takane Lui", []),
    new Talent("Hakui Koyori", []),
    new Talent("Sakamata Chloe", []),
    new Talent("Kazama Iroha", []),



    //HOLOLIVE INDONESIA
    new Talent("Ayunda Risu", []),
    new Talent("Moona Hoshinova", []),
    new Talent("Airani Iofifteen", []),

    //HOLOLIVE INDONESIA 2ND GENERATION
    new Talent("Kureiji Ollie", []),
    new Talent("Anya Melfissa", []),
    new Talent("Pavolia Reine", []),

    //HOLOLIVE INDONESIA 3RD GENERATION
    new Talent("Vestia Zeta", []),
    new Talent("Kaela Kovalskia", []),
    new Talent("Kobo Kanaeru", []),



    //HOLOLIVE ENGLISH -MYTH-
    new Talent("Mori Calliope", []),
    new Talent("Takanashi Kiara", []),
    new Talent("Ninomae Ina'nis", [], "ninomae-inanis"),    //Need to figure out how both image and merch loads
    new Talent("Gawr Gura", []),
    new Talent("Watson Amelia", []),

    //HOLOLIVE ENGLISH -PROMISE- (merged Project: HOPE and Council. Tsukumo Sana is only part of council but still in this list)
    new Talent("IRyS", []),
    new Talent("Ceres Fauna", []),
    new Talent("Ouro Kronii", []),
    new Talent("Nanashi Mumei", []),    
    new Talent("Hakos Baelz", []),
    new Talent("Tsukumo Sana", []),

    //HOLOLIVE ENGLISH -ADVENT-
  //  new Talent("Shiori Novella", []), 
 //   new Talent("Koseki Bijou", []), 
    new Talent("Nerissa Ravencroft", []),
 //   new Talent("Fuwawa Abyssgard", []), 
  //  new Talent("Mococo Abyssgard", []), 

    //HOLOLIVE CHINA 1ST GENERATION
  //  new Talent("Yogiri", []),
   // new Talent("Civia", []),
  //  new Talent("Spada Echo", []),

    //HOLOLIVE CHINA 2ND GENERATION
  //  new Talent("Doris", []),
  //  new Talent("Rosalyn", []),
  //  new Talent("Artia", []),

  
  ];
