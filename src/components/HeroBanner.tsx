import { useState, useEffect } from 'react';
import { ArrowRight, Store, Wallet, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { EINORT_LOGO_PATH, EINORT_URLS, HERO_SLIDES } from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';

interface HeroBannerProps {
  language: Language;
  onBrowseProducts: () => void;
  onScrollToHowItWorks: () => void;
  onScrollToStores: () => void;
}

export function HeroBanner({
  language,
  onBrowseProducts,
  onScrollToHowItWorks,
  onScrollToStores,
}: HeroBannerProps) {
  const t = TRANSLATIONS[language];
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[activeIndex];

  const handleSlideCta = () => {
    if (currentSlide.ctaTarget === 'how-it-works') {
      onScrollToHowItWorks();
    } else if (currentSlide.ctaTarget === 'stores') {
      onScrollToStores();
    } else {
      onBrowseProducts();
    }
  };

  return (
    <section
      aria-label="EINORT Marketplace Featured Showcase"
      className="bg-[#050D24] text-white relative overflow-hidden"
    >
      {/* Subtle geometric background facets inspired by EINORT 3D symbol */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(100,57,214,0.28),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(22,119,248,0.22),_transparent_50%)]"
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] opacity-[0.07]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <polygon points="100,8 188,56 188,144 100,192 12,144 12,56" stroke="#8655F0" strokeWidth="1.5" />
        <polygon points="100,32 164,68 164,132 100,168 36,132 36,68" stroke="#1677F8" strokeWidth="1.2" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Campaign Typography & Dual CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-5 py-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-[#0A1740] ring-1 ring-white/15 overflow-hidden shrink-0">
                <img
                  src={EINORT_LOGO_PATH}
                  alt="EINORT mark"
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#93B4FF]">
                {t.heroBadge}
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.12] tracking-tight text-white [text-wrap:balance]">
              {activeIndex === 0
                ? language === 'fr'
                  ? currentSlide.headlineFr
                  : currentSlide.headline
                : language === 'fr'
                  ? currentSlide.headlineFr
                  : currentSlide.headline}
            </h1>

            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-[#E9EEF8]/85">
              {language === 'fr' ? currentSlide.subcopyFr : currentSlide.subcopy}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleSlideCta}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1749C8] via-[#1677F8] to-[#6439D6] px-6 text-sm font-semibold text-white shadow-lg shadow-[#1677F8]/20 transition-all duration-150 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677F8] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>
                  {language === 'fr' ? currentSlide.ctaLabelFr : currentSlide.ctaLabel}
                </span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>

              <a
                href={EINORT_URLS.signup}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white backdrop-blur-xs transition-colors hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap shrink-0"
              >
                <Store className="size-4 text-[#93B4FF]" aria-hidden="true" />
                <span>{t.heroSecondaryCta}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Official Marketplace Lifestyle Imagery Showcase */}
          <div className="lg:col-span-6 relative flex flex-col">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[340px] w-full overflow-hidden rounded-2xl border border-white/12 bg-[#0A1740]">
              {!imgErrorMap[currentSlide.id] ? (
                <picture>
                  <source media="(min-width: 640px)" srcSet={currentSlide.desktopImage} />
                  <img
                    src={currentSlide.mobileImage}
                    alt={currentSlide.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setImgErrorMap((prev) => ({ ...prev, [currentSlide.id]: true }))
                    }
                    className="h-full w-full object-cover transition-opacity duration-300"
                  />
                </picture>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0A1740] via-[#1749C8]/40 to-[#6439D6]/40 p-8">
                  <img
                    src={EINORT_LOGO_PATH}
                    alt="EINORT Marketplace"
                    className="h-28 w-28 object-contain opacity-90"
                  />
                </div>
              )}

              {/* Subtle gradient scrim for slide controls legibility */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050D24]/70 via-transparent to-transparent"
              />

              {/* Slide Switcher Controls */}
              <div className="absolute inset-x-4 bottom-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5" role="tablist" aria-label="Hero slides">
                  {HERO_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={idx === activeIndex}
                      aria-label={`Show slide ${idx + 1}`}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                        idx === activeIndex
                          ? 'w-7 bg-white'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Previous slide"
                    onClick={() =>
                      setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
                    }
                    className="inline-flex size-8 items-center justify-center rounded-lg border border-white/20 bg-[#050D24]/65 text-white backdrop-blur-xs hover:bg-[#050D24] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next slide"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
                    className="inline-flex size-8 items-center justify-center rounded-lg border border-white/20 bg-[#050D24]/65 text-white backdrop-blur-xs hover:bg-[#050D24] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cameroon Independent Commerce Trust Strip */}
      <div className="relative border-t border-white/10 bg-[#0A1740]/85">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-6 text-xs sm:text-sm text-[#E9EEF8]/90">
            <li className="flex items-center gap-2.5">
              <Store className="size-4 shrink-0 text-[#1677F8]" aria-hidden="true" />
              <span>{t.trustDirect}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Wallet className="size-4 shrink-0 text-[#8655F0]" aria-hidden="true" />
              <span>{t.trustPayment}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-[#1677F8]" aria-hidden="true" />
              <span>{t.trustLocal}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
