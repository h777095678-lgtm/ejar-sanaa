import { Heart } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { useState } from 'react';
import type { PropertyType } from '@/app/data/propertySchemas';
import { getCardFields } from '@/app/data/propertySchemas';
import { getPropertyTypeById } from '@/app/data/propertyTypes';

interface DynamicPropertyCardProps {
  id: string;
  propertyType: PropertyType;
  image: string;
  data: Record<string, any>; // البيانات الديناميكية
  onClick?: () => void;
}

export function DynamicPropertyCard({
  image,
  propertyType,
  data,
  onClick
}: DynamicPropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const typeInfo = getPropertyTypeById(propertyType);
  const cardFields = getCardFields(propertyType);

  // استخراج البيانات الأساسية
  const district = data.district || '-';
  const neighborhood = data.neighborhood || '-';
  const price = data.price || 0;
  const negotiable = data.negotiable || false;

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow bg-white"
      onClick={onClick}
      dir="rtl"
    >
      {/* صورة العقار */}
      <div className="relative h-48 bg-gray-200">
        <img 
          src={image} 
          alt={`${typeInfo?.name} - ${district}`}
          className="w-full h-full object-cover"
        />
        
        {/* نوع العقار */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-[#A46960] text-white">
            {typeInfo?.name}
          </Badge>
        </div>
        
        {/* زر المفضلة */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
      </div>

      {/* محتوى البطاقة */}
      <div className="p-4 space-y-3">
        {/* الموقع */}
        <div>
          <p className="font-semibold text-[#2A1E1C]">{district}</p>
          <p className="text-sm text-gray-600">{neighborhood}</p>
        </div>

        {/* السعر */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-[#A46960]">
            {price.toLocaleString('ar-YE')}
          </span>
          <span className="text-sm text-gray-600">ريال</span>
          {negotiable && (
            <Badge variant="outline" className="text-xs mr-auto">قابل للتفاوض</Badge>
          )}
        </div>

        {/* المعلومات الديناميكية */}
        <div className="space-y-2">
          {/* عرض أول 3-4 حقول مهمة */}
          {cardFields.slice(0, 4).map((field) => {
            const value = data[field.name];
            if (!value && value !== 0 && value !== false) return null;

            // التعامل مع أنواع مختلفة من القيم
            let displayValue: string | number = '';
            
            if (field.type === 'boolean') {
              if (!value) return null;
              displayValue = '✓';
            } else if (field.type === 'select' && field.options) {
              const option = field.options.find(opt => opt.value === value);
              displayValue = option?.label || value;
            } else {
              displayValue = value;
            }

            return (
              <div key={field.name} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{field.label}:</span>
                <span className="font-medium text-[#2A1E1C]">{displayValue}</span>
              </div>
            );
          })}
        </div>

        {/* Badges للمميزات */}
        <div className="flex flex-wrap gap-1.5">
          {/* شقق - عرض المميزات */}
          {propertyType === 'apartment' && (
            <>
              {data.hasSunlight && (
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-0 text-xs">
                  ☀️ مشمس
                </Badge>
              )}
              {data.waterSource === 'tank-independent' && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0 text-xs">
                  💧 ماء مستقل
                </Badge>
              )}
              {data.electricityIndependent === 'independent' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-0 text-xs">
                  ⚡ كهرباء مستقلة
                </Badge>
              )}
              {data.externalMajlis !== 'no' && data.externalMajlis && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-0 text-xs">
                  مجلس خارجي
                </Badge>
              )}
            </>
          )}
          
          {/* فلل - عرض المميزات */}
          {propertyType === 'villa' && (
            <>
              {data.furnished === 'yes' && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-0 text-xs">
                  🛋️ مفروشة
                </Badge>
              )}
              {data.hasGarden && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-0 text-xs">
                  🌳 حديقة
                </Badge>
              )}
              {data.hasParking && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-800 border-0 text-xs">
                  🚗 موقف
                </Badge>
              )}
            </>
          )}
          
          {/* صالات أعراس */}
          {propertyType === 'wedding-hall' && (
            <>
              {data.hasKosha && (
                <Badge variant="secondary" className="bg-pink-100 text-pink-800 border-0 text-xs">
                  ✨ كوشة
                </Badge>
              )}
              {data.hasInsects === false && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-0 text-xs">
                  ✓ خالية من الحشرات
                </Badge>
              )}
            </>
          )}
          
          {/* محلات تجارية */}
          {propertyType === 'shop' && (
            <>
              {data.streetType === 'main' && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0 text-xs">
                  شارع رئيسي
                </Badge>
              )}
              {data.hasStorage && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-800 border-0 text-xs">
                  📦 مستودع
                </Badge>
              )}
            </>
          )}
          
          {/* فنادق */}
          {(propertyType === 'hotel-room' || propertyType === 'hotel-apartment') && (
            <>
              {data.hasHotWater && (
                <Badge variant="secondary" className="bg-red-100 text-red-800 border-0 text-xs">
                  🔥 ماء ساخن
                </Badge>
              )}
              {data.hasInternet && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0 text-xs">
                  📶 إنترنت
                </Badge>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
