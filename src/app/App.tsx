import React, { useState, useMemo } from "react";
import { Header } from "@/app/components/Header";
import { SearchBar } from "@/app/components/SearchBar";
import { CategoryNav } from "@/app/components/CategoryNav";
import { PropertyCard } from "@/app/components/PropertyCard";
import { AdvancedFilters } from "@/app/components/AdvancedFilters";
import { PropertyDetails } from "@/app/components/PropertyDetails";
import { ListingForm } from "@/app/components/ListingForm";
import { AdminPanel } from "@/app/components/AdminPanel";
import { MOCK_PROPERTIES } from "@/app/data/sana-data";
import { Toaster, toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Map, LayoutGrid, Info } from "lucide-react";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("apartment");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showListingForm, setShowListingForm] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900" dir="rtl">
      <Toaster position="top-center" expand={true} richColors />
      
      <Header onAddListing={() => setShowListingForm(true)} />
      
      <main className="pb-24">
        {/* Hero & Search Area */}
        <div className="bg-[#A67C52] pt-12 pb-20 px-4 relative overflow-hidden">
          {/* Decorative Elements - Kamariya Style */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl -ml-48 -mb-48" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight"
            >
              ابحث عن منزلك القادم في <br className="hidden sm:block" /> قلب صنعاء
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#F5E6D3] font-bold text-lg mb-8"
            >
              أول منصة عقارية ديناميكية تلبي احتياجاتك الصنعانية بدقة.
            </motion.p>
          </div>
        </div>

        <SearchBar 
          onToggleFilters={() => setShowFilters(!showFilters)} 
          showFilters={showFilters}
        />

        <AnimatePresence>
          {showFilters && <AdvancedFilters onClose={() => setShowFilters(false)} />}
        </AnimatePresence>

        <CategoryNav 
          activeId={activeCategory} 
          onSelect={setActiveCategory} 
        />

        {/* Listings Content */}
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-black text-stone-800">العقارات المتاحة</h3>
              <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mt-1">تم العثور على {filteredProperties.length} إعلان</p>
            </div>
            <div className="flex bg-white rounded-xl p-1 shadow-sm border border-stone-100">
              <button className="p-2 bg-stone-100 text-[#A67C52] rounded-lg"><LayoutGrid size={20} /></button>
              <button className="p-2 text-stone-400"><Map size={20} /></button>
            </div>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  onClick={() => setSelectedProperty(property)}
                />
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-[40px] py-20 px-4 text-center border-2 border-dashed border-stone-200"
            >
              <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-300">
                <Search size={40} />
              </div>
              <h4 className="text-xl font-black text-stone-800 mb-2">لا توجد نتائج حالياً</h4>
              <p className="text-stone-500 font-medium max-w-sm mx-auto">
                عذراً، لا يوجد إعلانات ضمن فئة "{activeCategory}" في الوقت الحالي. جرب تغيير الفئة أو البحث في مديرية أخرى.
              </p>
              <button 
                onClick={() => setActiveCategory("apartment")}
                className="mt-6 text-[#A67C52] font-black border-b-2 border-[#A67C52] pb-1 hover:text-[#8B6745] transition-all"
              >
                العودة للشقق السكنية
              </button>
            </motion.div>
          )}
        </div>

        {/* Footer info/admin trigger */}
        <footer className="mt-20 py-12 px-4 border-t border-stone-200 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-right">
              <div className="text-[#A67C52] font-black text-xl mb-2">إيجار صنعاء</div>
              <p className="text-stone-400 text-sm font-medium">© 2026 جميع الحقوق محفوظة - صنعاء، اليمن</p>
            </div>
            <div className="flex gap-6">
              <button onClick={() => setShowAdmin(true)} className="text-stone-400 hover:text-stone-600 font-bold text-sm transition-colors">لوحة الإشراف</button>
              <button className="text-stone-400 hover:text-stone-600 font-bold text-sm transition-colors">شروط الاستخدام</button>
              <button className="text-stone-400 hover:text-stone-600 font-bold text-sm transition-colors">تواصل معنا</button>
            </div>
          </div>
        </footer>
      </main>

      {/* Overlays */}
      <AnimatePresence>
        {selectedProperty && (
          <PropertyDetails 
            property={selectedProperty} 
            onBack={() => setSelectedProperty(null)} 
          />
        )}
        
        {showListingForm && (
          <ListingForm 
            onCancel={() => setShowListingForm(false)} 
          />
        )}

        {showAdmin && (
          <AdminPanel 
            onClose={() => setShowAdmin(false)} 
          />
        )}
      </AnimatePresence>

      {/* Mobile Quick Action - Only on Mobile */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] sm:hidden">
        <button 
          onClick={() => setShowListingForm(true)}
          className="bg-[#A67C52] text-white px-8 py-4 rounded-full font-black shadow-2xl flex items-center gap-3 animate-bounce"
        >
          <Info size={20} />
          أعلن الآن مجاناً
        </button>
      </div>
    </div>
  );
}
