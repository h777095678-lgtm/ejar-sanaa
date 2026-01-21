// أنواع العقارات المدعومة في التطبيق
import type { PropertyType } from './propertySchemas';

export interface PropertyTypeDefinition {
  id: PropertyType;
  name: string;
  icon: string;
  description: string;
  category: 'real-estate' | 'vehicles' | 'services' | 'other';
  enabled: boolean; // للتحكم في التوسع التدريجي
}

export const PROPERTY_TYPES: PropertyTypeDefinition[] = [
  // عقارات سكنية
  {
    id: 'apartment',
    name: 'شقة',
    icon: 'building',
    description: 'شقق سكنية للإيجار',
    category: 'real-estate',
    enabled: true
  },
  {
    id: 'villa',
    name: 'فيلا',
    icon: 'home',
    description: 'فلل وبيوت مستقلة',
    category: 'real-estate',
    enabled: true
  },
  {
    id: 'building',
    name: 'عمارة',
    icon: 'building-2',
    description: 'عمائر كاملة للإيجار',
    category: 'real-estate',
    enabled: true
  },
  
  // عقارات تجارية
  {
    id: 'shop',
    name: 'محل تجاري',
    icon: 'store',
    description: 'محلات ومتاجر',
    category: 'real-estate',
    enabled: true
  },
  {
    id: 'office',
    name: 'مكتب',
    icon: 'briefcase',
    description: 'مكاتب إدارية',
    category: 'real-estate',
    enabled: true
  },
  {
    id: 'basement',
    name: 'بدروم',
    icon: 'warehouse',
    description: 'بدروم للتخزين أو الاستخدام',
    category: 'real-estate',
    enabled: true
  },
  
  // خدمات ومناسبات
  {
    id: 'wedding-hall',
    name: 'صالة أعراس',
    icon: 'church',
    description: 'صالات أعراس ومناسبات',
    category: 'services',
    enabled: true
  },
  {
    id: 'hotel-room',
    name: 'غرفة فندق',
    icon: 'bed',
    description: 'غرف فندقية',
    category: 'services',
    enabled: true
  },
  {
    id: 'hotel-apartment',
    name: 'شقة فندقية',
    icon: 'hotel',
    description: 'شقق فندقية',
    category: 'services',
    enabled: true
  },
  
  // أراضي
  {
    id: 'land',
    name: 'قطعة أرض / حوش',
    icon: 'square',
    description: 'أراضي وأحواش',
    category: 'real-estate',
    enabled: true
  },
  
  // مركبات
  {
    id: 'car',
    name: 'سيارة',
    icon: 'car',
    description: 'سيارات للإيجار',
    category: 'vehicles',
    enabled: true
  },
  {
    id: 'motorcycle',
    name: 'دراجة نارية',
    icon: 'bike',
    description: 'دراجات نارية',
    category: 'vehicles',
    enabled: true
  },
  
  // أخرى
  {
    id: 'stall',
    name: 'بسطة',
    icon: 'shopping-bag',
    description: 'بسطات في الأسواق',
    category: 'other',
    enabled: true
  },
  {
    id: 'other',
    name: 'أخرى',
    icon: 'more-horizontal',
    description: 'أنواع أخرى',
    category: 'other',
    enabled: true
  }
];

// الحصول على أنواع العقارات المفعلة فقط
export function getEnabledPropertyTypes(): PropertyTypeDefinition[] {
  return PROPERTY_TYPES.filter(type => type.enabled);
}

// الحصول على أنواع حسب الفئة
export function getPropertyTypesByCategory(category: PropertyTypeDefinition['category']): PropertyTypeDefinition[] {
  return PROPERTY_TYPES.filter(type => type.category === category && type.enabled);
}

// الحصول على نوع عقار بواسطة ID
export function getPropertyTypeById(id: PropertyType): PropertyTypeDefinition | undefined {
  return PROPERTY_TYPES.find(type => type.id === id);
}
