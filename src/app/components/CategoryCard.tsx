import { 
  Building2, 
  Home, 
  Store, 
  Warehouse, 
  Church, 
  Square, 
  Car, 
  Bike, 
  ShoppingBag, 
  MoreHorizontal,
  LucideIcon
} from 'lucide-react';
import { Card } from '@/app/components/ui/card';

interface CategoryCardProps {
  icon: string;
  name: string;
  count?: number;
  onClick?: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  'building': Building2,
  'building-2': Building2,
  'home': Home,
  'store': Store,
  'warehouse': Warehouse,
  'church': Church,
  'square': Square,
  'car': Car,
  'bike': Bike,
  'shopping-bag': ShoppingBag,
  'more-horizontal': MoreHorizontal,
};

export function CategoryCard({ icon, name, count, onClick }: CategoryCardProps) {
  const Icon = iconMap[icon] || Home;
  
  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-md hover:border-[#A46960] transition-all bg-white group"
      onClick={onClick}
      dir="rtl"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-14 h-14 rounded-full bg-[#A46960]/10 flex items-center justify-center group-hover:bg-[#A46960] transition-colors">
          <Icon className="w-7 h-7 text-[#A46960] group-hover:text-white transition-colors" />
        </div>
        <div>
          <h3 className="font-semibold text-[#2A1E1C]">{name}</h3>
          {count !== undefined && (
            <p className="text-sm text-gray-500 mt-1">{count} إعلان</p>
          )}
        </div>
      </div>
    </Card>
  );
}
