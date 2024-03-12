export const LangDropDown = [
  {
    id: 1,
    value: 'en',
    label: 'English',
  },
  {
    id: 2,
    value: 'ar',
    label: 'عربی',
  },
  {
    id: 3,
    value: 'ur',
    label: 'اردو',
  },
];

export const themes = [
  { value: 'default', label: 'default' },
  { value: 'dark', label: 'dark' },
];

export const bookingStatuses = [
  {
    id: 1,
    value: 'newBooking',
    localizedValue: 'نئی بکنک',
  },
  {
    id: 2,
    value: 'canceled',
    localizedValue: 'کینسلڈ',
  },
  {
    id: 3,
    value: 'confirmed',
    localizedValue: 'تصدیق شدہ',
  },{
    id: 4,
    value: 'completed',
    localizedValue: 'مکمل',
  },
];

export const vehicleTypes = [
  {
    id: 1,
    value: 'Camry(4 Seater)',
    localizedValue: 'کیمرے',
  },
  {
    id: 2,
    value: 'H1 (7 Seater)',
    localizedValue: 'ایچ ون',
  },
  {
    id: 3,
    value: 'GMC(7 Seater)',
    localizedValue: 'جی ایم سی',

  },
  {
    id: 4,
    value: 'Staria(7 Seater)',
    localizedValue: 'سٹاریا',
  },
  {
    id: 5,
    value: 'Hiace(12 Seater)',
    localizedValue: 'ہائی ایس',
  },
  {
    id: 6,
    value: 'Coaster(18 Seater)',
    localizedValue: 'کوسٹر',
  },
  {
    id: 7,
    value: 'Luxury Bus(49 Seater)',
    localizedValue: 'لکثری بس',
  },
  {
    id: 7,
    value: 'Vehicle on demand',
    localizedValue: 'وہیکل آن ڈیمانڈ',
  },
];

export const startDestination = [
  {
    id: 1,
    value: 'Jeddah airport to Makkah Hotel',
    localizedValue: 'جدہ ایئر پورٹ سے مکہ ہوٹل',
  },
  {
    id: 2,
    value: 'Jeddah airport to Madina Hotel',
    localizedValue: 'جدہ ایئر پورٹ سے مدینہ ہوٹل',
  },
  {
    id: 3,
    value: 'Jeddah airport to Jeddah Hotel',
    localizedValue: 'جدہ ایئر پورٹ سے جدہ ہوٹل',

  },
  {
    id: 4,
    value: 'Makkah Hotel to Madinah Hotel',
    localizedValue: 'مکہ ہوٹل سے مدینہ ہوٹل',
  },
  {
    id: 5,
    value: 'Makkah Hotel to Jeddah airport',
    localizedValue: 'مکہ ہوٹل سے جدہ ایئر پورٹ',
  },
  {
    id: 6,
    value: 'Makkah Hotel to Jeddah Hotel',
    localizedValue: 'مکہ ہوٹل سے جدہ ہوٹل',
  },
  {
    id: 7,
    value: 'Makkah Ziyarats',
    localizedValue: 'مکہ زیارات',
  },
  {
    id: 8,
    value: 'Madina Hotel to Madina Airport',
    localizedValue: 'مدینہ ہوٹل سے مدینہ ایئر پورٹ',
  },
  {
    id: 9,
    value: 'Madina Hotel to Makkah Hotel',
    localizedValue: 'مدینہ ہوٹل سے مکہ ہوٹل',
  },
  {
    id: 10,
    value: 'Madina Hotel to Jeddah Airport',
    localizedValue: 'مدینہ ہوٹل سے جدہ ایئر پورٹ',
  },
  {
    id: 11,
    value: 'Madinah zyarat',
    localizedValue: 'مدینہ زیارات',
  },
  {
    id: 12,
    value: 'Madinah to khyber zyarat ',
    localizedValue: 'مدینہ سے خیبر زیارات',
  },
  {
    id: 13,
    value: 'Madinah to Alulaa ',
    localizedValue: 'مدینہ سے الولا',
  },
  {
    id: 15,
    value: 'Madina zyarat & wadiye jin',
    localizedValue: 'مدینہ زیارت اور وادی جن',
  },
  {
    id: 16,
    value: 'Jeddah to taif & return',
    localizedValue: 'جدہ سے طائف اور واپسی',
  },
  {
    id: 17,
    value: 'Makkah to taif & return',
    localizedValue: 'مکہ سے طائف اور واپسی',
  },
  {
    id: 18,
    value: 'Madina to badr & return',
    localizedValue: 'مدینہ سے بدر اور واپسی',
  },
  {
    id: 19,
    value: 'Madina to khyber & return',
    localizedValue: 'مدینہ سے خیبر اور واپسی',
  },
  {
    id: 20,
    value: 'Alula full day',
    localizedValue: 'الولا پورا دن',
  },
  {
    id: 21,
    value: 'Per hour rate for shopping, zyarat, visit etc.',
    localizedValue: 'شاپنگ زیارت کے لیے فی گھنٹہ کے حساب سے',
  },
  {
    id: 22,
    value: 'Other rout',
    localizedValue: 'دیگر روٹس',
  },
];
export const timeLists = Array.from({ length: 48 }, (_, index) => {
  const hours = Math.floor(index / 2);
  const minutes = index % 2 === 0 ? '00' : '30';

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes} ${hours >= 12 ? 'pm' : 'am'}`;

  return {
    id: index + 1,
    value: formattedTime,
  };
});


export const manufacturers = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Citroen",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "GMC",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Maserati",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "MINI",
  "Mitsubishi",
  "Nissan",
  "Porsche",
  "Ram",
  "Rolls-Royce",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

export const yearsOfProduction = [
  { title: "Year", value: "" },
  { title: "2015", value: "2015" },
  { title: "2016", value: "2016" },
  { title: "2017", value: "2017" },
  { title: "2018", value: "2018" },
  { title: "2019", value: "2019" },
  { title: "2020", value: "2020" },
  { title: "2021", value: "2021" },
  { title: "2022", value: "2022" },
  { title: "2023", value: "2023" },
];

export const fuels = [
  {
    title: "Fuel",
    value: "",
  },
  {
    title: "Gas",
    value: "Gas",
  },
  {
    title: "Electricity",
    value: "Electricity",
  },
];

export const footerLinks = [
  {
    title: "About",
    urTitle:"ہمارے بارے",
    arTitle:"متعلق",
    links: [
      { title: "How it works", urTitle:"کیسے کام کرتا ہے", arTitle:"کیسے کام کرتا ہے", url: "/" },
      { title: "Featured", urTitle:"فیچرڈ", arTitle:"فیچرڈ", url: "/" },
      { title: "Partnership", urTitle:"سانجھا کام", arTitle:"پارٹرنرشپ", url: "/" },
      { title: "Bussiness Relation", urTitle:"کاروباری", arTitle:"تعلقات", url: "/" },
    ],
  },
  {
    title: "Company",
    urTitle:"کمپنی",
    arTitle:"کمپنی",
    links: [
      { title: "Events", urTitle:"تہوار", arTitle:"ایونٹس", url: "/" },
      { title: "Blog", urTitle:"بلاگ", arTitle:"بلاگز", url: "/" },
      { title: "Podcast", urTitle:"پوڈکاسٹ", arTitle:"پاڈکاسٹس", url: "/" },
      { title: "Invite a friend", urTitle:"دوستوں کو مدعو کریں", arTitle:"انوائٹ کریں", url: "/" },
    ],
  },
  {
    title: "Socials",
    urTitle:"سوشل",
    arTitle:"سوشل",
    links: [
      { title: "Discord", urTitle:"ختم کریں", arTitle:"ڈسکارڈ", url: "/" },
      { title: "Instagram", urTitle:"انسٹاگرام", arTitle:"انستاگرام", url: "/" },
      { title: "Twitter", urTitle:"ٹوٹر", arTitle:"توتر", url: "/" },
      { title: "Facebook", urTitle:"فیس بک", arTitle:"فیس بکس", url: "/" },
    ],
  },
];

export const allCars = [
  {
    city_mpg: 16,
    class: 'ford',
    combination_mpg: 19,
    cylinders: 6,
    displacement: 2.8,
    drive: 'fwd',
    fuel_type: 'gas',
    highway_mpg: 26,
    make: 'ford',
    urMake: 'فورڈ',
    arMake: 'فورڈ',
    model: 'a4',
    transmission: 'a',
    year: 1996,
    pic:'/Ford.webp'
  },
  {
    city_mpg: 17,
    class: 'Tucson',
    combination_mpg: 20,
    cylinders: 6,
    displacement: 2.8,
    drive: 'fwd',
    fuel_type: 'gas',
    highway_mpg: 25,
    make: 'Hyundai',
    urMake: 'ٹکسن',
    arMake: 'ٹکسن',
    model: 'TUCSON',
    transmission: 'm',
    year: 1996,
    pic:'/tucson.png'
  },
  {
    city_mpg: 16,
    class: 'compact car',
    combination_mpg: 19,
    cylinders: 6,
    displacement: 2.8,
    drive: 'awd',
    fuel_type: 'gas',
    highway_mpg: 25,
    make: 'Hyundai',
    urMake: 'ہنڈائی',
    arMake: 'ہنڈائی',
    model: 'SONATA',
    transmission: 'a',
    year: 1996,
    pic:'/Sonata.png'
  },
  {
    city_mpg: 17,
    class: 'compact car',
    combination_mpg: 20,
    cylinders: 6,
    displacement: 2.8,
    drive: 'awd',
    fuel_type: 'gas',
    highway_mpg: 24,
    make: 'Toyota',
    urMake: 'ٹویوٹا',
    arMake: 'ٹویوٹا',
    model: 'CAMRY',
    transmission: 'm',
    year: 1996,
    pic:'/Camry-Toyota.png'
  },
  {
    city_mpg: 18,
    class: 'compact car',
    combination_mpg: 21,
    cylinders: 4,
    displacement: 1.8,
    drive: 'fwd',
    fuel_type: 'gas',
    highway_mpg: 27,
    make: 'Young-XL',
    urMake: 'ینگ ایس ایل',
    arMake: 'ینگ ایس ایل',
    model: 'GMC',
    transmission: 'a',
    year: 1997,
    pic:'/GMC-Young-XL-1.png'
  },
  {
    city_mpg: 18,
    class: 'compact car',
    combination_mpg: 21,
    cylinders: 4,
    displacement: 1.8,
    drive: 'fwd',
    fuel_type: 'gas',
    highway_mpg: 27,
    make: 'Toyota',
    urMake: 'ٹویوٹا',
    arMake: 'ٹویوٹا',
    model: 'COASTER',
    transmission: 'a',
    year: 1997,
    pic:'/Coaster-Toyota.png'
  },
  {
    city_mpg: 17,
    class: 'compact car',
    combination_mpg: 20,
    cylinders: 6,
    displacement: 2.8,
    drive: 'awd',
    fuel_type: 'gas',
    highway_mpg: 24,
    make: 'Toyota',
    urMake: 'ٹویوٹا',
    arMake: 'ٹویوٹا',
    model: 'HIACE',
    transmission: 'm',
    year: 1996,
    pic:'/Hiace-Toyota-1.png'
  },
  {
    city_mpg: 18,
    class: 'compact car',
    combination_mpg: 21,
    cylinders: 4,
    displacement: 1.8,
    drive: 'fwd',
    fuel_type: 'gas',
    highway_mpg: 27,
    make: 'Hyundai',
    urMake: 'ہنڈائی',
    arMake: 'ہنڈائی',
    model: 'STARIA',
    transmission: 'a',
    year: 1997,
    pic:'/Hyundai-Staria.png'
  },
  {
    city_mpg: 18,
    class: 'compact car',
    combination_mpg: 21,
    cylinders: 4,
    displacement: 1.8,
    drive: 'fwd',
    fuel_type: 'gas',
    highway_mpg: 27,
    make: 'Hyundai',
    urMake: 'ہنڈائی',
    arMake: 'ہنڈائی',
    model: 'STAREX-H1',
    transmission: 'a',
    year: 1997,
    pic:'/Hyundai-Starex-H1.png'
  },
];
