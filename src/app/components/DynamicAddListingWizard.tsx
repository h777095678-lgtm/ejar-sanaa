import { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft,
  MapPin,
  Camera,
  DollarSign,
  Check
} from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Textarea } from '@/app/components/ui/textarea';
import { Switch } from '@/app/components/ui/switch';
import { CategoryCard } from './CategoryCard';
import { PROPERTY_TYPES, getPropertyTypeById } from '@/app/data/propertyTypes';
import { DISTRICTS, getNeighborhoodsByDistrict, getHarasByNeighborhood } from '@/app/data/districts';
import type { PropertyType, FieldDefinition } from '@/app/data/propertySchemas';
import { getFieldsForPropertyType } from '@/app/data/propertySchemas';

interface DynamicAddListingWizardProps {
  onClose?: () => void;
}

export function DynamicAddListingWizard({ onClose }: DynamicAddListingWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<PropertyType | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  
  const totalSteps = 5;
  const typeInfo = selectedType ? getPropertyTypeById(selectedType) : null;
  const fields = selectedType ? getFieldsForPropertyType(selectedType) : [];
  
  // الحقول الأساسية (الموقع)
  const locationFields = fields.filter(f => 
    ['district', 'neighborhood', 'hara', 'locationDescription'].includes(f.name)
  );
  
  // الحقول التفصيلية (كل ما عدا الموقع والسعر والتواصل)
  const detailFields = fields.filter(f => 
    !['district', 'neighborhood', 'hara', 'locationDescription', 'price', 'negotiable', 'phone', 'sellerType'].includes(f.name)
  );
  
  // الحقول المالية والتواصل
  const financialFields = fields.filter(f => 
    ['price', 'negotiable', 'deposit', 'advance', 'commission', 'guarantee', 'priceInclusive'].includes(f.name)
  );

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', { type: selectedType, data: formData });
    alert(`تم إضافة إعلان ${typeInfo?.name} بنجاح! 🎉`);
    onClose?.();
  };

  const updateFormData = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const renderField = (field: FieldDefinition) => {
    const value = formData[field.name];

    switch (field.type) {
      case 'text':
        return (
          <div key={field.name} className="space-y-2">
            <Label>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              value={value || ''}
              onChange={(e) => updateFormData(field.name, e.target.value)}
              placeholder={field.placeholder}
            />
            {field.description && (
              <p className="text-sm text-gray-500">{field.description}</p>
            )}
          </div>
        );

      case 'number':
        return (
          <div key={field.name} className="space-y-2">
            <Label>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              type="number"
              value={value || ''}
              onChange={(e) => updateFormData(field.name, parseInt(e.target.value) || 0)}
              placeholder={field.placeholder}
            />
            {field.description && (
              <p className="text-sm text-gray-500">{field.description}</p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} className="space-y-2">
            <Label>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              value={value || ''}
              onChange={(e) => updateFormData(field.name, e.target.value)}
              placeholder={field.placeholder}
              rows={3}
            />
            {field.description && (
              <p className="text-sm text-gray-500">{field.description}</p>
            )}
          </div>
        );

      case 'select':
        // معالجة خاصة للحي (يعتمد على المديرية)
        if (field.name === 'neighborhood') {
          const district = formData.district;
          const neighborhoods = district ? getNeighborhoodsByDistrict(district) : [];
          
          return (
            <div key={field.name} className="space-y-2">
              <Label>
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Select
                value={value || ''}
                onValueChange={(val) => {
                  updateFormData(field.name, val);
                  // إعادة تعيين الحارة عند تغيير الحي
                  updateFormData('hara', '');
                }}
                disabled={!district}
              >
                <SelectTrigger>
                  <SelectValue placeholder={district ? "اختر الحي" : "اختر المديرية أولاً"} />
                </SelectTrigger>
                <SelectContent>
                  {neighborhoods.map(n => (
                    <SelectItem key={n.id} value={n.id}>
                      {n.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        }
        
        // معالجة خاصة للحارة (تعتمد على الحي)
        if (field.name === 'hara') {
          const district = formData.district;
          const neighborhood = formData.neighborhood;
          const haras = (district && neighborhood) ? getHarasByNeighborhood(district, neighborhood) : [];
          
          if (haras.length === 0) return null;
          
          return (
            <div key={field.name} className="space-y-2">
              <Label>
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Select
                value={value || ''}
                onValueChange={(val) => updateFormData(field.name, val)}
                disabled={!neighborhood}
              >
                <SelectTrigger>
                  <SelectValue placeholder={neighborhood ? "اختر الحارة" : "اختر الحي أولاً"} />
                </SelectTrigger>
                <SelectContent>
                  {haras.map((h, idx) => (
                    <SelectItem key={idx} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
          );
        }
        
        // معالجة خاصة للمديرية
        if (field.name === 'district') {
          return (
            <div key={field.name} className="space-y-2">
              <Label>
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Select
                value={value || ''}
                onValueChange={(val) => {
                  updateFormData(field.name, val);
                  // إعادة تعيين الحي والحارة عند تغيير المديرية
                  updateFormData('neighborhood', '');
                  updateFormData('hara', '');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر المديرية" />
                </SelectTrigger>
                <SelectContent>
                  {DISTRICTS.map(d => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        }
        
        // Select عادي
        return (
          <div key={field.name} className="space-y-2">
            <Label>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Select
              value={value || ''}
              onValueChange={(val) => updateFormData(field.name, val)}
            >
              <SelectTrigger>
                <SelectValue placeholder={field.placeholder || `اختر ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.description && (
              <p className="text-sm text-gray-500">{field.description}</p>
            )}
          </div>
        );

      case 'boolean':
        return (
          <div key={field.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <Label className="text-base">{field.label}</Label>
              {field.description && (
                <p className="text-sm text-gray-500 mt-1">{field.description}</p>
              )}
            </div>
            <Switch
              checked={value || false}
              onCheckedChange={(checked) => updateFormData(field.name, checked)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto" dir="rtl">
      <div className="min-h-screen py-8 px-4">
        <Card className="max-w-2xl mx-auto bg-white">
          {/* الهيدر */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">إضافة إعلان جديد</h2>
              <span className="text-sm text-gray-500">خطوة {step} من {totalSteps}</span>
              {typeInfo && (
                <Badge className="bg-[#A46960]">{typeInfo.name}</Badge>
              )}
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* مؤشر التقدم */}
          <div className="px-6 pt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#A46960] transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* محتوى الخطوات */}
          <div className="p-6 min-h-[500px]">
            {/* الخطوة 1: نوع العقار */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">ماذا تريد أن تؤجر؟</h3>
                  <p className="text-gray-600">اختر نوع العقار أو الخدمة</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {PROPERTY_TYPES.map((type) => (
                    <div 
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`cursor-pointer transition-all ${
                        selectedType === type.id ? 'ring-2 ring-[#A46960]' : ''
                      }`}
                    >
                      <CategoryCard icon={type.icon} name={type.name} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* الخطوة 2: الموقع */}
            {step === 2 && selectedType && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <MapPin className="w-12 h-12 text-[#A46960] mx-auto mb-2" />
                  <h3 className="text-2xl font-bold mb-2">أين يقع {typeInfo?.name}؟</h3>
                  <p className="text-gray-600">حدد الموقع بدقة</p>
                </div>

                <div className="space-y-4">
                  {locationFields.map(field => renderField(field))}
                </div>
              </div>
            )}

            {/* الخطوة 3: التفاصيل */}
            {step === 3 && selectedType && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">تفاصيل {typeInfo?.name}</h3>
                  <p className="text-gray-600">أدخل المواصفات الأساسية</p>
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {detailFields.map(field => renderField(field))}
                </div>
              </div>
            )}

            {/* الخطوة 4: الصور */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <Camera className="w-12 h-12 text-[#A46960] mx-auto mb-2" />
                  <h3 className="text-2xl font-bold mb-2">أضف صور {typeInfo?.name}</h3>
                  <p className="text-gray-600">صور واضحة تساعد في جذب المستأجرين</p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-[#A46960] transition-colors cursor-pointer">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">اضغط لإضافة صور</p>
                  <p className="text-sm text-gray-500">يفضل 3-5 صور على الأقل</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">💡 نصائح للتصوير:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• صور واضحة بإضاءة جيدة</li>
                    <li>• اعرض جميع الجوانب المهمة</li>
                    <li>• تجنب الصور الضبابية</li>
                  </ul>
                </div>
              </div>
            )}

            {/* الخطوة 5: السعر والتواصل */}
            {step === 5 && selectedType && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <DollarSign className="w-12 h-12 text-[#A46960] mx-auto mb-2" />
                  <h3 className="text-2xl font-bold mb-2">السعر ومعلومات التواصل</h3>
                  <p className="text-gray-600">آخر خطوة!</p>
                </div>

                <div className="space-y-4">
                  {financialFields.map(field => renderField(field))}
                  
                  {/* رقم الهاتف */}
                  <div className="space-y-2">
                    <Label>رقم الهاتف <span className="text-red-500">*</span></Label>
                    <Input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      placeholder="مثال: 777123456"
                    />
                  </div>
                  
                  {/* صفة المعلن */}
                  <div className="space-y-2">
                    <Label>صفة المعلن</Label>
                    <Select
                      value={formData.sellerType || ''}
                      onValueChange={(val) => updateFormData('sellerType', val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر صفة المعلن" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">مالك</SelectItem>
                        <SelectItem value="agent">وكيل</SelectItem>
                        <SelectItem value="broker">دلال</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-900 mb-1">جاهز للنشر!</h4>
                        <p className="text-sm text-green-800">
                          سيتم مراجعة إعلانك ونشره خلال ساعات قليلة
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* الأزرار السفلية */}
          <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-3 rounded-b-2xl">
            {step > 1 && (
              <Button 
                variant="outline" 
                onClick={prevStep}
                className="flex-1"
              >
                <ChevronRight className="w-4 h-4 ml-2" />
                السابق
              </Button>
            )}
            
            {step < totalSteps ? (
              <Button 
                onClick={nextStep}
                className="flex-1 bg-[#A46960] hover:bg-[#8d5850]"
                disabled={
                  (step === 1 && !selectedType) ||
                  (step === 2 && (!formData.district || !formData.neighborhood))
                }
              >
                التالي
                <ChevronLeft className="w-4 h-4 mr-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                className="flex-1 bg-[#227A62] hover:bg-[#1a6150]"
                disabled={!formData.price || !formData.phone}
              >
                <Check className="w-4 h-4 ml-2" />
                نشر الإعلان
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

// Import Badge component
import { Badge } from '@/app/components/ui/badge';
