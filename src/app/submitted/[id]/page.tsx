"use client"

import useSWR from "swr"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import logo from "@/assets/logo.svg"
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
  const t = useT()
  const { lang } = useLanguage()

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

  if (showLoader || isLoading) return <AnimatedLogo />

  return (
    <>
      {/* NOTE: Yahan se manual <nav> hata diya gaya hai. 
         Ab layout.tsx wala <Nav /> hi yahan nazar ayega.
      */}

      {/* ✅ Main Content */}
      <main className="mx-auto max-w-4xl p-8 bg-white shadow-sm border border-gray-300 rounded-md mt-6" dir={lang === "ar" ? "rtl" : "ltr"}>
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
                <label className="form-label font-bold text-gray-700">{t(k)}</label>
                <div className="form-value border-b border-gray-200 py-1 text-gray-600">{String(v)}</div>
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