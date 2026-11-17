import { Mail, MapPin } from 'lucide-react';
import {
  EINORT_URLS,
  type CategorySlug,
  type MarketplaceCategory,
} from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import { EinortLogo } from './EinortLogo';
import { Newsletter } from './Newsletter';

interface FooterProps {
  categories: MarketplaceCategory[];
  onSelectCategory: (slug: CategorySlug) => void;
  onScrollToStores: () => void;
  onScrollToRecentlyAdded: () => void;
  onScrollToHowItWorks: () => void;
  language: Language;
}

export function Footer({
  categories,
  onSelectCategory,
  onScrollToStores,
  onScrollToRecentlyAdded,
  onScrollToHowItWorks,
  language,
}: FooterProps) {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-[#050D24] text-white border-t border-[#1749C8]/25 pb-20 md:pb-0">
      {/* Tasteful Cameroon-inspired thin architectural accent bar */}
      <div aria-hidden="true" className="grid grid-cols-3 h-1 w-full">
        <div className="bg-[#1749C8]" />
        <div className="bg-[#6439D6]" />
        <div className="bg-[#1677F8]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand Area */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <EinortLogo variant="dark-bg" size="md" showMarketplaceLabel />
            <p className="max-w-sm text-sm text-[#E9EEF8]/75 leading-relaxed">
              {t.footerDescription}
            </p>
            <div className="flex flex-col gap-2 pt-1 text-xs text-[#E9EEF8]/80">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-3.5 text-[#1677F8]" aria-hidden="true" />
                <span>Douala, Cameroon</span>
              </span>
              <a
                href={`mailto:${EINORT_URLS.supportEmail}`}
                className="inline-flex items-center gap-2 hover:text-white transition-colors w-fit"
              >
                <Mail className="size-3.5 text-[#8655F0]" aria-hidden="true" />
                <span>{EINORT_URLS.supportEmail}</span>
              </a>
            </div>
          </div>

          {/* Marketplace */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-heading text-sm font-semibold text-white">
              {t.footerMarketplace}
            </h3>
            <ul className="space-y-2 text-sm text-[#E9EEF8]/75">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.heroPrimaryCta}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onScrollToStores}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.storesTitle}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onScrollToRecentlyAdded}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.recentlyAddedTitle}
                </button>
              </li>
              {categories.slice(0, 2).map((cat) => (
                <li key={cat.slug}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(cat.slug)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {language === 'fr' ? cat.nameFr : cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* For Merchants & Support */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-3">
              <h3 className="font-heading text-sm font-semibold text-white">
                {t.footerMerchants}
              </h3>
              <ul className="space-y-2 text-sm text-[#E9EEF8]/75">
                <li>
                  <a
                    href={EINORT_URLS.signup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {t.sellOnEinort}
                  </a>
                </li>
                <li>
                  <a
                    href={EINORT_URLS.signup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {t.openAStore}
                  </a>
                </li>
                <li>
                  <a
                    href={EINORT_URLS.login}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {t.merchantLogin}
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading text-sm font-semibold text-white">
                {t.footerSupport}
              </h3>
              <ul className="space-y-2 text-sm text-[#E9EEF8]/75">
                <li>
                  <button
                    type="button"
                    onClick={onScrollToHowItWorks}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.howItWorksTitle}
                  </button>
                </li>
                <li>
                  <a
                    href={`mailto:${EINORT_URLS.supportEmail}`}
                    className="hover:text-white transition-colors"
                  >
                    {language === 'fr' ? 'Contacter le support' : 'Contact Us'}
                  </a>
                </li>
                <li>
                  <a
                    href={EINORT_URLS.about}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {language === 'fr' ? 'À propos d’EINORT' : 'About EINORT'}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-3">
            <Newsletter language={language} />
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#E9EEF8]/65">
          <p>© {new Date().getFullYear()} EINORT Commerce. Cameroon.</p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={EINORT_URLS.privacy}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {language === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'}
            </a>
            <a
              href={EINORT_URLS.terms}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {language === 'fr' ? 'Conditions d’utilisation' : 'Terms of Service'}
            </a>
            <a
              href={EINORT_URLS.cookies}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {language === 'fr' ? 'Paramètres des cookies' : 'Cookie Settings'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
