import React, { useState } from "react";
import { CATEGORIES, CATEGORY_SCHEMAS, DISTRICTS } from "@/app/data/sana-data";
import * as Icons from "lucide-react";
import { ArrowRight, Image as ImageIcon, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export function ListingForm({ onCancel }: { onCancel: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({ category: "", district: "", images: [] });

  const currentSchema = CATEGORY_SCHEMAS[formData.category] || [];

  const handleNext = () => {
    if (step === 1 && !formData.category) return toast.error("يرجى اختيار الفئة أولاً");
    if (step === 2 && !formData.district) return toast.error("يرجى اختيار الموقع");
    setStep(s => s + 1);
  };

  const handleBack = () => setStep(s => s - 1);

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto pb-20" dir="rtl">
      <div className="sticky top-0 bg-white border-b border-stone-100 px-4 py-4 flex items-center justify-between z-10">
        <button onClick={onCancel} className="text-stone-500 font-bold flex items-center gap-1">
          <ArrowRight size={20} />
          إلغاء
        </button>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${step >= i ? "bg-[#A67C52]" : "bg-stone-100"}`} />
          ))}
        </div>
        <div className="w-10" />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-black text-stone-800 mb-2">ماذا تريد أن تعلن اليوم؟</h2>
              <p className="text-stone-500 mb-8 font-medium">اختر الفئة المناسبة لإعلانك للبدء في تعبئة التفاصيل.</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {CATEGORIES.map(cat => {
                  const Icon = (Icons as any)[cat.icon] || Info;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setFormData({ ...formData, category: cat.id })}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                        formData.category === cat.id 
                        ? "border-[#A67C52] bg-[#A67C52]/5" 
                        : "border-stone-100 hover:border-stone-200"
                      }`}
                    >
                      <div className={`p-3 rounded-xl ${formData.category === cat.id ? "bg-[#A67C52] text-white" : "bg-stone-50 text-stone-400"}`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-sm font-bold text-stone-700">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-black text-stone-800 mb-2">تفاصيل الإعلان</h2>
              <p className="text-stone-500 mb-8 font-medium">هذه الحقول مخصصة لفئة ({CATEGORIES.find(c => c.id === formData.category)?.name}) لضمان ظهور إعلانك بشكل دقيق.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-stone-400 mb-2 uppercase">ال��وقع في صنعاء</label>
                  <div className="grid grid-cols-2 gap-4">
                    <select 
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 font-bold text-sm outline-none"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    >
                      <option value="">اختر المديرية</option>
                      {DISTRICTS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                    </select>
                    <input type="text" placeholder="الحي / الشارع" className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 font-bold text-sm outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {currentSchema.map(field => (
                    <div key={field.id} className={field.type === "toggle" ? "flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100" : ""}>
                      <label className={`block text-xs font-black text-stone-400 mb-1 uppercase ${field.type === "toggle" ? "mb-0" : ""}`}>
                        {field.label}
                        {field.required && <span className="text-red-500 mr-1">*</span>}
                      </label>
                      
                      {field.type === "number" && (
                        <input type="number" placeholder={field.placeholder} className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 font-bold text-sm outline-none" />
                      )}
                      
                      {field.type === "toggle" && (
                        <button className="w-12 h-6 bg-stone-200 rounded-full relative transition-all hover:bg-stone-300">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                        </button>
                      )}

                      {field.type === "text" && (
                        <input type="text" placeholder={field.placeholder} className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 font-bold text-sm outline-none" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-black text-stone-800 mb-2">الصور والسعر</h2>
              <p className="text-stone-500 mb-8 font-medium">الصور الواضحة تزيد من فرص التواصل بنسبة 70%.</p>
              
              <div className="space-y-8">
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-square bg-stone-50 border-2 border-dashed border-stone-200 rounded-3xl flex flex-col items-center justify-center text-stone-400 hover:bg-stone-100 transition-colors cursor-pointer">
                      <ImageIcon size={32} />
                      <span className="text-[10px] font-bold mt-2">إضافة صورة</span>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-black text-stone-400 mb-2 uppercase">السعر المطلوب (ريال يمني / شهرياً)</label>
                  <input type="number" className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-2xl font-black text-[#2D5A27] outline-none focus:ring-4 ring-[#2D5A27]/10" placeholder="000,000" />
                  <p className="text-[10px] text-stone-400 mt-2 font-medium">ملاحظة: تأكد من تحديد السعر بدقة لتجنب رفض الإعلان من قبل الإدارة.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-0 inset-x-0 p-4 bg-white border-t border-stone-100 z-10">
        <div className="max-w-2xl mx-auto flex gap-4">
          {step > 1 && (
            <button 
              onClick={handleBack}
              className="flex-1 py-4 rounded-2xl font-bold text-stone-500 bg-stone-50 hover:bg-stone-100 transition-all"
            >
              السابق
            </button>
          )}
          <button 
            onClick={() => {
              if (step === 3) {
                toast.success("تم إرسال إعلانك بنجاح! سيتم مراجعته خلال 24 ساعة.");
                onCancel();
              } else {
                handleNext();
              }
            }}
            className="flex-[2] py-4 rounded-2xl font-bold text-white bg-[#A67C52] hover:bg-[#8B6745] transition-all shadow-lg shadow-[#A67C52]/20 active:scale-95"
          >
            {step === 3 ? "نشر الإعلان الآن" : "المتابعة"}
          </button>
        </div>
      </div>
    </div>
  );
}
