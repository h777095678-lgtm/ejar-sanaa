import React from "react";
import * as Icons from "lucide-react";
import { CATEGORIES } from "@/app/data/sana-data";
import { motion } from "framer-motion";

export function CategoryNav({ activeId, onSelect }: { activeId: string, onSelect: (id: string) => void }) {
  return (
    <div className="bg-white border-b border-stone-100 overflow-x-auto no-scrollbar py-4 px-4">
      <div className="max-w-7xl mx-auto flex gap-4 min-w-max">
        {CATEGORIES.map((cat) => {
          const Icon = (Icons as any)[cat.icon] || Icons.HelpCircle;
          const isActive = activeId === cat.id;

          return (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(cat.id)}
              className={`flex flex-col items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                isActive 
                ? "text-[#A67C52] bg-[#A67C52]/10 ring-1 ring-[#A67C52]/20" 
                : "text-stone-500 hover:text-stone-800 hover:bg-stone-50"
              }`}
            >
              <div className={`p-2 rounded-lg ${isActive ? "bg-[#A67C52] text-white" : "bg-stone-100 text-stone-500"}`}>
                <Icon size={24} />
              </div>
              <span className="text-xs font-bold whitespace-nowrap">{cat.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
