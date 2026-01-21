import React from "react";
import { MapPin, Sun, Droplets, Zap, UserCheck, Share2, Heart } from "lucide-react";
import { motion } from "framer-motion";

export function PropertyCard({ property, onClick }: { property: any, onClick: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-stone-100 group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-stone-600 hover:text-red-500 transition-colors shadow-sm">
            <Heart size={18} />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-stone-600 hover:text-blue-500 transition-colors shadow-sm">
            <Share2 size={18} />
          </button>
        </div>
        <div className="absolute bottom-3 right-3 bg-[#A67C52] text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
          {property.advertiser.type === "owner" ? "من المالك مباشرة" : "مكتب عقاري"}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-stone-800 line-clamp-1">{property.title}</h3>
          <div className="text-left">
            <span className="text-xl font-black text-[#2D5A27]">{property.price.toLocaleString()}</span>
            <span className="text-[10px] text-stone-500 block">ريال / شهرياً</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-stone-500 text-xs mb-4">
          <MapPin size={14} />
          <span>{property.district} - {property.neighborhood}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 py-3 border-t border-stone-50">
          <div className="flex flex-col items-center gap-1 text-stone-500">
            <Sun size={16} className={property.details.sunlight ? "text-orange-400" : "text-stone-300"} />
            <span className="text-[10px] font-bold">شمس</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-stone-500">
            <Droplets size={16} className={property.details.water_tank ? "text-blue-400" : "text-stone-300"} />
            <span className="text-[10px] font-bold">خزان</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-stone-500">
            <Zap size={16} className={property.details.electricity ? "text-yellow-400" : "text-stone-300"} />
            <span className="text-[10px] font-bold">كهرباء</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-stone-100 rounded-full flex items-center justify-center text-[10px] font-bold text-stone-600 border border-stone-200">
              {property.advertiser.name[0]}
            </div>
            <span className="text-xs text-stone-600 font-medium">{property.advertiser.name}</span>
          </div>
          <span className="text-[10px] text-stone-400 font-medium">{property.date}</span>
        </div>
      </div>
    </motion.div>
  );
}
