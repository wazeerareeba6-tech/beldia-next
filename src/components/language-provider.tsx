"use client"

import type React from "react"
import i18next from "i18next"
import { initReactI18next, useTranslation } from "react-i18next"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

const resources = {
  ar: {
    translation: {
      appTitle: "تفاصيل نموذج العميل",
      submit: "إنشاء العميل",
      uploading: "جاري الرفع...",
      trust: "الأمانة",
      municipality: "البلدية",
      name: "الاسم",
      idNumber: "رقم الهوية",
      sex: "الجنس",
      nationality: "الجنسية",
      certNumber: "رقم الشهادة الصحية",
      profession: "المهنة",
      issueDateH: "تاريخ إصدار الشهادة الصحية (هجري)",
      issueDateG: "تاريخ إصدار الشهادة الصحية (ميلادي)",
      expiryDateH: "تاريخ نهاية الشهادة الصحية (هجري)",
      expiryDateG: "تاريخ  نهاية الشهادة الصحية (ميلادي)",
      eduProgramType: "نوع البرنامج التثقيفى",
      eduProgramEndH: "تاريخ انتهاء البرنامج التثقيفى",
      licenseNumber: "رقم الرخصة",
      facilityName: "اسم المنشأة",
      facilityNumber: "رقم المنشأة",
      photo: "الصورة",
      male: "ذكر",
      female: "أنثى",
      successRedirecting: "تم الإرسال، سيتم تحويلك...",
      required: "هذا الحقل مطلوب",
      optional: "اختياري",
      clear: "مسح",
      healthCertificate: "شهادة صحية",
      // ✅ Navbar labels
      contactUs: "تواصل معنا",
      platforms: "المنصات",
      inquiries: "الاستعلامات",
      services: "الخدمات",
      knowledgeCenter: "مركز المعرفة",
      aboutCountry: "عن بلدي",
    },
  },
  en: {
    translation: {
      appTitle: "Client Form Details",
      submit: "Create Client",
      uploading: "Uploading...",
      trust: "Trust",
      municipality: "Municipality",
      name: "Name",
      idNumber: "ID number",
      sex: "Sex",
      nationality: "Nationality",
      certNumber: "Health certificate number",
      profession: "Profession",
      issueDateH: "Date of issue (Hijri)",
      issueDateG: "Date of issue (Gregorian)",
      expiryDateH: "Expiry date (Hijri)",
      expiryDateG: "Expiry date (Gregorian)",
      eduProgramType: "Type of educational program",
      eduProgramEndH: "Educational program end date (Hijri)",
      licenseNumber: "License number",
      facilityName: "Facility name",
      facilityNumber: "Facility number",
      photo: "Photo",
      male: "Male",
      female: "Female",
      successRedirecting: "Submitted successfully, redirecting...",
      required: "This field is required",
      optional: "Optional",
      clear: "Clear",
       healthCertificate: "Health Certificate",
      // ✅ Navbar labels
      contactUs: "Contact us",
      platforms: "Platforms",
      inquiries: "Inquiries",
      services: "Services",
      knowledgeCenter: "Knowledge Center",
      aboutCountry: "About My Country",
    },
  },
}

let initialized = false
function ensureI18n() {
  if (initialized) return i18next
  i18next.use(initReactI18next).init({
    resources,
    lng: "ar",
    fallbackLng: "ar",
    interpolation: { escapeValue: false },
  })
  initialized = true
  return i18next
}

type Lang = "ar" | "en"

type LangContextType = {
  lang: Lang
  toggleLanguage: () => void   
  setLang: (l: Lang) => void   
}

const LangContext = createContext<LangContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  ensureI18n()
  const [lang, setLang] = useState<Lang>("ar")

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    document.body.style.direction = dir
  }, [lang])

  useEffect(() => {
    i18next.changeLanguage(lang)
  }, [lang])

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"))
  }, [])

  const value = useMemo(() => ({ lang, toggleLanguage, setLang }), [lang, toggleLanguage])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}

export function useT() {
  ensureI18n()
  return useTranslation().t
}
