// تعريف أنواع العقارات وحقولها المخصصة
// كل نوع عقار له schema خاص به

export type PropertyType = 
  | 'apartment'      // شقة
  | 'building'       // عمارة
  | 'villa'          // فيلا
  | 'shop'           // محل تجاري
  | 'basement'       // بدروم
  | 'wedding-hall'   // صالة أعراس
  | 'land'           // قطعة أرض/حوش
  | 'office'         // مكتب
  | 'hotel-room'     // غرفة فندق
  | 'hotel-apartment'// شقة فندقية
  | 'car'            // سيارة
  | 'motorcycle'     // دراجة نارية
  | 'stall'          // بسطة
  | 'other';         // أخرى

export interface FieldDefinition {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'boolean' | 'textarea' | 'dimensions';
  required: boolean;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  description?: string;
  showInCard?: boolean;    // هل يظهر في البطاقة المختصرة؟
  showInFilters?: boolean; // هل يظهر في الفلاتر؟
  icon?: string;
}

// الحقول المشتركة بين جميع الأنواع
export const COMMON_FIELDS: FieldDefinition[] = [
  {
    name: 'district',
    label: 'المديرية',
    type: 'select',
    required: true,
    showInCard: true,
    showInFilters: true,
    icon: 'map-pin'
  },
  {
    name: 'neighborhood',
    label: 'الحي',
    type: 'select',
    required: true,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'hara',
    label: 'الحارة',
    type: 'select',
    required: false,
    showInCard: false,
    showInFilters: false
  },
  {
    name: 'locationDescription',
    label: 'وصف الموقع',
    type: 'textarea',
    required: false,
    placeholder: 'مثال: قريب من جامعة صنعاء، بجانب مسجد الإيمان',
    showInCard: false,
    showInFilters: false
  },
  {
    name: 'price',
    label: 'السعر',
    type: 'number',
    required: true,
    showInCard: true,
    showInFilters: true,
    icon: 'currency'
  },
  {
    name: 'negotiable',
    label: 'قابل للتفاوض',
    type: 'boolean',
    required: false,
    showInCard: true,
    showInFilters: false
  }
];

// حقول خاصة بالشقق
export const APARTMENT_FIELDS: FieldDefinition[] = [
  {
    name: 'buildingType',
    label: 'موقع الشقة',
    type: 'select',
    required: true,
    options: [
      { value: 'single', label: 'عمارة شقة واحدة' },
      { value: 'multiple', label: 'عمارة مجموعة شقق' }
    ],
    showInCard: false,
    showInFilters: true
  },
  {
    name: 'floor',
    label: 'الدور',
    type: 'select',
    required: true,
    options: [
      { value: 'ground', label: 'أرضي' },
      { value: 'first', label: 'أول' },
      { value: 'second', label: 'ثاني' },
      { value: 'third', label: 'ثالث' },
      { value: 'fourth', label: 'رابع' },
      { value: 'fifth', label: 'خامس' },
      { value: 'roof', label: 'دار مفرج / رمانة' }
    ],
    showInCard: true,
    showInFilters: true,
    icon: 'building'
  },
  {
    name: 'rooms',
    label: 'عدد الغرف',
    type: 'number',
    required: true,
    showInCard: true,
    showInFilters: true,
    icon: 'home'
  },
  {
    name: 'roomDetails',
    label: 'تفاصيل الغرف (المقاسات)',
    type: 'textarea',
    required: false,
    placeholder: 'مثال: غرفة 1: 4×5، غرفة 2: 3×4',
    showInCard: false,
    showInFilters: false
  },
  {
    name: 'hasKitchen',
    label: 'يوجد مطبخ',
    type: 'boolean',
    required: false,
    showInCard: false,
    showInFilters: true
  },
  {
    name: 'kitchenSize',
    label: 'مقاس المطبخ',
    type: 'text',
    required: false,
    placeholder: 'مثال: 2×3',
    showInCard: false,
    showInFilters: false
  },
  {
    name: 'bathrooms',
    label: 'عدد الحمامات',
    type: 'number',
    required: true,
    showInCard: true,
    showInFilters: true,
    icon: 'bath'
  },
  {
    name: 'externalMajlis',
    label: 'مجلس خارجي',
    type: 'select',
    required: false,
    options: [
      { value: 'no', label: 'لا يوجد' },
      { value: 'with-bathroom', label: 'يوجد مع حمام' },
      { value: 'without-bathroom', label: 'يوجد بدون حمام' }
    ],
    showInCard: true,
    showInFilters: true,
    icon: 'armchair'
  },
  {
    name: 'waterSource',
    label: 'مصدر المياه',
    type: 'select',
    required: true,
    options: [
      { value: 'government', label: 'حكومي' },
      { value: 'tank-independent', label: 'خزان مستقل' },
      { value: 'tank-shared', label: 'خزان مشترك' },
      { value: 'purchased', label: 'وايتات (شراء)' }
    ],
    showInCard: true,
    showInFilters: true,
    icon: 'droplet'
  },
  {
    name: 'electricitySource',
    label: 'مصدر الكهرباء',
    type: 'select',
    required: true,
    options: [
      { value: 'government', label: 'حكومي' },
      { value: 'commercial', label: 'تجاري / مولد' },
      { value: 'solar', label: 'طاقة شمسية' },
      { value: 'mixed', label: 'مختلط' }
    ],
    showInCard: true,
    showInFilters: true,
    icon: 'zap'
  },
  {
    name: 'electricityIndependent',
    label: 'عداد كهرباء',
    type: 'select',
    required: false,
    options: [
      { value: 'independent', label: 'منفصل' },
      { value: 'shared', label: 'مشترك' }
    ],
    showInCard: false,
    showInFilters: true
  },
  {
    name: 'sunDirection',
    label: 'اتجاه الشمس',
    type: 'select',
    required: false,
    options: [
      { value: 'south', label: 'عدني (جنوبي) - مشمس ☀️' },
      { value: 'east', label: 'شرقي - مشمس صباحاً 🌤️' },
      { value: 'west', label: 'غربي - مشمس عصراً 🌅' },
      { value: 'north', label: 'قبلي (شمالي) - ظليل ☁️' }
    ],
    showInCard: true,
    showInFilters: true,
    icon: 'sun'
  },
  {
    name: 'deposit',
    label: 'مبلغ التأمين',
    type: 'number',
    required: false,
    placeholder: '0 إذا لم يطلب',
    showInCard: false,
    showInFilters: false
  },
  {
    name: 'advance',
    label: 'المقدم',
    type: 'select',
    required: false,
    options: [
      { value: 'one-month', label: 'شهر واحد' },
      { value: 'two-months', label: 'شهرين' },
      { value: 'three-months', label: 'ثلاثة أشهر' }
    ],
    showInCard: false,
    showInFilters: false
  },
  {
    name: 'commission',
    label: 'الساعية / الدلالة',
    type: 'select',
    required: false,
    options: [
      { value: 'on-tenant', label: 'على المستأجر' },
      { value: 'on-owner', label: 'على المالك' },
      { value: 'split', label: 'مناصفة' },
      { value: 'none', label: 'لا يوجد' }
    ],
    showInCard: false,
    showInFilters: false
  },
  {
    name: 'guarantee',
    label: 'الضمانة',
    type: 'select',
    required: false,
    options: [
      { value: 'commercial', label: 'ضمانة تجارية' },
      { value: 'employee', label: 'ضمين موظف' },
      { value: 'id', label: 'بطاقة شخصية فقط' },
      { value: 'none', label: 'غير مطلوب' }
    ],
    showInCard: false,
    showInFilters: false
  },
  {
    name: 'priceInclusive',
    label: 'السعر يشمل',
    type: 'select',
    required: false,
    options: [
      { value: 'all', label: 'شامل الماء والكهرباء' },
      { value: 'none', label: 'غير شامل' }
    ],
    showInCard: false,
    showInFilters: true
  },
  {
    name: 'isCommercial',
    label: 'نوع الاستخدام',
    type: 'select',
    required: false,
    options: [
      { value: 'residential', label: 'سكني' },
      { value: 'commercial', label: 'تجاري' }
    ],
    showInCard: false,
    showInFilters: true
  }
];

// حقول خاصة بالمحلات التجارية
export const SHOP_FIELDS: FieldDefinition[] = [
  {
    name: 'streetName',
    label: 'اسم الشارع',
    type: 'text',
    required: false,
    showInCard: true,
    showInFilters: false
  },
  {
    name: 'streetType',
    label: 'نوع الشارع',
    type: 'select',
    required: false,
    options: [
      { value: 'main', label: 'رئيسي' },
      { value: 'secondary', label: 'فرعي' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'doors',
    label: 'عدد الفتحات',
    type: 'number',
    required: true,
    placeholder: '1، 2، 3...',
    showInCard: true,
    showInFilters: true,
    icon: 'door-open'
  },
  {
    name: 'hasBathroom',
    label: 'يوجد حمام',
    type: 'boolean',
    required: false,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'hasStorage',
    label: 'يوجد مستودع/مخزن',
    type: 'boolean',
    required: false,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'storageType',
    label: 'نوع المستودع',
    type: 'select',
    required: false,
    options: [
      { value: 'internal', label: 'داخلي (جزء من المحل)' },
      { value: 'external', label: 'خارجي (منفصل)' }
    ],
    showInCard: false,
    showInFilters: false
  },
  {
    name: 'shopArea',
    label: 'مساحة المحل (طول × عرض)',
    type: 'text',
    required: false,
    placeholder: 'مثال: 5×6',
    showInCard: false,
    showInFilters: false
  },
  {
    name: 'storageArea',
    label: 'مساحة المستودع',
    type: 'text',
    required: false,
    placeholder: 'مثال: 3×4',
    showInCard: false,
    showInFilters: false
  },
  {
    name: 'shopStatus',
    label: 'حالة المحل',
    type: 'select',
    required: true,
    options: [
      { value: 'new-first-time', label: 'جديد - أول مرة' },
      { value: 'empty-previous', label: 'فارغ - سبق استئجاره' },
      { value: 'transfer', label: 'نقل قدم (المحل مشغول)' },
      { value: 'with-goods', label: 'مع البضاعة' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'hasElectricity',
    label: 'يوجد كهرباء',
    type: 'boolean',
    required: false,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'electricityType',
    label: 'نوع الكهرباء',
    type: 'select',
    required: false,
    options: [
      { value: 'government', label: 'حكومي' },
      { value: 'commercial', label: 'أهلي' }
    ],
    showInCard: false,
    showInFilters: false
  },
  {
    name: 'electricityMeter',
    label: 'عداد الكهرباء',
    type: 'select',
    required: false,
    options: [
      { value: 'independent', label: 'مستقل' },
      { value: 'shared', label: 'مشترك' }
    ],
    showInCard: false,
    showInFilters: false
  },
  {
    name: 'transferFee',
    label: 'مبلغ نقل القدم',
    type: 'number',
    required: false,
    placeholder: '0 إذا لم يطلب',
    showInCard: false,
    showInFilters: false
  }
];

// حقول خاصة بالفلل
export const VILLA_FIELDS: FieldDefinition[] = [
  {
    name: 'status',
    label: 'حالة الفيلا',
    type: 'select',
    required: true,
    options: [
      { value: 'finished', label: 'جاهزة (مشطبة)' },
      { value: 'unfinished', label: 'عظم (غير مكتملة)' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'age',
    label: 'عمر الفيلا',
    type: 'select',
    required: true,
    options: [
      { value: 'new', label: 'جديدة' },
      { value: 'old', label: 'قديمة' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'furnished',
    label: 'مفروشة',
    type: 'select',
    required: true,
    options: [
      { value: 'yes', label: 'مفروشة' },
      { value: 'no', label: 'غير مفروشة' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'floors',
    label: 'عدد الأدوار',
    type: 'number',
    required: true,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'rooms',
    label: 'عدد الغرف',
    type: 'number',
    required: true,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'bathrooms',
    label: 'عدد الحمامات',
    type: 'number',
    required: true,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'hasGarden',
    label: 'يوجد حديقة',
    type: 'boolean',
    required: false,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'hasParking',
    label: 'يوجد موقف سيارات',
    type: 'boolean',
    required: false,
    showInCard: true,
    showInFilters: true
  }
];

// حقول خاصة بالبدروم
export const BASEMENT_FIELDS: FieldDefinition[] = [
  {
    name: 'area',
    label: 'المساحة (طول × عرض × ارتفاع)',
    type: 'text',
    required: true,
    placeholder: 'مثال: 10×8×3',
    showInCard: true,
    showInFilters: false
  },
  {
    name: 'hasBathroom',
    label: 'يوجد حمام',
    type: 'boolean',
    required: false,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'hasVentilation',
    label: 'يوجد تهوية',
    type: 'boolean',
    required: true,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'waterproofing',
    label: 'مستوى الحماية من الأمطار',
    type: 'select',
    required: true,
    options: [
      { value: 'excellent', label: 'ممتاز - لا يدخل ماء مهما اشتدت' },
      { value: 'good', label: 'جيد - يدخل ماء عند الأمطار الشديدة فقط' },
      { value: 'poor', label: 'ضعيف - يدخل ماء عند الأمطار المتوسطة' }
    ],
    showInCard: true,
    showInFilters: true,
    icon: 'droplets'
  },
  {
    name: 'hasElectricity',
    label: 'يوجد كهرباء',
    type: 'boolean',
    required: false,
    showInCard: true,
    showInFilters: true
  }
];

// حقول خاصة بصالات الأعراس
export const WEDDING_HALL_FIELDS: FieldDefinition[] = [
  {
    name: 'hallName',
    label: 'اسم الصالة',
    type: 'text',
    required: true,
    showInCard: true,
    showInFilters: false
  },
  {
    name: 'pricingType',
    label: 'نظام السعر',
    type: 'select',
    required: true,
    options: [
      { value: 'per-event', label: 'سعر المناسبة كاملة' },
      { value: 'per-hour', label: 'سعر الساعة' }
    ],
    showInCard: false,
    showInFilters: true
  },
  {
    name: 'timeSlot',
    label: 'الفترة',
    type: 'select',
    required: true,
    options: [
      { value: 'morning', label: 'صباحية (8ص - 2م)' },
      { value: 'afternoon', label: 'عصرية (2م - 10م)' },
      { value: 'evening', label: 'مسائية (6م - 2ص)' },
      { value: 'custom', label: 'مخصصة' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'gender',
    label: 'النوع',
    type: 'select',
    required: true,
    options: [
      { value: 'men', label: 'رجال فقط' },
      { value: 'women', label: 'نساء فقط' },
      { value: 'mixed-time', label: 'كلاهما (حسب الحجز)' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'capacity',
    label: 'سعة القاعة (عدد الأشخاص)',
    type: 'number',
    required: true,
    placeholder: 'مثال: 500',
    showInCard: true,
    showInFilters: true,
    icon: 'users'
  },
  {
    name: 'seatingStyle',
    label: 'نظام الجلوس',
    type: 'select',
    required: true,
    options: [
      { value: 'arabic', label: 'عربي (مجالس)' },
      { value: 'western', label: 'غربي (طاولات وكراسي)' },
      { value: 'mixed', label: 'مختلط' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'hasDiningHall',
    label: 'يوجد صالة طعام',
    type: 'boolean',
    required: false,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'hasKosha',
    label: 'يوجد كوشة',
    type: 'boolean',
    required: true,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'hallArea',
    label: 'مساحة القاعة',
    type: 'text',
    required: false,
    placeholder: 'مثال: 20×30',
    showInCard: false,
    showInFilters: false
  },
  {
    name: 'bathrooms',
    label: 'عدد الحمامات',
    type: 'number',
    required: true,
    showInCard: false,
    showInFilters: false
  },
  {
    name: 'hasPrayerRoom',
    label: 'يوجد مصلى',
    type: 'boolean',
    required: false,
    showInCard: false,
    showInFilters: true
  },
  {
    name: 'hasInsects',
    label: 'خالية من الحشرات',
    type: 'boolean',
    required: false,
    description: 'للمجالس العربية: خالية من الكتن والقمل',
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'services',
    label: 'الخدمات المشمولة',
    type: 'multiselect',
    required: false,
    options: [
      { value: 'decoration', label: 'تزيين' },
      { value: 'generator', label: 'مولد كهربائي' },
      { value: 'sound-system', label: 'نظام صوتي' },
      { value: 'lighting', label: 'إضاءة' },
      { value: 'parking', label: 'مواقف سيارات' }
    ],
    showInCard: false,
    showInFilters: false
  }
];

// حقول خاصة بالمكاتب
export const OFFICE_FIELDS: FieldDefinition[] = [
  {
    name: 'rooms',
    label: 'عدد الغرف',
    type: 'number',
    required: true,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'bathrooms',
    label: 'عدد الحمامات',
    type: 'number',
    required: true,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'hasElectricity',
    label: 'يوجد كهرباء',
    type: 'boolean',
    required: false,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'age',
    label: 'العمر',
    type: 'select',
    required: true,
    options: [
      { value: 'new', label: 'جديد' },
      { value: 'old', label: 'قديم' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'hasFurniture',
    label: 'أثاث مكتبي',
    type: 'boolean',
    required: false,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'furnitureDescription',
    label: 'وصف الأثاث',
    type: 'textarea',
    required: false,
    placeholder: 'مثال: 3 مكاتب، 10 كراسي، خزانة...',
    showInCard: false,
    showInFilters: false
  }
];

// حقول خاصة بالفنادق (غرف وشقق)
export const HOTEL_ROOM_FIELDS: FieldDefinition[] = [
  {
    name: 'roomType',
    label: 'نوع الغرفة',
    type: 'select',
    required: true,
    options: [
      { value: 'couple', label: 'غرفة عرسان' },
      { value: 'singles', label: 'غرفة أفراد' },
      { value: 'family', label: 'غرفة عوائل' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'furnished',
    label: 'مفروشة',
    type: 'boolean',
    required: true,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'beds',
    label: 'عدد الأسرة',
    type: 'number',
    required: true,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'hasArabicMajlis',
    label: 'يوجد مجلس عربي',
    type: 'boolean',
    required: false,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'bathroomType',
    label: 'الحمام',
    type: 'select',
    required: true,
    options: [
      { value: 'private', label: 'مستقل للغرفة' },
      { value: 'shared', label: 'مشترك' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'hasInternet',
    label: 'يوجد إنترنت',
    type: 'boolean',
    required: false,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'internetIncluded',
    label: 'الإنترنت',
    type: 'select',
    required: false,
    options: [
      { value: 'free', label: 'مجاني' },
      { value: 'paid', label: 'بمقابل' },
      { value: 'not-available', label: 'غير متوفر' }
    ],
    showInCard: false,
    showInFilters: false
  },
  {
    name: 'hasHotWater',
    label: 'مياه ساخنة',
    type: 'boolean',
    required: true,
    description: 'مهم جداً في الشتاء',
    showInCard: true,
    showInFilters: true,
    icon: 'thermometer'
  }
];

export const HOTEL_APARTMENT_FIELDS: FieldDefinition[] = [
  {
    name: 'apartmentType',
    label: 'نوع الشقة',
    type: 'select',
    required: true,
    options: [
      { value: 'couple', label: 'شقة عرسان' },
      { value: 'singles', label: 'شقة أفراد' },
      { value: 'family', label: 'شقة عوائل' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'rooms',
    label: 'عدد الغرف',
    type: 'number',
    required: true,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'bathrooms',
    label: 'عدد الحمامات',
    type: 'number',
    required: true,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'bathroomType',
    label: 'نوع الحمامات',
    type: 'select',
    required: true,
    options: [
      { value: 'private', label: 'مستقلة' },
      { value: 'shared', label: 'مشتركة' }
    ],
    showInCard: false,
    showInFilters: false
  },
  {
    name: 'hasArabicMajlis',
    label: 'يوجد مجلس عربي',
    type: 'boolean',
    required: false,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'hasInternet',
    label: 'يوجد إنترنت',
    type: 'boolean',
    required: false,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'hasHotWater',
    label: 'مياه ساخنة',
    type: 'boolean',
    required: true,
    showInCard: true,
    showInFilters: true
  }
];

// حقول خاصة بقطع الأراضي
export const LAND_FIELDS: FieldDefinition[] = [
  {
    name: 'area',
    label: 'المساحة (باللبنة)',
    type: 'number',
    required: true,
    description: 'اللبنة = 44.44 متر مربع',
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'areaMeters',
    label: 'المساحة (بالمتر المربع)',
    type: 'number',
    required: false,
    showInCard: false,
    showInFilters: false
  },
  {
    name: 'landType',
    label: 'نوع الأرض',
    type: 'select',
    required: true,
    options: [
      { value: 'free', label: 'حر' },
      { value: 'waqf', label: 'وقف' },
      { value: 'government', label: 'حكومي' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'terrain',
    label: 'طبيعة الأرض',
    type: 'select',
    required: true,
    options: [
      { value: 'flat', label: 'مستوية' },
      { value: 'hilly', label: 'جبلية' },
      { value: 'buried', label: 'مدفونة' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'hasServices',
    label: 'الخدمات الواصلة',
    type: 'multiselect',
    required: false,
    options: [
      { value: 'road', label: 'شارع مزفلت' },
      { value: 'sewage', label: 'مجاري' },
      { value: 'electricity', label: 'كهرباء' },
      { value: 'phone', label: 'هاتف' }
    ],
    showInCard: false,
    showInFilters: true
  }
];

// حقول خاصة بالسيارات
export const CAR_FIELDS: FieldDefinition[] = [
  {
    name: 'carType',
    label: 'نوع السيارة',
    type: 'select',
    required: true,
    options: [
      { value: 'sedan', label: 'صالون' },
      { value: 'bus', label: 'باص' },
      { value: 'taxi', label: 'تكسي' },
      { value: 'wedding', label: 'سيارة زفة' },
      { value: 'other', label: 'أخرى' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'condition',
    label: 'الحالة',
    type: 'select',
    required: true,
    options: [
      { value: 'new', label: 'جديدة' },
      { value: 'used', label: 'مستعملة' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'rentalPeriod',
    label: 'نظام الإيجار',
    type: 'select',
    required: true,
    options: [
      { value: 'daily', label: 'يومي' },
      { value: 'weekly', label: 'أسبوعي' },
      { value: 'monthly', label: 'شهري' },
      { value: 'per-trip', label: 'مشوار' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'withDriver',
    label: 'مع سائق',
    type: 'boolean',
    required: true,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'insurance',
    label: 'التأمين',
    type: 'text',
    required: false,
    placeholder: 'شروط التأمين',
    showInCard: false,
    showInFilters: false
  }
];

// حقول خاصة بالدراجات النارية
export const MOTORCYCLE_FIELDS: FieldDefinition[] = [
  {
    name: 'motorcycleType',
    label: 'نوع الدراجة',
    type: 'select',
    required: true,
    options: [
      { value: 'delivery', label: 'دراجة توصيل' },
      { value: 'personal', label: 'دراجة شخصية' },
      { value: 'sport', label: 'دراجة رياضية' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'condition',
    label: 'الحالة',
    type: 'select',
    required: true,
    options: [
      { value: 'new', label: 'جديدة' },
      { value: 'used', label: 'مستعملة' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'rentalPeriod',
    label: 'نظام الإيجار',
    type: 'select',
    required: true,
    options: [
      { value: 'daily', label: 'يومي' },
      { value: 'weekly', label: 'أسبوعي' },
      { value: 'monthly', label: 'شهري' }
    ],
    showInCard: true,
    showInFilters: true
  }
];

// حقول خاصة بالبسطات
export const STALL_FIELDS: FieldDefinition[] = [
  {
    name: 'location',
    label: 'الموقع الدقيق',
    type: 'text',
    required: true,
    placeholder: 'مثال: سوق الملح، أمام مسجد كذا',
    showInCard: true,
    showInFilters: false
  },
  {
    name: 'marketName',
    label: 'اسم السوق',
    type: 'text',
    required: false,
    showInCard: true,
    showInFilters: false
  },
  {
    name: 'businessType',
    label: 'نوع النشاط',
    type: 'select',
    required: true,
    options: [
      { value: 'clothes', label: 'ملابس' },
      { value: 'vegetables', label: 'خضار' },
      { value: 'accessories', label: 'ملحقات' },
      { value: 'other', label: 'أخرى' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'timing',
    label: 'التوقيت',
    type: 'select',
    required: true,
    options: [
      { value: 'morning', label: 'صباحي' },
      { value: 'evening', label: 'مسائي' },
      { value: 'all-day', label: 'طوال اليوم' }
    ],
    showInCard: true,
    showInFilters: true
  }
];

// حقول خاصة بالعمائر
export const BUILDING_FIELDS: FieldDefinition[] = [
  {
    name: 'status',
    label: 'حالة العمارة',
    type: 'select',
    required: true,
    options: [
      { value: 'finished', label: 'جاهزة' },
      { value: 'unfinished', label: 'عظم (غير مكتملة)' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'age',
    label: 'العمر',
    type: 'select',
    required: true,
    options: [
      { value: 'new', label: 'جديدة' },
      { value: 'old', label: 'قديمة' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'purpose',
    label: 'الغرض من الإيجار',
    type: 'select',
    required: true,
    options: [
      { value: 'residential', label: 'شقق سكنية' },
      { value: 'school', label: 'مدرسة أهلية' },
      { value: 'offices', label: 'مكاتب' },
      { value: 'clinic', label: 'مركز صحي / مستشفى' },
      { value: 'other', label: 'أخرى' }
    ],
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'floors',
    label: 'عدد الأدوار',
    type: 'number',
    required: true,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'apartments',
    label: 'عدد الشقق',
    type: 'number',
    required: false,
    showInCard: true,
    showInFilters: true
  }
];

// Map each property type to its schema
export const PROPERTY_SCHEMAS: Record<PropertyType, FieldDefinition[]> = {
  'apartment': APARTMENT_FIELDS,
  'building': BUILDING_FIELDS,
  'villa': VILLA_FIELDS,
  'shop': SHOP_FIELDS,
  'basement': BASEMENT_FIELDS,
  'wedding-hall': WEDDING_HALL_FIELDS,
  'land': LAND_FIELDS,
  'office': OFFICE_FIELDS,
  'hotel-room': HOTEL_ROOM_FIELDS,
  'hotel-apartment': HOTEL_APARTMENT_FIELDS,
  'car': CAR_FIELDS,
  'motorcycle': MOTORCYCLE_FIELDS,
  'stall': STALL_FIELDS,
  'other': []
};

// Get all fields for a property type (common + specific)
export function getFieldsForPropertyType(type: PropertyType): FieldDefinition[] {
  return [...COMMON_FIELDS, ...(PROPERTY_SCHEMAS[type] || [])];
}

// Get fields that should show in the property card
export function getCardFields(type: PropertyType): FieldDefinition[] {
  return getFieldsForPropertyType(type).filter(f => f.showInCard);
}

// Get fields that should show in filters
export function getFilterFields(type: PropertyType): FieldDefinition[] {
  return getFieldsForPropertyType(type).filter(f => f.showInFilters);
}
