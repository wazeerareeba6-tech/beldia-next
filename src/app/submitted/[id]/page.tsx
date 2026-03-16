"use client"

import useSWR from "swr"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import logo from "@/assets/logo.svg"
import logoNav from '@/assets/logo-nav.svg'
import { useT, useLanguage } from "@/components/language-provider"
import Footer from "@/components/Footer"

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Request failed")
    return r.json()
  })

function AnimatedLogo() {
  return (
    <div className="flex h-screen items-center justify-center bg-white animate-fadeIn">
      <Image
        src={logo.src}
        alt="Loading..."
        width={460}
        height={460}
        className="h-50 w-50 object-contain animate-pulse-slow"
      />
    </div>
  )
}

export default function SubmittedPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = React.use(params)
  const { data, error, isLoading } = useSWR(`/api/forms/${id}`, fetcher)
  const [showLoader, setShowLoader] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const t = useT()
  const { lang, toggleLanguage } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (error) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        حدث خطأ أثناء تحميل البيانات.
      </main>
    )
  }

  if (showLoader) return <AnimatedLogo />

  return isLoading ? (
    <AnimatedLogo />
  ) : (
    <>
      {/* ✅ Responsive Navbar */}
      <nav className="w-full bg-[#006D6F] text-white relative z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="rounded-md border border-white/40 px-3 py-1 text-sm hover:bg-white/10 transition cursor-pointer"
          >
            {lang === "en" ? "العربية" : "English"}
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-sm font-medium">
            <li className="cursor-pointer">{t("contactUs")}</li>
            <li className="cursor-pointer">{t("platforms")}</li>
            <li className="cursor-pointer">{t("inquiries")}</li>
            <li className="cursor-pointer">{t("services")}</li>
            <li className="cursor-pointer">{t("knowledgeCenter")}</li>
            <li className="cursor-pointer">{t("aboutCountry")}</li>
          </ul>

          {/* Logo Section */}
          
            <Image
              src={logoNav}
              alt="Balady Logo"
              width={120}
              height={120}
              className="bg-transparent"
            />
          

          {/* Hamburger Button */}
          <button
            className="md:hidden ml-3 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="space-y-1">
              <span className="block h-0.5 w-6 bg-white"></span>
              <span className="block h-0.5 w-6 bg-white"></span>
              <span className="block h-0.5 w-6 bg-white"></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <ul className="md:hidden flex flex-col items-center bg-[#00575A] text-sm font-medium py-3 space-y-2 transition-all duration-300">
            <li className="cursor-pointer">{t("contactUs")}</li>
            <li className="cursor-pointer">{t("platforms")}</li>
            <li className="cursor-pointer">{t("inquiries")}</li>
            <li className="cursor-pointer">{t("services")}</li>
            <li className="cursor-pointer">{t("knowledgeCenter")}</li>
            <li className="cursor-pointer">{t("aboutCountry")}</li>
          </ul>
        )}
      </nav>

      {/* ✅ Main Content */}
      <main className="mx-auto max-w-4xl p-8 bg-white shadow-sm border border-gray-300 rounded-md mt-6">
        <section className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-3">{t("healthCertificate")}</h2>
          {data?.photoUrl && (
            <div className="flex justify-center">
              <Image
                src={data.photoUrl}
                alt="صورة مقدم الطلب"
                width={160}
                height={160}
                className="rounded-md border border-gray-400 object-cover"
              />
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(data || {})
            .filter(([k]) => !["id", "photoUrl", "createdAt"].includes(k))
            .map(([k, v]) => (
              <div key={k} className="form-field">
                <label className="form-label">{t(k)}</label>
                <div className="form-value">{String(v)}</div>
              </div>
            ))}
        </div>
      </main>
      <div className="mt-6">
        <Footer />
      </div>
    </>
  )
}