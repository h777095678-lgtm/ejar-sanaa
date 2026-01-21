export const DISTRICTS = [
  { id: "sabeen", name: "السبعين", neighborhoods: ["حدة", "الاصبحي", "بيت بوس", "حي قاع القيضي"] },
  { id: "main", name: "معين", neighborhoods: ["شارع هايل", "مذبح", "حي النهضة", "السنينة"] },
  { id: "wahdah", name: "الوحدة", neighborhoods: ["الحي السياسي", "عصر", "بغداد"] },
  { id: "tahrir", name: "التحرير", neighborhoods: ["القاع", "وسط المدينة", "علي عبدالمغني"] },
  { id: "old_city", name: "صنعاء القديمة", neighborhoods: ["حارة الجامع الكبير", "باب اليمن", "الظلف"] },
  { id: "safiyah", name: "الصافية", neighborhoods: ["حي الصافية", "حي أزال", "المشهد"] },
  { id: "shuub", name: "شعوب", neighborhoods: ["حي شعوب", "حي هبرة", "حي الروضة"] },
  { id: "thauban", name: "الثورة", neighborhoods: ["حي الثورة", "حي الجراف", "حي الحصبة"] },
  { id: "bani_harith", name: "بني الحارث", neighborhoods: ["حي المطار", "حي الروضة شمالاً", "دارس"] },
  { id: "azzal", name: "أزال", neighborhoods: ["نقم", "حي أزال"] },
];

export const CATEGORIES = [
  { id: "apartment", name: "شقق", icon: "Building2" },
  { id: "house", name: "بيوت/فلل", icon: "Home" },
  { id: "shop", name: "محلات تجارية", icon: "Store" },
  { id: "office", name: "مكاتب", icon: "Briefcase" },
  { id: "hall", name: "صالة أعراس", icon: "Music" },
  { id: "land", name: "أراضي", icon: "Map" },
  { id: "warehouse", name: "هناجر/مخازn", icon: "Container" },
  { id: "car", name: "سيارات", icon: "Car" },
  { id: "worker", name: "عمال/خدمات", icon: "HardHat" },
  { id: "rest_house", name: "استراحات", icon: "Palmtree" },
];

export interface FieldSchema {
  id: string;
  label: string;
  type: "text" | "number" | "select" | "toggle" | "checkbox";
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export const CATEGORY_SCHEMAS: Record<string, FieldSchema[]> = {
  apartment: [
    { id: "rooms", label: "عدد الغرف", type: "number", required: true },
    { id: "floor", label: "الدور", type: "number" },
    { id: "sunlight", label: "دخول الشمس (التدفيئة)", type: "toggle" },
    { id: "water_tank", label: "خزان ماء مستقل", type: "toggle" },
    { id: "electricity", label: "عداد كهرباء مستقل", type: "toggle" },
    { id: "majlis_external", label: "مجلس خارجي مستق", type: "toggle" },
  ],
  car: [
    { id: "brand", label: "الماركة", type: "text", required: true },
    { id: "year", label: "سنة الصنع", type: "number" },
    { id: "gear", label: "نوع القير", type: "select", options: ["عادي", "تمتيك"] },
  ],
  shop: [
    { id: "area", label: "المساحة (متر مربع)", type: "number" },
    { id: "doors", label: "عدد الفتحات", type: "number" },
    { id: "guarantee", label: "ضمانة تجارية مطلوبة", type: "toggle" },
  ],
  hall: [
    { id: "capacity", label: "السعة (أشخاص)", type: "number" },
    { id: "sound_system", label: "نظام صوتي متكامل", type: "toggle" },
  ]
};

export const MOCK_PROPERTIES = [
  {
    id: "1",
    title: "شقة واسعة في الحي السياسي",
    category: "apartment",
    price: 150000,
    currency: "YER",
    district: "الوحدة",
    neighborhood: "الحي السياسي",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
    features: ["3 غرف", "دور 2", "شمس ممتازة"],
    advertiser: { name: "أحمد الصنعاني", type: "owner" },
    date: "قبل يومين",
    details: {
      rooms: 3,
      floor: 2,
      sunlight: true,
      water_tank: true,
      electricity: true,
      majlis_external: false
    }
  },
  {
    id: "2",
    title: "محل تجاري - شارع هايل",
    category: "shop",
    price: 80000,
    currency: "YER",
    district: "معين",
    neighborhood: "شارع هايل",
    images: ["https://images.unsplash.com/photo-1555529669-2269763671c0?w=800"],
    features: ["فتحة واحدة", "موقع حيوي"],
    advertiser: { name: "العقارات الذهبية", type: "agent" },
    date: "قبل 5 ساعات",
    details: {
      area: 25,
      doors: 1,
      guarantee: true
    }
  }
];
