import React from "react";
import { ArrowRight, MapPin, Phone, MessageCircle, Share2, Heart, Sun, Droplets, Zap, Users, ShieldCheck, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export function PropertyDetails({ property, onBack }: { property: any, onBack: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] bg-stone-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto bg-white min-h-screen shadow-2xl relative">
        {/* Navigation Header */}
        <div className="sticky top-0 z-20 flex justify-between items-center px-4 py-4 bg-white/80 backdrop-blur-md border-b border-stone-100">
          <button onClick={onBack} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <ArrowRight size={24} className="rotate-180" />
          </button>
          <div className="flex gap-3">
            <button className="p-2 hover:bg-stone-100 rounded-full transition-colors"><Share2 size={22} /></button>
            <button className="p-2 hover:bg-stone-100 rounded-full transition-colors"><Heart size={22} /></button>
          </div>
        </div>

        {/* Gallery */}
        <div className="relative aspect-video sm:aspect-[16/7] overflow-hidden">
          <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
            1 / {property.images.length + 2} صور
          </div>
        </div>

        {/* Main Info */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div>
              <div className="flex gap-2 mb-2">
                <span className="bg-[#A67C52]/10 text-[#A67C52] px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider">
                  {property.category === "apartment" ? "شقة سكنية" : "محل تجاري"}
                </span>
                <span className="bg-stone-100 text-stone-500 px-2 py-0.5 rounded-md text-[10px] font-bold">
                  كود: EJ-9921
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-800 leading-tight">{property.title}</h1>
              <div className="flex items-center gap-1 text-stone-500 mt-2 font-medium">
                <MapPin size={18} />
                <span>صنعاء، {property.district}، {property.neighborhood}</span>
              </div>
            </div>
            
            <div className="bg-[#2D5A27]/5 p-4 rounded-3xl border border-[#2D5A27]/10 flex flex-col items-end">
              <span className="text-3xl font-black text-[#2D5A27]">{property.price.toLocaleString()}</span>
              <span className="text-xs font-bold text-[#2D5A27]/60 uppercase tracking-widest mt-1">ريال يمني / شهرياً</span>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-stone-50 p-4 rounded-2xl flex flex-col items-center text-center gap-2 border border-stone-100">
              <Sun className={property.details.sunlight ? "text-orange-500" : "text-stone-300"} />
              <span className="text-[10px] font-black text-stone-400 uppercase">دخول الشمس</span>
              <span className="text-xs font-bold">{property.details.sunlight ? "ممتاز" : "محدود"}</span>
            </div>
            <div className="bg-stone-50 p-4 rounded-2xl flex flex-col items-center text-center gap-2 border border-stone-100">
              <Droplets className={property.details.water_tank ? "text-blue-500" : "text-stone-300"} />
              <span className="text-[10px] font-black text-stone-400 uppercase">خزان الماء</span>
              <span className="text-xs font-bold">{property.details.water_tank ? "مستقل" : "مشترك"}</span>
            </div>
            <div className="bg-stone-50 p-4 rounded-2xl flex flex-col items-center text-center gap-2 border border-stone-100">
              <Zap className={property.details.electricity ? "text-yellow-500" : "text-stone-300"} />
              <span className="text-[10px] font-black text-stone-400 uppercase">الكهرباء</span>
              <span className="text-xs font-bold">{property.details.electricity ? "عداد مستقل" : "مشترك"}</span>
            </div>
            <div className="bg-stone-50 p-4 rounded-2xl flex flex-col items-center text-center gap-2 border border-stone-100">
              <ShieldCheck className="text-green-600" />
              <span className="text-[10px] font-black text-stone-400 uppercase">الضمانات</span>
              <span className="text-xs font-bold">تجارية مطلوبة</span>
            </div>
          </div>

          {/* Detailed Info Section */}
          <div className="space-y-8 mb-24">
            <section>
              <h3 className="text-lg font-black text-stone-800 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-[#A67C52] rounded-full" />
                الوصف والتفاصيل
              </h3>
              <p className="text-stone-600 leading-relaxed font-medium">
                شقة سكنية راقية في قلب الحي السياسي بصنعاء، تتميز بتصميمها المعماري الذي يسمح بدخول الشمس لجميع الغرف طوال اليوم مما يوفر تدفئة طبيعية في الشتاء. تقع في الدور الثاني، وتتضمن خزان ماء أرضي وعلوي مستقل تماماً. المبنى حديث ويضم سكان من العائلات فقط لضمان الخصوصية والهدوء.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-black text-stone-800 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-[#A67C52] rounded-full" />
                المرافق والخدمات
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "عدد الغرف", value: property.details.rooms },
                  { label: "عدد الحمامات", value: "2" },
                  { label: "المطبخ", value: "واسع مع بوفيه" },
                  { label: "المجلس", value: property.details.majlis_external ? "خارجي مستقل" : "داخلي" },
                  { label: "موقف سيارة", value: "متوفر" },
                  { label: "القرب من الخدمات", value: "جوار سوبر ماركت ومسجد" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-stone-50">
                    <span className="text-stone-500 text-sm font-medium">{item.label}</span>
                    <span className="text-stone-800 text-sm font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Advertiser Info */}
            <section className="bg-stone-100 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-stone-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#A67C52] rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg">
                  {property.advertiser.name[0]}
                </div>
                <div>
                  <h4 className="text-lg font-black text-stone-800">{property.advertiser.name}</h4>
                  <p className="text-sm text-stone-500 font-bold">{property.advertiser.type === "owner" ? "مالك العقار" : "وكيل معتمد"}</p>
                  <div className="flex items-center gap-1 text-[10px] text-[#2D5A27] font-black uppercase mt-1">
                    <ShieldCheck size={12} />
                    هوية موثقة
                  </div>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[10px] text-stone-400 font-bold mb-1 uppercase">تاريخ النشر</p>
                <div className="flex items-center gap-2 text-stone-700 font-bold">
                  <Calendar size={16} />
                  <span>20 يناير 2026</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Action Bar */}
        <div className="fixed bottom-0 max-w-4xl w-full p-4 bg-white border-t border-stone-100 flex gap-4 z-50">
          <button className="flex-1 bg-[#2D5A27] hover:bg-[#23471E] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#2D5A27]/20 active:scale-95">
            <Phone size={20} />
            اتصال
          </button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
            <MessageCircle size={20} />
            واتساب
          </button>
        </div>
      </div>
    </div>
  );
}
