export class Talent {
  name: string;
  japName: string;
  website_string: string;
  website_string_alt: string;
  series: string;
  special_sets: string[];
  special_keyword: string[];
  special_indicator: string[];

  constructor(
    name: string,
    japName: string,
    special_sets: string[],
    special_keyword: string[],
    special_indicator: string[],
    series: string,
    website_string = '',
    website_string_alt = ''
  ) {
    this.name = name;
    this.japName = japName;

    if (website_string !== '') {
      this.website_string = website_string;
    } else {
      this.website_string = name.toLowerCase().replace(/\s+/g, '-');
    }

    if (website_string_alt !== '') {
      this.website_string_alt = website_string_alt;
    } else {
      this.website_string_alt = name.toLowerCase().replace(/\s+/g, '-');
    }

    this.series = series;
    this.special_sets = special_sets;
    this.special_keyword = special_keyword;
    this.special_indicator = special_indicator;
  }
}

export const talents: Talent[] = [
  //HOLOLIVE GENERATION 0
  new Talent(
    'Tokino Sora',
    'ときのそら',
    [
      '//shop.geekjack.net/products/tokino-sora-birthday-2021-commemorative-goods-voice-complete-pack',
      '//shop.geekjack.net/products/tokino-sora-1-million-subscribers-celebration-merch-complete-set',
    ],
    ['2021', '100万'],
    ['birthday', 'other'],
    'hololive'
  ),
  new Talent(
    'Roboco',
    'ロボ子さん',
    [
      '//shop.geekjack.net/products/made-to-order-replicative-roboco-san-birthday-2021-commemorative-goods-voice-complete-pack',
      '//shop.geekjack.net/products/roboco-san-3rd-anniversary-commemorative-voice-goods-complete-pack',
    ],
    ['2021', '3rd'],
    ['birthday', 'anniversary'],
    'hololive',
    'roboco-san',
    'robocosan'
  ),
  new Talent(
    'Sakura Miko',
    'さくらみこ',
    [
      '//shop.geekjack.net/products/sakura-miko-3d-new-outfit-celebration-2022-merch-complete-set?_pos=4&_sid=3a7bab6d1&_ss=r',
      '//shop.geekjack.net/products/sakura-miko-weird-quotes-tabletop-calendar-2024-special-merchandise-merch-complete-set',
    ],
    ['3D新衣', '2024年版迷'],
    ['other', 'other'],
    'hololive'
  ),
  new Talent(
    'Hoshimachi Suisei',
    '星街すいせい',
    [
      '//shop.geekjack.net/collections/hoshimachi-suisei/products/hoshimachi-suisei-birthday-third-anniversary-goods-complete-pack',
      '//shop.geekjack.net/collections/hoshimachi-suisei/products/hoshimachi-suisei-4th-anniversary-birthday-celebration-merch-complete-set',
      '//shop.geekjack.net/collections/hoshimachi-suisei/products/hoshimachi-suisei-birthday-5th-anniversary-celebration-merch-complete-set',
    ],
    ['3rd', '4th', '5th'],
    ['anniversary', 'anniversary', 'anniversary'],
    'hololive'
  ),
  new Talent('AZKi', 'AZKi', [], [], [], 'hololive'),

  //HOLOLIVE 1ST GENERATION
  new Talent(
    'Yozora Mel',
    '夜空メル',
    [
      '//shop.geekjack.net/products/yozora-mel-3rd-anniversary-goods-complete-pack',
    ],
    ['3rd'],
    ['anniversary'],
    'hololive'
  ),
  new Talent(
    'Shirakami Fubuki',
    '白上フブキ',
    [
      '//shop.geekjack.net/products/shirakami-fubuki-birthday-2021-full-set-limited-ver',
      '//shop.geekjack.net/products/made-to-order-replicativeshirakami-fubuki-third-anniversary-commemorative-commemorative-goods-complete-pack',
    ],
    ['2021', '3rd'],
    ['birthday', 'anniversary'],
    'hololive'
  ),
  new Talent(
    'Natsuiro Matsuri',
    '夏色まつり',
    [
      '//shop.geekjack.net/products/natsuiro-matsuri-third-anniversary-commemorative-goods-complete-pack',
    ],
    ['3rd'],
    ['anniversary'],
    'hololive'
  ),
  new Talent(
    'Akai Haato',
    '赤井はあと',
    [
      '//shop.geekjack.net/collections/akai-haato/products/akai-haato-birthday-2021-full-set',
      '//shop.geekjack.net/products/akai-haato-4th-anniversary-merch-complete-set',
    ],
    ['2021', '4th'],
    ['birthday', 'anniversary'],
    'hololive'
  ),
  new Talent(
    'Aki Rosenthal',
    'アキ・ローゼンタール',
    [
      '//shop.geekjack.net/products/aki-rosenthal-birthday-2021-handwritten-bonus-mv-set-voice-goods-complete-pack',
      '//shop.geekjack.net/products/aki-rosenthal-third-anniversary-commemorative-goods-complete-pack',
      '//shop.geekjack.net/products/aki-rosenthal-770k-subscribers-celebration-merch-complete-set',
    ],
    ['2021', '3rd', '77万'],
    ['birthday', 'anniversary', 'other'],
    'hololive'
  ),
  //  new Talent('Hitomi Chris', '人見クリス', [], [], 'hololive'),

  //HOLOLIVE 2ND GENERATION
  new Talent(
    'Minato Aqua',
    '湊あくあ',
    [
      '//shop.geekjack.net/products/minato-aqua-birthday-celebration-2021-birthday-merch-complete-set',
      '//shop.geekjack.net/products/made-to-order-replicative-minato-aqua-3rd-anniversary-commemorative-full-set-l-size-limited-ver',
    ],
    ['2021', '3rd'],
    ['birthday', 'anniversary'],
    'hololive'
  ),
  new Talent(
    'Murasaki Shion',
    '紫咲シオン',
    [
      '//shop.geekjack.net/products/murasaki-shion-3rd-anniversary-full-set',
      '//shop.geekjack.net/products/murasaki-shion-1-million-subscribers-celebration-merch-complete-set',
    ],
    ['3rd', '100万'],
    ['anniversary', 'other'],
    'hololive'
  ),
  new Talent(
    'Nakiri Ayame',
    '百鬼あやめ',
    [
      '//shop.geekjack.net/products/nakiri-ayame-3rd-anniversary-full-set',
      '//shop.geekjack.net/products/nakiri-ayame-new-outfit-celebration-2023merch-complete-set',
    ],
    ['3rd', '2023新衣'],
    ['anniversary', 'other'],
    'hololive'
  ),
  new Talent(
    'Yuzuki Choco',
    '癒月ちょこ',
    [
      '//shop.geekjack.net/products/yuzuki-choco-new-accessory-showcase-celebration-2023-merch-complete-set',
    ],
    ['2023新'],
    ['other'],
    'hololive'
  ),
  new Talent(
    'Oozora Subaru',
    '大空スバル',
    [
      '//shop.geekjack.net/products/oozora-subaru-birthday-2021-commemorative-full-set',
      '//shop.geekjack.net/products/oozora-subaru-3rd-anniversaty-full-set-black',
    ],
    ['2021', '3rd'],
    ['birthday', 'anniversary'],
    'hololive'
  ),

  //HOLOLIVE GAMERS
  //  new Talent('Shirakami Fubuki', '白上フブキ', ['//shop.geekjack.net/products/made-to-order-replicativeshirakami-fubuki-third-anniversary-commemorative-commemorative-goods-complete-pack',],['3rd'], ['anniversary'], 'hololive'), COMMENTED OUT DUE TO BEING IN 1ST GEN
  new Talent(
    'Ookami Mio',
    '大神ミオ',
    [
      '//shop.geekjack.net/products/ookami-mio-birthday-commemorative-2021-full-set-l-size',
    ],
    ['2021'],
    ['birthday'],
    'hololive'
  ),
  new Talent(
    'Nekomata Okayu',
    '猫又おかゆ',
    [
      '//shop.geekjack.net/products/nekomata-okayu-birthday-2021-commemorative-goods-set',
      '//shop.geekjack.net/products/nekomata-okayu-birthday-celebration-2023-birthday-merch-complete-set',
      '//shop.geekjack.net/products/nekomata-okayu-2nd-anniversary-goods-complete-pack',
      '//shop.geekjack.net/products/nekomata-okayu-new-costume-commemorative-2021-full-set',
    ],
    ['2021', '2023', '2nd', '2021新衣'],
    ['birthday', 'birthday', 'anniversary', 'other'],
    'hololive'
  ),
  new Talent(
    'Inugami Korone',
    '戌神ころね',
    [
      '//shop.geekjack.net/products/inugami-korone-birthday-2021-full-set',
      '//shop.geekjack.net/products/inugami-korone-2nd-anniversary-goods-complete-pack',
    ],
    ['2021', '2nd'],
    ['birthday', 'anniversary'],
    'hololive'
  ),

  //HOLOLIVE 3RD GENERATION / HOLOLIVE FANTSASY
  new Talent(
    'Usada Pekora',
    '兎田ぺこら',
    [
      '//shop.geekjack.net/products/usada-pekora-2nd-anniversary-commemorative-full-set',
      '//shop.geekjack.net/products/usada-pekora-2-milliion-subscribers-celebration-merch-complete-set',
    ],
    ['2nd', '200万'],
    ['anniversary', 'other'],
    'hololive'
  ),
  new Talent(
    'Shiranui Flare',
    '不知火フレア',
    [
      '//shop.geekjack.net/products/replica-autograph-shiranui-flare-birthday-2021-wonderful-life-voice-goods-complete-pack',
      '//shop.geekjack.net/products/made-to-order-replicative-shiranui-flare-2nd-anniversary-commemorative-full-set',
    ],
    ['2021', '2nd'],
    ['birthday', 'anniversary'],
    'hololive'
  ),
  new Talent(
    'Shirogane Noel',
    '白銀ノエル',
    [
      '//shop.geekjack.net/products/shirogane-noel-birthday-2021-full-set',
      '//shop.geekjack.net/products/made-to-order-replicative-shirogane-noel-2nd-anniversary-commemorative-2021-full-set',
      '//shop.geekjack.net/products/shirogane-noel-new-3d-outfit-celebration-2022-merch-complete-set',
      '//shop.geekjack.net/products/shirogane-noel-1-million-subscribers-commemorative-goods-complete-pack-black',
    ],
    ['2021', '2nd', '2022新衣', '100万'],
    ['birthday', 'anniversary', 'other', 'other'],
    'hololive'
  ),
  new Talent(
    'Houshou Marine',
    '宝鐘マリン',
    [
      '//shop.geekjack.net/products/houshou-marine-birthday-commemorative-2021-full-set',
      '//shop.geekjack.net/products/houshou-marine-2nd-anniversary-commemorative-full-set',
      '//shop.geekjack.net/products/houshou-marine-2-million-subscribers-celebration-merch-complete-set',
    ],
    ['2021', '2nd', '200万'],
    ['birthday', 'anniversary', 'other'],
    'hololive'
  ),
  new Talent(
    'Uruha Rushia',
    '潤羽るしあ',
    [
      '//shop.geekjack.net/products/uruha-rushia-birthday-2021-without-handwritten-message-voice-goods-complete-pack-red',
      '//shop.geekjack.net/products/made-to-order-replicative-uruha-rushia-2nd-anniversary-commemorative-full-set',
    ],
    ['2021', '2nd'],
    ['birthday', 'anniversary'],
    'hololive'
  ),

  //HOLOLIVE 4TH GENERATION / HOLOFORCE
  new Talent(
    'Amane Kanata',
    '天音かなた',
    [
      '//shop.geekjack.net/products/made-to-order-replicative-amane-kanata-birthday-2021-commemorative-goods-voice-complete-pack',
      '//shop.geekjack.net/products/amane-kanade-3rd-anniversary-celebration-merch-complete-set',
      '//shop.geekjack.net/products/amane-kanata-upaos-mascot-debut-celebration-merch-complete-set',
    ],
    ['2021', '3rd', 'うぱお'],
    ['birthday', 'anniversary', 'other'],
    'hololive'
  ),
  new Talent(
    'Tsunomaki Watame',
    '角巻わため',
    [
      '//shop.geekjack.net/products/tsunomaki-watame-birthday-2021-commemorative-goods-voice-complete-pack',
      '//shop.geekjack.net/products/tsunomaki-watame-1-million-subscribers-celebration-watame-in-pajamas-plushie',
      '//shop.geekjack.net/products/tsunomaki-watame-jingisudan-troops-matching-merchandise-complete-set',
    ],
    ['2021', '100万', 'ジンギス'],
    ['birthday', 'other', 'other'],
    'hololive'
  ),
  new Talent(
    'Tokoyami Towa',
    '常闇トワ',
    [
      '//shop.geekjack.net/products/tokoyami-towa-birthday-commemorative-2021-full-set',
      '//shop.geekjack.net/products/tokoyami-towa-1st-anniversary-complete-pack-of-commemorative-goods-voice',
      '//shop.geekjack.net/products/tokoyami-towa-1-million-subscribers-celebration-merch-complete-set',
    ],
    ['2021', '1st', '100万'],
    ['birthday', 'anniversary', 'other'],
    'hololive'
  ),
  new Talent(
    'Himemori Luna',
    '姫森ルーナ',
    [
      '//shop.geekjack.net/products/himemori-luna-birthday-2021-full-set',
      '//shop.geekjack.net/products/himemori-luna-new-costume-commemorative-2021-commemorative-goods-voice-complete-pack',
      '//shop.geekjack.net/products/himemori-luna-new-outfit-celebration-2022-merch-complete-set',
      '//shop.geekjack.net/products/himemori-luna-new-outfit-celebration-2023-merch-complete-set',
    ],
    ['2021', '2021新衣', '2022新衣', '2023新衣'],
    ['birthday', 'other', 'other', 'other'],
    'hololive'
  ),
  //  new Talent('Kiryu Coco', '桐生ココ', [], [], 'hololive'),

  //HOLOLIVE 5TH GENERATION / NEPOLABO
  new Talent(
    'Yukihana Lamy',
    '雪花ラミィ',
    [
      '//shop.geekjack.net/products/yukihana-lamy-birthday-commemoration-2021-full-set',
      '//shop.geekjack.net/products/made-to-order-replicative-yukihana-lamy-1st-anniversary-commemorative-full-set',
      '//shop.geekjack.net/products/yukihana-lamy-x-yukiyozuki-collaboration-merch-set',
    ],
    ['2021', '1st', '雪夜月'],
    ['birthday', 'anniversary', 'other'],
    'hololive'
  ),
  new Talent(
    'Momosuzu Nene',
    '桃鈴ねね',
    [
      '//shop.geekjack.net/products/momosuzu-nene-birthday-celebration-2023-birthday-merch-complete-set',
      '//shop.geekjack.net/products/momosuzu-nene-1st-anniversary-full-set',
      '//shop.geekjack.net/products/momosuzu-nene-800k-subscribers-celebration-merch-complete-set',
      '//shop.geekjack.net/products/momosuzu-nene-3d-concert-celebration-merch-complete-set',
      '//shop.geekjack.net/products/nenene-no-ne-1st-ep-release-event-celebration-merch-complete-set',
    ],
    ['2023', '1st', '80万', '3Dライブ', 'リリース'],
    ['birthday', 'anniversary', 'other', 'other', 'other'],
    'hololive'
  ),
  new Talent(
    'Shishiro Botan',
    '獅白ぼたん',
    [
      '//shop.geekjack.net/products/shishiri-botan-birthday-commorative-goods-2021-full-set',
      '//shop.geekjack.net/products/shishiro-botan-1st-anniversary-full-set',
      '//shop.geekjack.net/products/shishiro-botan-800-000-subscribers-commemorative-goods-complete-pack',
      '//shop.geekjack.net/products/shishiro-botan-1-million-subscribers-celebration-merch-complete-set',
    ],
    ['2021', '1st', '80万', '100万'],
    ['birthday', 'anniversary', 'other', 'other'],
    'hololive'
  ),
  new Talent(
    'Omaru Polka',
    '尾丸ポルカ',
    [
      '//shop.geekjack.net/products/20210130-20210308-omaru-polka-birthday-2021-handwritten-autograph-voice-goods-complete-pack',
      '//shop.geekjack.net/products/omaru-polka-1st-anniversary-full-set',
    ],
    ['2021', '1st'],
    ['birthday', 'anniversary'],
    'hololive'
  ),
  //  new Talent('Mano Aloe', '魔乃アロエ', [], [], 'hololive'),

  //HOLOLIVE 6TH GENERATION / SECRET SOCIETY HOLOX
  new Talent(
    'Laplus Darknesss',
    'ラプラス・ダークネス',
    [
      '//shop.geekjack.net/collections/laplus-darknesss/products/la-darknesss-new-outfit-celebration-2024-merch-complete-set',
    ],
    ['2024新衣'],
    ['other'],
    'hololive',
    '',
    'la-darknesss'
  ),
  new Talent(
    'Takane Lui',
    '鷹嶺ルイ',
    [
      '//shop.geekjack.net/products/takane-lui-luis-party-celebration-merch-complete-set',
    ],
    ["Lui's Party"],
    ['other'],
    'hololive'
  ),
  new Talent(
    'Hakui Koyori',
    '博衣こより',
    [
      '//shop.geekjack.net/products/hakui-koyori-birthday-celebration-2023-birthday-merch-complete-set',
      '//shop.geekjack.net/products/hakui-koyori-hakui-day-celebration-2022-merch-complete-set',
      '//shop.geekjack.net/products/konkoyo-24-celebration-2024-merch-complete-set',
    ],
    ['2023', '博衣の日記念', 'こんこよ24'],
    ['birthday', 'other', 'other'],
    'hololive'
  ),
  new Talent(
    'Sakamata Chloe',
    '沙花叉クロヱ',
    [
      '//shop.geekjack.net/products/sakamata-chloe-1-million-subscribers-celebration-merch-complete-set',
    ],
    ['100万'],
    ['other'],
    'hololive'
  ),
  new Talent(
    'Kazama Iroha',
    '風真いろは',
    [
      '//shop.geekjack.net/products/kazama-iroha-new-outfit-celebration-2023-merch-complete-set',
    ],
    ['2023新衣'],
    ['other'],
    'hololive'
  ),

  //HOLOLIVE INDONESIA
  new Talent(
    'Ayunda Risu',
    'アユンダ・リス',
    [
      '//shop.geekjack.net/products/ayunda-risu-birthday-celebration-2023-merch-set',
      '//shop.geekjack.net/products/ayunda-risu-3rd-anniversary-celebration-merch-set',
    ],
    ['2023', '3rd'],
    ['birthday', 'anniversary'],
    'hololive'
  ),
  new Talent(
    'Moona Hoshinova',
    'ムーナ・ホシノヴァ',
    [
      '//shop.geekjack.net/products/moona-hoshinova-birthday-celebration-2022-special-full-set',
      '//shop.geekjack.net/products/moona-hoshinova-birthday-celebration-2023-birthday-merch-set',
      '//shop.geekjack.net/products/moona-hoshinova-3rd-anniversary-celebration-merch-set',
      '//shop.geekjack.net/products/moona-hoshinova-1-23m-subscriber-celebration-merch-complete-set',
    ],
    ['2022', '2023', '3rd', '123万'],
    ['birthday', 'birthday', 'anniversary', 'other'],
    'hololive'
  ),
  new Talent(
    'Airani Iofifteen',
    'アイラニ・イオフィフティーン',
    [
      '//shop.geekjack.net/products/airani-iofifteen-birthday-2021-commemorative-goods-voice-complete-pack',
      '//shop.geekjack.net/products/airani-iofifteen-birthday-celebration-2022-merch-set',
      '//shop.geekjack.net/products/airani-iofifteen-birthday-celebration-2023-birthday-merch-set',
    ],
    ['2021', '2022', '2023'],
    ['birthday', 'birthday', 'birthday'],
    'hololive'
  ),

  //HOLOLIVE INDONESIA 2ND GENERATION
  new Talent(
    'Kureiji Ollie',
    'クレイジー・オリー',
    [
      '//shop.geekjack.net/products/kureiji-ollie-birthday-2021-birthday-special-full-set',
      '//shop.geekjack.net/products/kureiji-ollie-birthday-celebration-2022-birthday-merch-set',
      '//shop.geekjack.net/products/kureiji-ollie-birthday-celebration-2023-birthday-merch-set',
      '//shop.geekjack.net/products/kureiji-ollie-2nd-anniversary-celebration-merch-set',
    ],
    ['2021', '2022', '2023', '2nd'],
    ['birthday', 'birthday', 'birthday', 'anniversary'],
    'hololive'
  ),
  new Talent(
    'Anya Melfissa',
    'アーニャ・メルフィッサ',
    [
      '//shop.geekjack.net/products/anya-melfissa-birthday-celebration-2022-merch-set',
      '//shop.geekjack.net/products/anya-melfissa-birthday-celebration-2023-birthday-merch-set',
      '//shop.geekjack.net/products/anya-melfissa-2nd-anniversary-celebration-merch-set',
    ],
    ['2022', '2023', '2nd'],
    ['birthday', 'birthday', 'anniversary'],
    'hololive'
  ),
  new Talent(
    'Pavolia Reine',
    'パヴォリア・レイネ',
    [
      '//shop.geekjack.net/products/pavolia-reine-birthday-2021-full-set',
      '//shop.geekjack.net/products/pavolia-reine-birthday-celebration-2022-merch-set',
      '//shop.geekjack.net/products/pavolia-reine-birthday-celebration-2023-birthday-merch-set',
      '//shop.geekjack.net/products/pavolia-reine-2nd-anniversary-celebration-merch-set',
    ],
    ['2021', '2022', '2023', '2nd'],
    ['birthday', 'birthday', 'birthday', 'anniversary'],
    'hololive'
  ),

  //HOLOLIVE INDONESIA 3RD GENERATION
  new Talent(
    'Vestia Zeta',
    'ベスティア・ゼータ',
    [
      '//shop.geekjack.net/products/vestia-zeta-birthday-celebration-2022-birthday-merch-set',
      '//shop.geekjack.net/products/vestia-zeta-birthday-celebration-2023-merch-set',
    ],
    ['2022', '2023'],
    ['birthday', 'birthday'],
    'hololive'
  ),
  new Talent(
    'Kaela Kovalskia',
    'カエラ・コヴァルスキア',
    [
      '//shop.geekjack.net/products/kaela-kovalskia-birthday-celebration-2022-birthday-merch-set',
      '//shop.geekjack.net/products/kaela-kovalskia-birthday-celebration-2023-birthday-merch-set',
      '//shop.geekjack.net/products/kaela-kovalskia-pemaloe-day-celebration-2023-merch-complete-set',
    ],
    ['2022', '2023', 'PEMALOE'],
    ['birthday', 'birthday', 'other'],
    'hololive'
  ),
  new Talent(
    'Kobo Kanaeru',
    'こぼ・かなえる',
    [
      '//shop.geekjack.net/products/kobo-kanaeru-birthday-celebration-2022-birthday-merch-set',
      '//shop.geekjack.net/products/kobo-kanaeru-birthday-celebration-2023-merch-set',
    ],
    ['2022', '2023'],
    ['birthday', 'birthday'],
    'hololive'
  ),

  //HOLOLIVE ENGLISH -MYTH-
  new Talent(
    'Mori Calliope',
    '森 カリオペ',
    [
      '//shop.geekjack.net/products/mori-calliope-birthday-2021-mori-calliope-premium-birthday-goods-set-2021',
      '//shop.geekjack.net/products/mori-calliope-birthday-celebration-2023-birthday-merch-complete-set',
    ],
    ['2021', '2023'],
    ['birthday', 'birthday'],
    'hololive'
  ),
  new Talent(
    'Takanashi Kiara',
    '小鳥遊キアラ',
    [
      '//shop.geekjack.net/products/takanashi-kiara-birthday-2021-full-set',
      '//shop.geekjack.net/products/takanashi-kiaras-holotalk-2nd-anniversary-celebration-merch-complete-set',
    ],
    ['2021', '2nd'],
    ['birthday', 'anniversary'],
    'hololive'
  ),
  new Talent(
    "Ninomae Ina'nis",
    '一伊那尓栖',
    [],
    [],
    [],
    'hololive',
    'ninomae-inanis'
  ),
  new Talent(
    'Gawr Gura',
    'がうる・ぐら',
    [
      '//shop.geekjack.net/products/gawr-gura-birthday-2021-commemorative-goods-voice-complete-pack-size-l',
    ],
    ['2021'],
    ['birthday'],
    'hololive'
  ),
  new Talent(
    'Watson Amelia',
    'ワトソン・アメリア',
    [
      '//shop.geekjack.net/collections/watson-amelia/products/amelia-watson-birthday-2021-commemorative-voice-goods-complete-pack',
      '//shop.geekjack.net/products/watson-amelia-birthday-celebration-2023-merch-complete-set-1',
    ],
    ['2021', '2023'],
    ['birthday', 'birthday'],
    'hololive'
  ),

  //HOLOLIVE ENGLISH -PROMISE- (merged Project: HOPE and Council. Tsukumo Sana is only part of council but still in this list)
  new Talent(
    'IRyS',
    'アイリス',
    [
      '//shop.geekjack.net/products/irys-birthday-celebration-2023-birthday-merch-complete-set',
    ],
    ['2023'],
    ['birthday'],
    'hololive'
  ),
  new Talent(
    'Ceres Fauna',
    'セレス・ファウナ',
    [
      '//shop.geekjack.net/products/ceres-fauna-birthday-celebration-2023-birthday-merch-complete-set',
    ],
    ['2023'],
    ['birthday'],
    'hololive'
  ),
  new Talent(
    'Ouro Kronii',
    'オーロ・クロニー',
    [
      '//shop.geekjack.net/products/ouro-kronii-birthday-celebration-2023-birthday-merch-complete-set',
    ],
    ['2023'],
    ['birthday'],
    'hololive'
  ),
  new Talent(
    'Nanashi Mumei',
    '七詩ムメイ',
    [
      '//shop.geekjack.net/products/nanashi-mumei-cozy-winter-merch-2024-merch-complete-set',
      '//shop.geekjack.net/products/nanashi-mumei-774k-subscribers-celebration-merch-complete-set',
    ],
    ['冬グ', '77.4万'],
    ['other', 'other'],
    'hololive'
  ),
  new Talent(
    'Hakos Baelz',
    'ハコス・ベールズ',
    [
      '//shop.geekjack.net/products/hakos-baelz-birthday-celebration-2023-birthday-merch-complete-set',
      '//shop.geekjack.net/products/hakos-baelz-1st-ep-pandaemonium-release-celebration-merch-complete-set',
    ],
    ['2023', 'Pandæmonium'],
    ['birthday', 'other'],
    'hololive'
  ),
  new Talent('Tsukumo Sana', '九十九 佐命', [], [], [], 'hololive'),

  //HOLOLIVE ENGLISH -ADVENT-
  //  new Talent('Shiori Novella', 'シオリ・ノヴェラ', [], [], 'hololive'),
  //  new Talent('Koseki Bijou', '古石ビジュ―', [], [], 'hololive'),
  new Talent(
    'Nerissa Ravencroft',
    'ネリッサ・レイヴンクロフト',
    [],
    [],
    [],
    'hololive'
  ),
  //  new Talent('Fuwawa Abyssgard', 'フワワ・アビスガード', [], [], 'hololive'),
  //  new Talent('Mococo Abyssgard', 'モココ・アビスガード', [], [], 'hololive'),

  //HOLOLIVE ReGLOSS
  //  new Talent('Hiodoshi Ao', '火威青', [], [], 'hololive'),
  //  new Talent('Otonose Kanade', '音乃瀬奏', [], [], 'hololive'),
  //  new Talent('Ichijou Ririka', '一条莉々華', [], [], 'hololive'),
  //  new Talent('Juufuutei Raden', '儒烏風亭らでん', [], [], 'hololive'),
  //  new Talent('Todoroki Hajime', '轟はじめ', [], [], 'hololive'),

  //HOLOLIVE CHINA 1ST GENERATION
  //  new Talent('Yogiri', '夜霧', [], [], 'hololive'),
  //  new Talent('Civia', '希薇娅', [], [], 'hololive'),
  //  new Talent('Spada Echo', '黑桃影', [], [], 'hololive'),

  //HOLOLIVE CHINA 2ND GENERATION
  //  new Talent('Doris', '朵莉丝', [], [], 'hololive'),
  //  new Talent('Rosalyn', '罗莎琳', [], [], 'hololive'),
  //  new Talent('Artia', '阿媂娅', [], [], 'hololive'),

  //HOLOSTARS 1ST GENERATION
  new Talent(
    'Hanasaki Miyabi',
    '花咲みやび',
    [
      '//shop.geekjack.net/products/hanasaki-miyabi-birthday-2021-commemorative-voice-goods-complete-pack',
      '//shop.geekjack.net/products/hanasaki-miyabi-birthday-celebration-2023-birthday-merch-complete-set',
      '//shop.geekjack.net/products/hanasaki-miyabi-2nd-anniversary-commemorative-voice-goods-set',
    ],
    ['2021', '2023', '2nd'],
    ['birthday', 'birthday', 'anniverary'],
    'holostars'
  ),
  new Talent(
    'Kanade Izuru',
    '奏手イヅル',
    [
      '//shop.geekjack.net/products/kanade-izuru-birthday-commemorative-2021-full-set',
    ],
    ['2021'],
    ['birthday'],
    'holostars'
  ),
  new Talent(
    'Arurandeisu',
    'アルランディス',
    [
      '//shop.geekjack.net/products/arurandeisu-birthday-commemoration-full-set',
      '//shop.geekjack.net/products/arurandeisu-2nd-anniversary-full-set',
      '//shop.geekjack.net/products/arurandeisu-new-outfit-celebration-2022-merch-complete-set',
    ],
    ['2021', '2nd', '2022新衣'],
    ['birthday', 'anniversary', 'other'],
    'holostars'
  ),
  new Talent(
    'Rikka',
    '律可',
    [
      '//shop.geekjack.net/products/made-to-order-replicative-rikka-birthday-2021-complete-pack',
      '//shop.geekjack.net/products/rikka-2nd-anniversary-full-set',
    ],
    ['2021', '2nd'],
    ['birthday', 'anniversary'],
    'holostars'
  ),
  //  new Talent('Kagami Kira', '鏡見キラ', [], [], 'holostars'),
  //  new Talent('Yakushiji Suzaku', '薬師寺朱雀', [], [], 'holostars'),

  //HOLOSTARS 2ND GENERATION
  new Talent(
    'Astel Leda',
    'アステル・レダ',
    [
      '//shop.geekjack.net/products/astel-leda-birthday-2021-commemorative-goods-voice-complete-pack',
      '//shop.geekjack.net/products/astel-leda-3d-reveal-2nd-anniversary-celebration-one-two-shine-merch-complete-set',
    ],
    ['2021', '2nd'],
    ['birthday', 'anniversary'],
    'holostars'
  ),
  new Talent(
    'Kishido Temma',
    '岸堂天真',
    [
      '//shop.geekjack.net/products/kishido-temma-birthday-2021-commemorative-goods-voice-complete-pack',
    ],
    ['2021'],
    ['birthday'],
    'holostars'
  ),
  new Talent(
    'Yukoku Roberu',
    '夕刻ロベル',
    [
      '//shop.geekjack.net/products/yukoku-roberu-birthday-commemorative-2021-full-set',
      '//shop.geekjack.net/products/20220926-20221031yukoku-roberu-birthday-celebration-2022-merch-complete-set',
      '//shop.geekjack.net/products/yukoku-roberu-tribute-to-all-thumbnails-for-the-last-three-years-celebration-merch-complete-set',
      '//shop.geekjack.net/products/yukoku-roberu-300k-subscribers-celebration-merch-complete-set',
    ],
    ['2021', '2022', '3年間', '30万'],
    ['birthday', 'birthday', 'other', 'other'],
    'holostars'
  ),

  //HOLOSTARS 3RD GENERATION
  new Talent(
    'Kageyama Shien',
    '影山シエン',
    [
      '//shop.geekjack.net/products/kageyama-shien-birthday-celebration-2023-birthday-merch-complete-set',
    ],
    ['2023'],
    ['birthday'],
    'holostars'
  ),
  new Talent('Aragami Oga', '荒咬オウガ', [], [], [], 'holostars'),
  //  new Talent('Tsukishita Kaoru', '月下カオル', [], [], 'holostars'),

  //HOLOSTARS UPROAR!!
  new Talent('Yatogami Fuma', '夜十神封魔', [], [], [], 'holostars'),
  new Talent('Utsugi Uyu', '羽継烏有', [], [], [], 'holostars'),
  new Talent('Hizaki Gamma', '緋崎ガンマ', [], [], [], 'holostars'),
  //  new Talent('Minase Rio', '水無世燐央', [], [], 'holostars'),

  //HOLOSTARS ENGLISH -TEMPUS-
  new Talent('Regis Altare', '', [], [], [], 'holostars'),
  new Talent('Axel Syrios', 'アクセル・シリオス', [], [], [], 'holostars'),
  new Talent(
    'Magni Dezmond',
    'マグニ・デズモンド',
    [
      '//shop.geekjack.net/products/magni-dezmond-copium-release-celebration-merch-complete-set',
    ],
    ['Copium'],
    ['other'],
    'holostars'
  ),
  new Talent('Noir Vesper', 'ノワール・ヴェスパー', [], [], [], 'holostars'),
  new Talent('Gavis Bettel', '', [], [], [], 'holostars'),
  new Talent(
    'Machina X Flayon',
    '',
    [
      '//shop.geekjack.net/products/machina-x-flayon-machiroon-appreciation-day-merchandise-2024-merch-complete-set',
    ],
    ['マキルーン感謝デー'],
    ['other'],
    'holostars'
  ),
  new Talent('Banzoin Hakka', '', [], [], [], 'holostars'),
  new Talent('Josuiji Shinri', '', [], [], [], 'holostars'),

  //HOLOSTARS ENGLISH -ARMIS-
  //  new Talent('Jurard T Rexford', '', [], [], 'holostars'),
  //  new Talent('Goldbullet', '', [], [], 'holostars'),
  //  new Talent('Octavio', '', [], [], 'holostars'),
  //  new Talent('Crimzon Ruze', '', [], [], 'holostars'),
];
