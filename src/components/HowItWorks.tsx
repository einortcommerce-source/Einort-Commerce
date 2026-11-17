import { Search, Store, Wallet } from 'lucide-react';
import { ACCEPTED_SELLER_METHODS } from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';

interface HowItWorksProps {
  language: Language;
  sectionRef?: React.RefObject<HTMLElement | null>;
}

export function HowItWorks({ language, sectionRef }: HowItWorksProps) {
  const t = TRANSLATIONS[language];

  const steps = [
    {
      number: '01',
      title: t.step1Title,
      body: t.step1Body,
      icon: Search,
      accent: 'from-[#1749C8] to-[#1677F8]',
    },
    {
      number: '02',
      title: t.step2Title,
      body: t.step2Body,
      icon: Store,
      accent: 'from-[#2445B8] to-[#6439D6]',
    },
    {
      number: '03',
      title: t.step3Title,
      body: t.step3Body,
      icon: Wallet,
      accent: 'from-[#6439D6] to-[#8655F0]',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-white py-10 sm:py-12 lg:py-16 border-b border-[#E3E9F4]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <h2
            id="how-it-works-heading"
            className="font-heading text-2xl sm:text-[28px] font-bold tracking-tight text-[#050D24]"
          >
            {t.howItWorksTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#64748B]">
            {t.howItWorksSubtitle}
          </p>
        </div>

        <div className="relative">
          {/* Subtle connecting horizontal rule on desktop */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-11 left-[14%] right-[14%] h-px bg-gradient-to-r from-[#1749C8]/25 via-[#6439D6]/35 to-[#8655F0]/25"
          />

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 relative">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.number}
                  className="flex flex-col rounded-2xl border border-[#E3E9F4] bg-[#F6F8FC]/60 p-6 transition-colors hover:bg-white hover:border-[#1749C8]/30"
                >
                  <div className="flex items-center gap-3.5 mb-4">
                    <span
                      className={`relative z-10 flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${step.accent} text-white shadow-sm`}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-[#050D24]">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[#64748B] leading-relaxed">{step.body}</p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Accepted Local Order Methods on Merchant Storefronts */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E3E9F4] bg-[#F6F8FC] px-4 sm:px-6 py-4">
          <p className="text-xs sm:text-sm font-semibold text-[#0A1740]">
            {language === 'fr'
              ? 'Modes de commande disponibles sur les boutiques marchandes :'
              : 'How sellers accept orders on their EINORT storefronts:'}
          </p>
          <p className="text-xs sm:text-sm text-[#64748B]">
            {ACCEPTED_SELLER_METHODS.join(' · ')}
          </p>
        </div>
      </div>
    </section>
  );
}
