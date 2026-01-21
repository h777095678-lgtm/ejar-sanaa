// بيانات دقيقة لمديريات أمانة العاصمة صنعاء
// مستندة على التقسيم الإداري الرسمي والتعداد السكاني 2004

export interface District {
  id: string;
  name: string;
  classification: 'urban' | 'mixed' | 'historic';
  hasUzal: boolean; // هل تحتوي على عزل (خاص ببني الحارث)
  neighborhoods: Neighborhood[];
}

export interface Neighborhood {
  id: string;
  name: string;
  type: 'urban' | 'rural' | 'uzlah'; // حي حضري، ريفي، أو عزلة
  haras?: string[]; // الحارات التابعة
  villages?: string[]; // القرى (للعزل فقط)
}

export const DISTRICTS: District[] = [
  {
    id: 'bani-harith',
    name: 'بني الحارث',
    classification: 'mixed',
    hasUzal: true,
    neighborhoods: [
      // الأحياء الحضرية (منطقة الروضة)
      {
        id: 'rouda',
        name: 'الروضة',
        type: 'urban',
        haras: ['الرحبة', 'بني حوات', 'بيت عاطف', 'سدس الروض', 'بير زيد', 'سدس أحداق', 'جدر', 'القابل']
      },
      // العزل الريفية
      {
        id: 'sudus-hudud',
        name: 'عزلة سدس الحدود',
        type: 'uzlah',
        villages: [
          'بيت عثرب', 'بيت خيران', 'بيت الحدمة', 'بيت الأكوع', 'بير زاهر',
          'الغرزة', 'العروق', 'الغراس', 'بيت الجلال', 'الحتارش',
          'بني زياد', 'بيت هادي', 'بيت هديان', 'بيت السباعي', 'المحجل',
          'بيت بيدر', 'العذرة', 'بني عاصم', 'بيت دغيش'
        ]
      },
      {
        id: 'hama',
        name: 'عزلة الحماء',
        type: 'uzlah',
        villages: [
          'بيت القماسي', 'بيت الخاوي', 'الحماء', 'غلابة', 'بيت طاهر',
          'العليفة', 'بيت حنظل', 'بيت الحللي', 'بيت حنكل', 'بيت الحطيري',
          'بيت العنجري', 'بيت المرشحي', 'بيت خميس', 'بير الدرب',
          'الخميس', 'سوق الخميس', 'العقر'
        ]
      },
      {
        id: 'bani-jarmuz',
        name: 'عزلة بني جرموز',
        type: 'uzlah',
        villages: [
          'دغيش', 'الغولة', 'الغربي', 'القصير', 'الهجرة',
          'الخبشة', 'دهرة', 'الحرة', 'بيت الحسام'
        ]
      }
    ]
  },
  {
    id: 'sabeen',
    name: 'السبعين',
    classification: 'urban',
    hasUzal: false,
    neighborhoods: [
      {
        id: 'haddah',
        name: 'حدة',
        type: 'urban',
        haras: [
          'قرية حدة', 'العفيف', 'فج عطان', 'حصن عطان',
          'بير عبيد', 'بير القضايا'
        ]
      },
      {
        id: 'sabeen-center',
        name: 'السبعين المركز',
        type: 'urban',
        haras: [
          'ميدان السبعين', 'مستشفى السبعين', 'دار الرعاية', 'الحورش',
          'الحسين بن علي', 'الحمزة الشرقية', 'الحمزة الغربية',
          'حديقة 26 سبتمبر', 'محوى 45'
        ]
      },
      {
        id: 'asbahi',
        name: 'الأصبحي',
        type: 'urban',
        haras: ['الأصبحي الجديد', 'الأصبحي الشرقي', 'الأصبحي الشمالي']
      },
      {
        id: 'qadisiya',
        name: 'القادسية',
        type: 'urban',
        haras: [
          'القادسية الشرقية', 'القادسية الغربية',
          'القادسية الجنوبية', 'المهندسين'
        ]
      },
      {
        id: 'bait-mayad',
        name: 'بيت معياد',
        type: 'urban',
        haras: ['بيت معياد', 'نوبة معياد']
      },
      {
        id: 'jardaa',
        name: 'الجرداء',
        type: 'urban',
        haras: ['الجرداء']
      },
      {
        id: 'qalfan',
        name: 'القلفان',
        type: 'urban',
        haras: ['القلفان']
      },
      {
        id: 'sawad-shamali',
        name: 'السواد الشمالي',
        type: 'urban',
        haras: ['السواد الشمالي']
      },
      {
        id: 'dar-salam',
        name: 'دار سلم',
        type: 'urban',
        haras: ['دار سلم', 'المناخ']
      },
      {
        id: 'azal-sabeen',
        name: 'آزال السبعين',
        type: 'urban',
        haras: ['مدرسة آزال', 'السبعين آزال']
      }
    ]
  },
  {
    id: 'maeen',
    name: 'معين',
    classification: 'urban',
    hasUzal: false,
    neighborhoods: [
      {
        id: 'maeen-center',
        name: 'معين',
        type: 'urban',
        haras: [
          'الجامعة', 'الزراعة', 'القبة الخضراء', 'الطيارين', 'الرقاص',
          'التيسير', 'معين الشمالية', 'معين الجنوبية', 'معين الشرقية',
          'معين الغربية', 'مذبح', 'مذبح القديمة', 'مذبح الجديدة',
          'قاع مذبح', 'شرق مذبح'
        ]
      },
      {
        id: 'sanina',
        name: 'السنينة',
        type: 'urban',
        haras: ['السنينة', 'السنينات الشرقية', 'السنينات الغربية']
      },
      {
        id: 'asr-ala',
        name: 'عصر الأعلى',
        type: 'urban',
        haras: ['عصر', 'عصر الأعلى', 'الأحقاب']
      }
    ]
  },
  {
    id: 'thawra',
    name: 'الثورة',
    classification: 'urban',
    hasUzal: false,
    neighborhoods: [
      {
        id: 'hasaba',
        name: 'الحصبة',
        type: 'urban',
        haras: [
          'الحصبة الشمالية', 'النصر', 'شارع طرابلس',
          'القيوم', 'اللجنة الدائمة'
        ]
      },
      {
        id: 'thawra-center',
        name: 'الثورة',
        type: 'urban',
        haras: [
          'مدينة صوفان', 'صوفان', 'الميثاق', 'الدفعي', 'العصيمي',
          'سواد حنش الشمالية', 'سواد حنش الجنوبية', 'سواد حنش الشرقية'
        ]
      },
      {
        id: 'jaraf-gharbi',
        name: 'الجراف الغربي',
        type: 'urban',
        haras: ['بير الشائف', 'بئر الحواتي', 'بئر الزقار']
      },
      {
        id: 'television',
        name: 'التلفزيون',
        type: 'urban',
        haras: ['التلفزيون', 'الربعين', 'حديقة الثورة']
      },
      {
        id: 'majma-libi',
        name: 'المجمع الليبي',
        type: 'urban',
        haras: ['المجمع الليبي']
      }
    ]
  },
  {
    id: 'shuaub',
    name: 'شعوب',
    classification: 'urban',
    hasUzal: false,
    neighborhoods: [
      {
        id: 'shuaub-center',
        name: 'شعوب',
        type: 'urban',
        haras: ['شعوب المركز']
      },
      {
        id: 'jaraf-sharqi',
        name: 'الجراف الشرقي',
        type: 'urban',
        haras: ['الجراف الشرقي']
      },
      {
        id: 'habra',
        name: 'هبرة',
        type: 'urban',
        haras: ['هبرة']
      },
      {
        id: 'musayk-shuaub',
        name: 'مسيك شعوب',
        type: 'urban',
        haras: ['مسيك شعوب']
      },
      {
        id: 'hashishiya',
        name: 'الحشيشية',
        type: 'urban',
        haras: ['الحشيشية']
      },
      {
        id: 'sawan',
        name: 'سعوان',
        type: 'urban',
        haras: ['سعوان القديم']
      },
      {
        id: 'sarf',
        name: 'صرف',
        type: 'urban',
        haras: ['صرف']
      },
      {
        id: 'saba',
        name: 'سبأ',
        type: 'urban',
        haras: ['سبأ الشرقي', 'سبأ الغربي']
      }
    ]
  },
  {
    id: 'azal',
    name: 'آزال',
    classification: 'urban',
    hasUzal: false,
    neighborhoods: [
      {
        id: 'nuqm',
        name: 'نقم',
        type: 'urban',
        haras: ['غول البلس', 'غول الباشا']
      },
      {
        id: 'musayk',
        name: 'مسيك',
        type: 'urban',
        haras: ['وادي القصر', 'الفلاح', 'الصادق']
      },
      {
        id: 'dhahr-hmir',
        name: 'ظهر حمير',
        type: 'urban',
        haras: ['ظهر حمير الشمالي', 'ظهر حمير الجنوبي']
      },
      {
        id: 'azal-center',
        name: 'آزال',
        type: 'urban',
        haras: [
          'السد الشمالي', 'السد الجنوبي',
          'عمار بن ياسر', 'عمر بن الخطاب'
        ]
      },
      {
        id: 'hospital-thawra',
        name: 'مستشفى الثورة',
        type: 'urban',
        haras: ['مستشفى الثورة']
      }
    ]
  },
  {
    id: 'safiya',
    name: 'الصافية',
    classification: 'urban',
    hasUzal: false,
    neighborhoods: [
      {
        id: 'safiya',
        name: 'الصافية',
        type: 'urban',
        haras: [
          'ابن خلدون', 'الروض', 'الصعدي', 'المجد الشمالية', 'النور',
          'الفتح الشمالية', 'الفتح الجنوبية', 'الفتح الوسطى',
          'التضامن الشمالية', 'التضامن الجنوبية', 'سبأ الصافية',
          'معاذ بن جبل', 'المخرصات', 'جامع الدعوة', 'باب السلام',
          'محوى باب اليمن'
        ]
      }
    ]
  },
  {
    id: 'wahda',
    name: 'الوحدة',
    classification: 'urban',
    hasUzal: false,
    neighborhoods: [
      {
        id: 'political-district',
        name: 'الحي السياسي',
        type: 'urban',
        haras: ['دجلة', 'عمان']
      },
      {
        id: 'wahda-center',
        name: 'الوحدة',
        type: 'urban',
        haras: ['المدرسة الفنية', 'بير نهشل']
      },
      {
        id: 'balayli',
        name: 'البليلي',
        type: 'urban',
        haras: ['البليلي', 'الصافية الغربية']
      },
      {
        id: 'police-college',
        name: 'كلية الشرطة',
        type: 'urban',
        haras: ['كلية الشرطة', 'مدرسة أروى']
      },
      {
        id: 'industrial-complex',
        name: 'المجمع الصناعي',
        type: 'urban',
        haras: ['المجمع الصناعي', 'بغداد']
      },
      {
        id: 'atan',
        name: 'عطان',
        type: 'urban',
        haras: ['عطان الشمالي']
      }
    ]
  },
  {
    id: 'tahrir',
    name: 'التحرير',
    classification: 'urban',
    hasUzal: false,
    neighborhoods: [
      {
        id: 'tahrir-center',
        name: 'التحرير',
        type: 'urban',
        haras: [
          'القيادة', 'بئر خيران', 'الكويت', 'الإذاعة الشمالية',
          'الإذاعة الجنوبية', 'بستان علي', 'البهمة'
        ]
      },
      {
        id: 'bir-azab',
        name: 'بير العزب',
        type: 'urban',
        haras: [
          'بير أبو شملة', 'باب الروم', 'بنك الدم',
          'الجامعة القديمة', 'الكهرباء'
        ]
      },
      {
        id: 'qaa',
        name: 'القاع',
        type: 'urban',
        haras: [
          'القاع', 'قاع العلفي', 'البلقة', 'بئر الشمس', 'الشراعي'
        ]
      }
    ]
  },
  {
    id: 'old-sanaa',
    name: 'صنعاء القديمة',
    classification: 'historic',
    hasUzal: false,
    neighborhoods: [
      {
        id: 'old-city',
        name: 'صنعاء القديمة',
        type: 'urban',
        haras: [
          // القطاع الشرقي
          'غمدان', 'الخارجية', 'المفتون',
          // القطاع الجنوبي (باب اليمن)
          'باب اليمن', 'بحر رجرج', 'الجامع الكبير', 'محمود', 'معاذ', 'بروم',
          // الأسواق
          'سوق الملح', 'سوق البقر', 'سوق المخلاص', 'المصباغة', 'الميدان',
          // القطاع الشمالي
          'الفليحي', 'الطبري', 'الحرقان', 'الجلاء', 'العلمي', 'النهرين',
          'خضير', 'المدرسة', 'الطواشي', 'البكيرية', 'طلحة', 'الزمر',
          'القزالي', 'بستان السلطان'
        ]
      }
    ]
  },
  {
    id: 'other',
    name: 'أخرى',
    classification: 'urban',
    hasUzal: false,
    neighborhoods: [
      {
        id: 'other-area',
        name: 'منطقة أخرى',
        type: 'urban',
        haras: []
      }
    ]
  }
];

// دالة مساعدة للحصول على جميع الأحياء لمديرية معينة
export function getNeighborhoodsByDistrict(districtId: string): Neighborhood[] {
  const district = DISTRICTS.find(d => d.id === districtId);
  return district?.neighborhoods || [];
}

// دالة مساعدة للحصول على جميع الحارات لحي معين
export function getHarasByNeighborhood(districtId: string, neighborhoodId: string): string[] {
  const district = DISTRICTS.find(d => d.id === districtId);
  const neighborhood = district?.neighborhoods.find(n => n.id === neighborhoodId);
  
  if (neighborhood?.type === 'uzlah') {
    return neighborhood.villages || [];
  }
  
  return neighborhood?.haras || [];
}
