"use client"

import { useLanguage, useT } from "@/components/language-provider"
import { Settings, Accessibility, ChevronDown, Lock, Link as LinkIcon, ExternalLink } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import logo from "../assets/arabic-flag.webp" 

export function Nav() {
  const { lang, toggleLanguage } = useLanguage()
  const t = useT()
  const [isVerifyOpen, setIsVerifyOpen] = useState(false)
  const [regNumber, setRegNumber] = useState("Loading...")

  // Database se number fetch karne ke liye
  useEffect(() => {
    fetch('/api/latest-cert')
      .then(res => res.json())
      .then(data => setRegNumber(data.certNumber))
      .catch(() => setRegNumber("442436633516")) 
  }, [])

  return (
    <header className="w-full bg-white font-sans" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* 1. Logo and Title Section */}
      <div className="flex flex-col items-center pt-6 pb-2">
        <Image 
  src={logo} 
  alt="Saudi Emblem" 
  width={40} 
  height={40} 
  style={{ width: 'auto', height: 'auto' }} // Yeh line add karein
  priority 
/>
        <h2 className="text-[14px] md:text-[16px] font-bold text-gray-800 text-center px-4">
          موقع حكومي مسجل لدى هيئة الحكومة الرقمية
        </h2>
      </div>

      {/* 2. "How to verify" - Right Aligned below Title */}
      <div className="mx-auto max-w-5xl px-4 flex justify-end mb-2">
        <button 
          onClick={() => setIsVerifyOpen(!isVerifyOpen)}
          className="flex items-center gap-1 text-[#006D6F] font-bold text-[13px] hover:underline cursor-pointer"
        >
          <ChevronDown size={14} className={`transition-transform ${isVerifyOpen ? 'rotate-180' : ''}`} />
          <span>كيف تتحقق</span>
        </button>
      </div>

      {/* 3. Navigation Grey Bar */}
      <div className="w-full bg-[#f8f9fa] border-y border-gray-200">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
          
          {/* Right Side Icon (Accessibility) */}
          <div className="flex items-center gap-2 text-[14px] text-gray-700 font-medium">
            <div className="border border-gray-400 rounded-full p-0.5">
               <Accessibility size={18} className="text-gray-600" />
            </div>
            <span>أدوات سهولة الوصول</span>
          </div>

          {/* Left Side Icon (Settings) */}
          <div className="flex items-center gap-2 text-[14px] text-gray-700 font-medium">
            <span>الإعدادات</span>
            <Settings size={20} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* 4. Dropdown Content (Appears below the bar) */}
      {isVerifyOpen && (
        <div className="w-full bg-[#f4f7f7] border-b border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="mx-auto max-w-5xl px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-full border border-gray-100 shadow-sm">
                 <LinkIcon size={24} className="text-[#006D6F]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-[14px] mb-1">
                  روابط المواقع الالكترونية الرسمية السعودية تنتهي بـ <span className="text-[#006D6F]">gov.sa.</span>
                </h4>
                <p className="text-gray-500 text-[12px]">جميع روابط المواقع الرسمية التابعة للجهات الحكومية تنتهي بـ gov.sa.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
               <div className="bg-white p-3 rounded-full border border-gray-100 shadow-sm">
                 <Lock size={24} className="text-[#006D6F]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-[14px] mb-1">
                  المواقع الالكترونية الحكومية تستخدم بروتوكول <span className="text-[#006D6F]">HTTPS</span>.
                </h4>
                <p className="text-gray-500 text-[12px]">المواقع الالكترونية الآمنة في المملكة العربية السعودية تستخدم بروتوكول HTTPS للتشفير.</p>
              </div>
            </div>
          </div>
          {/* Registration Number Section */}
          <div className="bg-white py-3 border-t border-gray-200 flex justify-center items-center gap-2 text-[13px] text-gray-600">
             <span>مسجل لدى هيئة الحكومة الرقمية برقم: </span>
             <a href="#" className="text-[#006D6F] font-bold flex items-center gap-1 hover:underline">
               {regNumber} <ExternalLink size={12} />
             </a>
          </div>
        </div>
      )}

      {/* 5. English Button - Left Aligned (for RTL) */}
      <div className="mx-auto max-w-5xl px-4 py-8 flex justify-end">
        <button
          onClick={toggleLanguage}
          className="rounded-full bg-[#006D6F] px-8 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#005557] transition-all cursor-pointer"
        >
          {lang === "ar" ? "English" : "العربية"}
        </button>
      </div>
    </header>
  )
}