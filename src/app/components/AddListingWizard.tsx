import { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft,
  Home,
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
import { PROPERTY_TYPES, DISTRICTS, FLOORS, WATER_SOURCES, ELECTRICITY_SOURCES, SUN_DIRECTIONS } from '@/app/data/districts';
import { CategoryCard } from './CategoryCard';

interface AddListingWizardProps {
  onClose?: () => void;
}

export function AddListingWizard({ onClose }: AddListingWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: '',
    district: '',
    neighborhood: '',
    locationDescription: '',
    floor: '',
    rooms: 1,
    bathrooms: 1,
    kitchen: '',
    waterSource: '',
    electricitySource: '',
    sunDirection: '',
    price: '',
    phone: ''
  });

  const totalSteps = 5;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('تم إضافة الإعلان بنجاح! 🎉');
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto" dir="rtl">
      <div className="min-h-screen py-8 px-4">
        <Card className="max-w-2xl mx-auto bg-white">
          {/* الهيدر */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">إضافة إعلان جديد</h2>
              <span className="text-sm text-gray-500">خطوة {step} من {totalSteps}</span>
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
                      onClick={() => setFormData({ ...formData, propertyType: type.id })}
                      className={`cursor-pointer transition-all ${
                        formData.propertyType === type.id ? 'ring-2 ring-[#A46960]' : ''
                      }`}
                    >
                      <CategoryCard icon={type.icon} name={type.name} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* الخطوة 2: الموقع */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <MapPin className="w-12 h-12 text-[#A46960] mx-auto mb-2" />
                  <h3 className="text-2xl font-bold mb-2">أين يقع العقار؟</h3>
                  <p className="text-gray-600">حدد الموقع بدقة</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>المديرية *</Label>
                    <Select 
                      value={formData.district}
                      onValueChange={(value) => setFormData({ ...formData, district: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المديرية" />
                      </SelectTrigger>
                      <SelectContent>
                        {DISTRICTS.map(district => (
                          <SelectItem key={district.id} value={district.id}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>الحي / الحارة *</Label>
                    <Input 
                      placeholder="مثال: حدة العليا"
                      value={formData.neighborhood}
                      onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>وصف الموقع (اختياري)</Label>
                    <Textarea 
                      placeholder="مثال: قريب من جامعة صنعاء، بجانب مسجد الإيمان"
                      value={formData.locationDescription}
                      onChange={(e) => setFormData({ ...formData, locationDescription: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* الخطوة 3: التفاصيل */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <Home className="w-12 h-12 text-[#A46960] mx-auto mb-2" />
                  <h3 className="text-2xl font-bold mb-2">تفاصيل العقار</h3>
                  <p className="text-gray-600">أدخل المواصفات الأساسية</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>الدور</Label>
                    <Select 
                      value={formData.floor}
                      onValueChange={(value) => setFormData({ ...formData, floor: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الدور" />
                      </SelectTrigger>
                      <SelectContent>
                        {FLOORS.map(floor => (
                          <SelectItem key={floor.id} value={floor.id}>
                            {floor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>عدد الغرف</Label>
                    <Input 
                      type="number"
                      min="1"
                      value={formData.rooms}
                      onChange={(e) => setFormData({ ...formData, rooms: parseInt(e.target.value) })}
                    />
                  </div>

                  <div>
                    <Label>عدد الحمامات</Label>
                    <Input 
                      type="number"
                      min="1"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                    />
                  </div>

                  <div>
                    <Label>مقاس المطبخ (اختياري)</Label>
                    <Input 
                      placeholder="مثال: 3×4"
                      value={formData.kitchen}
                      onChange={(e) => setFormData({ ...formData, kitchen: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <Label>الخدمات</Label>
                  
                  <div>
                    <Label className="text-sm text-gray-600">مصدر المياه</Label>
                    <Select 
                      value={formData.waterSource}
                      onValueChange={(value) => setFormData({ ...formData, waterSource: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر مصدر المياه" />
                      </SelectTrigger>
                      <SelectContent>
                        {WATER_SOURCES.map(source => (
                          <SelectItem key={source.id} value={source.id}>
                            {source.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">مصدر الكهرباء</Label>
                    <Select 
                      value={formData.electricitySource}
                      onValueChange={(value) => setFormData({ ...formData, electricitySource: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر مصدر الكهرباء" />
                      </SelectTrigger>
                      <SelectContent>
                        {ELECTRICITY_SOURCES.map(source => (
                          <SelectItem key={source.id} value={source.id}>
                            {source.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">اتجاه الشمس</Label>
                    <Select 
                      value={formData.sunDirection}
                      onValueChange={(value) => setFormData({ ...formData, sunDirection: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر اتجاه الشمس" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUN_DIRECTIONS.map(dir => (
                          <SelectItem key={dir.id} value={dir.id}>
                            {dir.emoji} {dir.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* الخطوة 4: الصور */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <Camera className="w-12 h-12 text-[#A46960] mx-auto mb-2" />
                  <h3 className="text-2xl font-bold mb-2">أضف صور العقار</h3>
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
                    <li>• صور جميع الغرف بوضوح</li>
                    <li>• اهتم بإضاءة جيدة</li>
                    <li>• صور المطبخ والحمام</li>
                    <li>• صور المجلس الخارجي إن وُجد</li>
                  </ul>
                </div>
              </div>
            )}

            {/* الخطوة 5: السعر والتواصل */}
            {step === 5 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <DollarSign className="w-12 h-12 text-[#A46960] mx-auto mb-2" />
                  <h3 className="text-2xl font-bold mb-2">السعر ومعلومات التواصل</h3>
                  <p className="text-gray-600">آخر خطوة!</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>الإيجار الشهري (بالريال) *</Label>
                    <Input 
                      type="number"
                      placeholder="مثال: 120000"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>رقم الهاتف *</Label>
                    <Input 
                      type="tel"
                      placeholder="مثال: 777123456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
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
                  (step === 1 && !formData.propertyType) ||
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
