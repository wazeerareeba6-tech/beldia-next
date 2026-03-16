"use client"

import { useLanguage, useT } from "@/components/language-provider"
import { Settings, Accessibility, ChevronDown, Lock, Link as LinkIcon, ExternalLink } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation" // URL track karne ke liye
import logo from "../assets/arabic-flag.webp" 

export function Nav() {
  const { lang, toggleLanguage } = useLanguage()
  const pathname = usePathname()
  const [isVerifyOpen, setIsVerifyOpen] = useState(false)
  const [regNumber, setRegNumber] = useState("Loading...")

  // Yeh check karta hai ke kya hum submission wale page par hain
  // Agar aapke result page ka path kuch aur hai to "/submitted" ki jagah wo likh dein
  const isResultPage = pathname.includes("/submitted")

  useEffect(() => {
    fetch('/api/latest-cert')
      .then(res => res.json())
      .then(data => setRegNumber(data.certNumber))
      .catch(() => setRegNumber("442436633516")) 
  }, [])

  // --- UI Sections ---

  const GovSection = (
    <div className="w-full">
      <div className="flex flex-col items-center pt-6 pb-2">
        <Image src={logo} alt="Saudi Emblem" width={40} height={40} className="h-auto w-auto" priority />
        <h2 className="text-[14px] md:text-[16px] font-bold text-gray-800 text-center px-4">
          موقع حكومي مسجل لدى هيئة الحكومة الرقمية
        </h2>
      </div>

      <div className="mx-auto max-w-5xl px-4 flex justify-end mb-2">
        <button 
          onClick={() => setIsVerifyOpen(!isVerifyOpen)}
          className="flex items-center gap-1 text-[#006D6F] font-bold text-[13px] hover:underline cursor-pointer"
        >
          <ChevronDown size={14} className={`transition-transform ${isVerifyOpen ? 'rotate-180' : ''}`} />
          <span>كيف تتحقق</span>
        </button>
      </div>

      {isVerifyOpen && (
        <div className="w-full bg-[#f4f7f7] border-b border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="mx-auto max-w-5xl px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-full border border-gray-100 shadow-sm">
                 <LinkIcon size={24} className="text-[#006D6F]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-[14px] mb-1">روابط المواقع تنتهي بـ <span className="text-[#006D6F]">gov.sa.</span></h4>
                <p className="text-gray-500 text-[12px]">جميع روابط المواقع الرسمية تنتهي بـ gov.sa.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
               <div className="bg-white p-3 rounded-full border border-gray-100 shadow-sm">
                 <Lock size={24} className="text-[#006D6F]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-[14px] mb-1">المواقع تستخدم بروتوكول <span className="text-[#006D6F]">HTTPS</span>.</h4>
                <p className="text-gray-500 text-[12px]">المواقع الآمنة تستخدم بروتوكول HTTPS للتشفير.</p>
              </div>
            </div>
          </div>
          <div className="bg-white py-3 border-t border-gray-200 flex justify-center items-center gap-2 text-[13px] text-gray-600">
             <span>مسجل لدى هيئة الحكومة الرقمية برقم: </span>
             <a href="#" className="text-[#006D6F] font-bold flex items-center gap-1 hover:underline">
               {regNumber} <ExternalLink size={12} />
             </a>
          </div>
        </div>
      )}
    </div>
  )

  const GreyBar = (
    <div className="w-full bg-[#f8f9fa] border-y border-gray-200">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 text-[14px] text-gray-700 font-medium">
          <div className="border border-gray-400 rounded-full p-0.5">
             <Accessibility size={18} className="text-gray-600" />
          </div>
          <span>أدوات سهولة الوصول</span>
        </div>
        <div className="flex items-center gap-2 text-[14px] text-gray-700 font-medium">
          <span>الإعدادات</span>
          <Settings size={20} className="text-gray-500" />
        </div>
      </div>
    </div>
  )

  const BaladyNavbar = (
    <div className="w-full bg-[#006D6F] py-4 shadow-md">
      <div className="mx-auto max-w-5xl px-4 flex justify-between items-center">
        {/* Balady Logo/Title Section */}
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-full">
            <Image src={logo} alt="Balady" width={30} height={30} />
          </div>
          <div className="text-white text-right">
            <h1 className="text-lg font-bold leading-none">Balady</h1>
            <p className="text-[10px] opacity-90">Services</p>
          </div>
        </div>
        
        {/* English Toggle Button */}
        <button
          onClick={toggleLanguage}
          className="rounded-full border border-white/40 px-6 py-1.5 text-xs font-bold text-white hover:bg-white/10 transition-all"
        >
          {lang === "ar" ? "English" : "العربية"}
        </button>
      </div>
    </div>
  )

  return (
    <header className="w-full bg-white font-sans" dir={lang === "ar" ? "rtl" : "ltr"}>
      {isResultPage ? (
        /* --- Layout for Result Page (Navbar FIRST) --- */
        <>
          {BaladyNavbar}
          {GreyBar}
          {GovSection}
        </>
      ) : (
        /* --- Layout for Normal Pages (Gov Header FIRST) --- */
        <>
          {GovSection}
          {GreyBar}
          {BaladyNavbar}
        </>
      )}
    </header>
  )
}