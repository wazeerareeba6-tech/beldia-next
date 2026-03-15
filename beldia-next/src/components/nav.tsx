"use client"

import { useLanguage, useT } from "@/components/language-provider"

export function Nav() {
  const { lang, toggleLanguage } = useLanguage()
  const t = useT()
  return (
    <header className="w-full bg-card">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <h1 className="text-lg font-semibold text-pretty items-center justify-between">{t("appTitle")}</h1>
        <button
          onClick={toggleLanguage}
          className="rounded-full bg-[#006D6F] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#005557] transition duration-200 cursor-pointer"
          aria-label="Toggle language"
        >
          {lang === "ar" ? "English" : "العربية"}
        </button>
      </div>
    </header>
  )
}
