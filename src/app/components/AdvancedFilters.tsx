import React from "react";
import { DISTRICTS } from "@/app/data/sana-data";
import { motion } from "framer-motion";

export function AdvancedFilters({ onClose }: { onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="max-w-4xl mx-auto mt-4 px-4 overflow-hidden"
    >
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-stone-100 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-xs font-black text-stone-500 mb-2 uppercase tracking-wider">المديرية</label>
          <select className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:ring-2 ring-[#A67C52]/20 transition-all">
            <option>الكل</option>
            {DISTRICTS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-black text-stone-500 mb-2 uppercase tracking-wider">نطاق السعر</label>
          <div className="flex gap-2">
            <input type="number" placeholder="من" className="w-1/2 bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 text-sm font-bold outline-none" />
            <input type="number" placeholder="إلى" className="w-1/2 bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 text-sm font-bold outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black text-stone-500 mb-2 uppercase tracking-wider">المتطلبات الأساسية</label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "sun", label: "دخول شمس" },
              { id: "tank", label: "خزان مستقل" },
              { id: "power", label: "كهرباء مستقل" },
              { id: "majlis", label: "مجلس خارجي" }
            ].map(filter => (
              <button key={filter.id} className="px-3 py-1.5 rounded-full border border-stone-200 text-[10px] font-bold text-stone-600 hover:border-[#A67C52] hover:text-[#A67C52] transition-all">
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 flex justify-end gap-3 pt-4 border-t border-stone-50">
          <button className="text-stone-400 text-sm font-bold hover:text-stone-600 transition-colors">إعادة تعيين</button>
          <button className="bg-[#A67C52] text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all">
            تطبيق الفلاتر
          </button>
        </div>
      </div>
    </motion.div>
  );
}
