# 🛠️ دليل المطور - إيجار صنعاء

## 🏗️ البنية المعمارية

### النظام الديناميكي (Dynamic System)

التطبيق مبني على مبدأ **Schema-Driven Architecture** حيث:
- كل نوع عقار له `schema` خاص به
- الواجهات تتولد تلقائياً من ال`schema`
- الفلاتر تتكيف حسب النوع
- البطاقات تعرض الحقول المناسبة فقط

---

## 📁 هيكل الملفات

```
src/app/
├── data/
│   ├── districts.ts          # البيانات الجغرافية
│   ├── propertyTypes.ts      # تعريف أنواع العقارات
│   └── propertySchemas.ts    # الحقول لكل نوع (القلب النابض!)
│
├── components/
│   ├── DynamicPropertyCard.tsx       # عرض العقار
│   ├── DynamicAddListingWizard.tsx   # إضافة إعلان
│   ├── SmartFilters.tsx              # الفلاتر
│   ├── PropertyDetails.tsx           # صفحة التفاصيل
│   └── CategoryCard.tsx              # بطاقة فئة
│
└── App.tsx                            # الصفحة الرئيسية
```

---

## 🔑 المفاهيم الأساسية

### 1. FieldDefinition
```typescript
interface FieldDefinition {
  name: string;                 // اسم الحقل في البيانات
  label: string;                // التسمية المعروضة
  type: 'text' | 'number' | 'select' | 'boolean' | 'textarea';
  required: boolean;            // إجباري؟
  options?: Array<{value, label}>;  // للselect
  showInCard?: boolean;         // هل يظهر في البطاقة؟
  showInFilters?: boolean;      // هل يظهر في الفلاتر؟
  icon?: string;                // أيقونة اختيارية
}
```

### 2. PropertyType
```typescript
type PropertyType = 
  | 'apartment' 
  | 'villa' 
  | 'shop' 
  | 'wedding-hall'
  // ... إلخ
```

### 3. PropertySchema
```typescript
export const PROPERTY_SCHEMAS: Record<PropertyType, FieldDefinition[]> = {
  'apartment': APARTMENT_FIELDS,
  'villa': VILLA_FIELDS,
  // ...
};
```

---

## 🆕 كيفية إضافة نوع عقار جديد

### الخطوات (5 دقائق فقط!)

#### 1️⃣ أضف النوع في `propertyTypes.ts`
```typescript
export const PROPERTY_TYPES: PropertyTypeDefinition[] = [
  // ... existing types
  {
    id: 'warehouse',              // معرف فريد
    name: 'مستودع',               // الاسم بالعربي
    icon: 'warehouse',            // اسم الأيقونة من lucide-react
    description: 'مستودعات للتخزين',
    category: 'real-estate',
    enabled: true
  }
];
```

#### 2️⃣ أضف النوع في `PropertyType`
```typescript
// في propertySchemas.ts
export type PropertyType = 
  | 'apartment'
  | 'villa'
  // ...
  | 'warehouse'    // ← أضف هنا
  | 'other';
```

#### 3️⃣ أنشئ حقول المستودع
```typescript
// في propertySchemas.ts
export const WAREHOUSE_FIELDS: FieldDefinition[] = [
  {
    name: 'area',
    label: 'المساحة (متر مربع)',
    type: 'number',
    required: true,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'hasLoading',
    label: 'يوجد رصيف تحميل',
    type: 'boolean',
    required: false,
    showInCard: true,
    showInFilters: true
  },
  {
    name: 'hasSecurity',
    label: 'يوجد حراسة',
    type: 'boolean',
    required: false,
    showInCard: false,
    showInFilters: true
  }
  // أضف المزيد حسب الحاجة...
];
```

#### 4️⃣ سجل الحقول
```typescript
export const PROPERTY_SCHEMAS: Record<PropertyType, FieldDefinition[]> = {
  'apartment': APARTMENT_FIELDS,
  'villa': VILLA_FIELDS,
  // ...
  'warehouse': WAREHOUSE_FIELDS,  // ← سجل هنا
  'other': []
};
```

#### 5️⃣ (اختياري) أضف معالجة خاصة في البطاقة
```typescript
// في DynamicPropertyCard.tsx
{propertyType === 'warehouse' && (
  <>
    {data.hasLoading && (
      <Badge>🚚 رصيف تحميل</Badge>
    )}
  </>
)}
```

✅ **انتهى!** التطبيق سيتعرف تلقائياً على النوع الجديد!

---

## 🗺️ إضافة منطقة جديدة

### في `districts.ts`

```typescript
{
  id: 'new-district',
  name: 'مديرية جديدة',
  classification: 'urban',
  hasUzal: false,
  neighborhoods: [
    {
      id: 'neighborhood-1',
      name: 'الحي الأول',
      type: 'urban',
      haras: ['الحارة 1', 'الحارة 2', 'الحارة 3']
    }
  ]
}
```

---

## 🎨 تخصيص الألوان

### في `theme.css`
```css
:root {
  --yajour-brick: #A46960;     /* اللون الأساسي */
  --gypsum-white: #FAFAFA;     /* الخلفية */
  --qamariya-blue: #1385A7;    /* الثانوي */
  --basalt-dark: #2A1E1C;      /* النصوص */
  --farm-green: #227A62;       /* النجاح */
}
```

---

## 🔍 فهم آلية العمل

### 1. عند اختيار نوع عقار

```typescript
// المستخدم يختار "villa"
selectedType = 'villa'

// التطبيق يجلب الحقول تلقائياً
const fields = getFieldsForPropertyType('villa')
// يرجع: COMMON_FIELDS + VILLA_FIELDS

// يعرض فقط الحقول التي showInFilters = true
const filterFields = fields.filter(f => f.showInFilters)
```

### 2. عند عرض البطاقة

```typescript
// التطبيق يجلب الحقول للبطاقة
const cardFields = getCardFields('villa')
// يرجع فقط الحقول التي showInCard = true

// يعرضها ديناميكياً
cardFields.map(field => {
  const value = data[field.name]
  return <div>{field.label}: {value}</div>
})
```

### 3. عند إضافة إعلان

```typescript
// Wizard يعرض الحقول خطوة بخطوة
// الخطوة 1: نوع العقار
// الخطوة 2: الموقع (الحقول المشتركة)
// الخطوة 3: التفاصيل (الحقول الخاصة بالنوع)
// الخطوة 4: الصور
// الخطوة 5: السعر والتواصل
```

---

## 🧪 البيانات الوهمية (Mock Data)

### إضافة بيانات تجريبية

```typescript
const mockProperties = [
  {
    id: '1',
    propertyType: 'warehouse' as const,  // ← النوع الجديد
    image: 'https://...',
    data: {
      // الحقول المشتركة
      district: 'السبعين',
      neighborhood: 'حدة',
      price: 500000,
      negotiable: true,
      
      // الحقول الخاصة بالمستودع
      area: 500,
      hasLoading: true,
      hasSecurity: true
    }
  }
];
```

---

## 🐛 التعامل مع الأخطاء الشائعة

### 1. "Cannot find name 'warehouse'"
❌ نسيت إضافة النوع في `PropertyType`

✅ أضفه في `propertySchemas.ts`:
```typescript
export type PropertyType = 
  | 'apartment'
  | 'warehouse'  // ← أضف هنا
```

### 2. الحقول لا تظهر في الفلاتر
❌ `showInFilters: false`

✅ غيّرها إلى `true`:
```typescript
{
  name: 'area',
  showInFilters: true  // ← هنا
}
```

### 3. البيانات لا تظهر في البطاقة
❌ `showInCard: false` أو الحقل غير موجود في `data`

✅ تأكد:
```typescript
{
  name: 'area',
  showInCard: true  // 1. اجعلها true
}

data: {
  area: 500  // 2. تأكد أن القيمة موجودة
}
```

---

## 📊 تحليل الأداء

### الحقول المعروضة
- **البطاقة**: أول 4 حقول فقط (لسرعة العرض)
- **التفاصيل**: جميع الحقول
- **الفلاتر**: الحقول المحددة بـ `showInFilters`

### تحسين الأداء
```typescript
// ✅ جيد - عرض 4 حقول فقط
cardFields.slice(0, 4).map(...)

// ❌ سيء - عرض كل الحقول
cardFields.map(...)
```

---

## 🔐 التحقق من البيانات

### في المستقبل (Backend)
```typescript
// Validation Schema
const apartmentSchema = z.object({
  district: z.string(),
  neighborhood: z.string(),
  price: z.number().min(1000),
  rooms: z.number().min(1).max(20),
  // ...
});
```

---

## 📱 الاستجابة (Responsive)

التطبيق responsive تلقائياً:
```typescript
// في Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  // 1 عمود موبايل
  // 2 أعمدة تابلت
  // 3 أعمدة ديسكتوب
</div>
```

---

## 🚀 النشر (Deployment)

```bash
# بناء التطبيق
npm run build

# النتيجة في dist/
# جاهزة للنشر على أي hosting
```

---

## 💡 نصائح احترافية

### 1. استخدم TypeScript
```typescript
// ✅ Good
const data: Record<string, any> = {}

// ❌ Bad  
const data = {}
```

### 2. اتبع التسمية
```typescript
// للحقول: camelCase
{name: 'hasGarden'}

// للمكونات: PascalCase
<DynamicPropertyCard />
```

### 3. التعليقات بالعربي
```typescript
// جلب الحقول للعرض في البطاقة
const cardFields = getCardFields(type)
```

---

## 📞 الدعم

للأسئلة والاستفسارات، راجع:
- `README_FULL.md` - الدليل الشامل
- `ABOUT_AR.md` - عن التطبيق
- الكود مُعلّق بشكل واضح

---

**Happy Coding!** 🚀 جعلناها سهلة عليك قدر الإمكان!
