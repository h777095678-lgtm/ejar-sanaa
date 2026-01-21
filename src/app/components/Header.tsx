import React from "react";
import { Search, Bell, User, PlusCircle, Home } from "lucide-react";
import { motion } from "framer-motion";

export function Header({ onAddListing }: { onAddListing: () => void }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#A67C52] rounded-lg flex items-center justify-center text-white shadow-md">
            <Home size={24} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-[#5D4037] leading-none">إيجار صنعاء</h1>
            <p className="text-[10px] text-stone-500 font-medium">سكنك.. بلمسة صنعانية</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <button 
            onClick={onAddListing}
            className="flex items-center gap-2 bg-[#2D5A27] hover:bg-[#23471E] text-white px-4 py-2 rounded-full transition-all shadow-sm active:scale-95"
          >
            <PlusCircle size={20} />
            <span className="hidden sm:inline font-bold">أضف إعلانك</span>
          </button>
          
          <div className="flex items-center gap-4 text-stone-600">
            <button className="relative p-2 hover:bg-stone-100 rounded-full transition-colors">
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-stone-100 rounded-full transition-colors">
              <User size={22} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
