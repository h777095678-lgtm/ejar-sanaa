import { useState } from 'react';
import { X, SlidersHorizontal, Sun, Droplet, Zap, Home } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Slider } from '@/app/components/ui/slider';
import { Badge } from '@/app/components/ui/badge';
import { DISTRICTS } from '@/app/data/districts';

interface SmartFiltersProps {
  onClose?: () => void;
  onApply?: (filters: FilterState) => void;
}

export interface FilterState {
  district?: string;
  priceMin?: number;
  priceMax?: number;
  rooms?: number;
  hasSunlight?: boolean;
  waterIndependent?: boolean;
  electricityIndependent?: boolean;
  hasExternalMajlis?: boolean;
}

export function SmartFilters({ onClose, onApply }: SmartFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({});
  const [priceRange, setPriceRange] = useState([0, 500000]);

  const handleApply = () => {
    onApply?.({
      ...filters,
      priceMin: priceRange[0],
      priceMax: priceRange[1]
    });
    onClose?.();
  };

  const handleReset = () => {
    setFilters({});
    setPriceRange([0, 500000]);
  };

  const activeFiltersCount = Object.values(filters).filter(v => v !== undefined && v !== false).length;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center" dir="rtl">
      <Card className="w-full md:max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl md:rounded-2xl">
        {/* العنوان */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#A46960]" />
            <h2 className="text-xl font-bold">فلاتر البحث</h2>
            {activeFiltersCount > 0 && (
              <Badge className="bg-[#A46960]">{activeFiltersCount}</Badge>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* محتوى الفلاتر */}
        <div className="p-6 space-y-6">
          {/* المديرية */}
          <div className="space-y-2">
            <Label>المديرية</Label>
            <Select 
              value={filters.district} 
              onValueChange={(value) => setFilters({ ...filters, district: value })}
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

          {/* السعر */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>السعر الشهري</Label>
              <span className="text-sm text-gray-600">
                {priceRange[0].toLocaleString('ar-YE')} - {priceRange[1].toLocaleString('ar-YE')} ريال
              </span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={500000}
              step={10000}
              className="w-full"
            />
          </div>

          {/* عدد الغرف */}
          <div className="space-y-2">
            <Label>عدد الغرف</Label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map(num => (
                <Button
                  key={num}
                  variant={filters.rooms === num ? "default" : "outline"}
                  onClick={() => setFilters({ ...filters, rooms: num })}
                  className={filters.rooms === num ? "bg-[#A46960] hover:bg-[#8d5850]" : ""}
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>

          {/* الأسئلة الذكية */}
          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold text-[#2A1E1C] mb-4">ما الذي يهمك؟</h3>
            
            {/* دخول الشمس */}
            <button
              onClick={() => setFilters({ ...filters, hasSunlight: !filters.hasSunlight })}
              className={`w-full p-4 rounded-lg border-2 transition-all text-right ${
                filters.hasSunlight 
                  ? 'border-[#A46960] bg-amber-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  filters.hasSunlight ? 'bg-amber-100' : 'bg-gray-100'
                }`}>
                  <Sun className={`w-5 h-5 ${filters.hasSunlight ? 'text-amber-600' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">هل تبحث عن شمس وتدفئة؟</p>
                  <p className="text-sm text-gray-600">شقة مشمسة في الشتاء</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  filters.hasSunlight ? 'border-[#A46960] bg-[#A46960]' : 'border-gray-300'
                }`}>
                  {filters.hasSunlight && <div className="w-3 h-3 bg-white rounded-full" />}
                </div>
              </div>
            </button>

            {/* ماء مستقل */}
            <button
              onClick={() => setFilters({ ...filters, waterIndependent: !filters.waterIndependent })}
              className={`w-full p-4 rounded-lg border-2 transition-all text-right ${
                filters.waterIndependent 
                  ? 'border-[#A46960] bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  filters.waterIndependent ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Droplet className={`w-5 h-5 ${filters.waterIndependent ? 'text-blue-600' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">هل يهمك استقلالية الماء؟</p>
                  <p className="text-sm text-gray-600">خزان مستقل - لا مشاركة</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  filters.waterIndependent ? 'border-[#A46960] bg-[#A46960]' : 'border-gray-300'
                }`}>
                  {filters.waterIndependent && <div className="w-3 h-3 bg-white rounded-full" />}
                </div>
              </div>
            </button>

            {/* كهرباء مستقلة */}
            <button
              onClick={() => setFilters({ ...filters, electricityIndependent: !filters.electricityIndependent })}
              className={`w-full p-4 rounded-lg border-2 transition-all text-right ${
                filters.electricityIndependent 
                  ? 'border-[#A46960] bg-green-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  filters.electricityIndependent ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Zap className={`w-5 h-5 ${filters.electricityIndependent ? 'text-green-600' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">هل يهمك استقلالية الكهرباء؟</p>
                  <p className="text-sm text-gray-600">عداد منفصل - لا مشاركة</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  filters.electricityIndependent ? 'border-[#A46960] bg-[#A46960]' : 'border-gray-300'
                }`}>
                  {filters.electricityIndependent && <div className="w-3 h-3 bg-white rounded-full" />}
                </div>
              </div>
            </button>

            {/* مجلس خارجي */}
            <button
              onClick={() => setFilters({ ...filters, hasExternalMajlis: !filters.hasExternalMajlis })}
              className={`w-full p-4 rounded-lg border-2 transition-all text-right ${
                filters.hasExternalMajlis 
                  ? 'border-[#A46960] bg-purple-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  filters.hasExternalMajlis ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <Home className={`w-5 h-5 ${filters.hasExternalMajlis ? 'text-purple-600' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">هل تحتاج مجلس خارجي؟</p>
                  <p className="text-sm text-gray-600">للاستقبال والمقيل</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  filters.hasExternalMajlis ? 'border-[#A46960] bg-[#A46960]' : 'border-gray-300'
                }`}>
                  {filters.hasExternalMajlis && <div className="w-3 h-3 bg-white rounded-full" />}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* الأزرار السفلية */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="flex-1"
          >
            إعادة تعيين
          </Button>
          <Button 
            onClick={handleApply}
            className="flex-1 bg-[#A46960] hover:bg-[#8d5850]"
          >
            تطبيق الفلاتر
          </Button>
        </div>
      </Card>
    </div>
  );
}
