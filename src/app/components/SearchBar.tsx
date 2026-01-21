import React from "react";
import { Search, MapPin, SlidersHorizontal, X } from "lucide-react";
import { DISTRICTS } from "@/app/data/sana-data";
import { motion, AnimatePresence } from "framer-motion";

export function SearchBar({ onSearch, onToggleFilters, showFilters }: any) {
  return (
    <div className="relative max-w-4xl mx-auto -mt-6 px-4">
      <div className="bg-white p-2 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-xl">
          <Search size={20} className="text-stone-400" />
          <input 
            type="text" 
            placeholder="ابحث عن حي، مديرية، أو كلمة دلالية..." 
            className="w-full bg-transparent border-none outline-none text-sm font-medium placeholder:text-stone-400 py-1"
          />
        </div>
        
        <button 
          onClick={onToggleFilters}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
            showFilters ? "bg-[#A67C52] text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"
          }`}
        >
          {showFilters ? <X size={18} /> : <SlidersHorizontal size={18} />}
          <span className="hidden sm:inline">فلترة متقدمة</span>
        </button>

        <button className="bg-[#2D5A27] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#23471E] transition-all shadow-md active:scale-95">
          بحث
        </button>
      </div>
    </div>
  );
}
