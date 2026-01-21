import React from "react";
import { CheckCircle2, XCircle, AlertTriangle, Eye, Edit3, Trash2 } from "lucide-react";

export function AdminPanel({ onClose }: { onClose: () => void }) {
  const pendingListings = [
    { id: "101", title: "شقة في الحصبة", advertiser: "صالح علي", date: "منذ ساعة", status: "pending" },
    { id: "102", title: "أرض للبيع - دارس", advertiser: "مكتب المطار", date: "منذ 3 ساعات", status: "pending" },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-stone-800">لوحة الإشراف</h1>
            <p className="text-stone-500 font-medium">مراجعة المحتوى والتحقق من جودة الإعلانات في صنعاء.</p>
          </div>
          <button onClick={onClose} className="bg-stone-100 hover:bg-stone-200 px-6 py-2 rounded-xl font-bold transition-all">إغلاق</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-xl font-black text-stone-700 flex items-center gap-2">
              <AlertTriangle className="text-orange-500" />
              إعلانات تنتظر المراجعة ({pendingListings.length})
            </h2>
            
            <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm">
              <table className="w-full text-right">
                <thead className="bg-stone-50 border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-black text-stone-400 uppercase">الإعلان</th>
                    <th className="px-6 py-4 text-xs font-black text-stone-400 uppercase">المعلن</th>
                    <th className="px-6 py-4 text-xs font-black text-stone-400 uppercase">التاريخ</th>
                    <th className="px-6 py-4 text-xs font-black text-stone-400 uppercase">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {pendingListings.map(item => (
                    <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-stone-800">{item.title}</div>
                        <div className="text-[10px] text-stone-400 font-medium">ID: {item.id}</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-stone-600">{item.advertiser}</td>
                      <td className="px-6 py-4 text-sm font-medium text-stone-400">{item.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"><CheckCircle2 size={18} /></button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><XCircle size={18} /></button>
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Eye size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-black text-stone-700">إحصائيات سريعة</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-[#2D5A27] p-6 rounded-3xl text-white shadow-lg">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">إجمالي النشط</p>
                <h3 className="text-4xl font-black mt-1">1,240</h3>
              </div>
              <div className="bg-[#A67C52] p-6 rounded-3xl text-white shadow-lg">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">تقارير المخالفة</p>
                <h3 className="text-4xl font-black mt-1">12</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
