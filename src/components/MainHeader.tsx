import { Menu, Globe, Store, X, ChevronRight, LogIn } from 'lucide-react';
import {
  EINORT_URLS,
  type CategorySlug,
  type MarketplaceCategory,
  type MarketplaceProduct,
  type MarketplaceStore,
} from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import { EinortLogo } from './EinortLogo';
import { SearchBar } from './SearchBar';

interface MainHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  onSubmitSearch: (q: string) => void;
  products: MarketplaceProduct[];
  stores: MarketplaceStore[];
  categories: MarketplaceCategory[];
  onSelectProduct: (product: MarketplaceProduct) => void;
  onSelectStore: (store: MarketplaceStore) => void;
  onSelectCategory: (slug: CategorySlug) => void;
  onScrollToStores: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: (open: boolean) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

export function MainHeader({
  language,
  onLanguageChange,
  searchQuery,
  onSearchQueryChange,
  onSubmitSearch,
  products,
  stores,
  categories,
  onSelectProduct,
  onSelectStore,
  onSelectCategory,
  onScrollToStores,
  mobileMenuOpen,
  onToggleMobileMenu,
  searchInputRef,
}: MainHeaderProps) {
  const t = TRANSLATIONS[language];

  return (
    <header className="relative md:sticky md:top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E3E9F4]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-[72px] items-center justify-between gap-3 lg:gap-6">
          {/* Left: Mobile Menu Trigger + EINORT Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onToggleMobileMenu(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex lg:hidden size-10 items-center justify-center rounded-lg border border-[#E3E9F4] bg-white text-[#111827] hover:bg-[#F6F8FC] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>

            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
                onSearchQueryChange('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677F8]"
            >
              <EinortLogo variant="light-bg" size="md" showMarketplaceLabel />
            </a>
          </div>

          {/* Center: Prominent Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <SearchBar
              query={searchQuery}
              onQueryChange={onSearchQueryChange}
              onSubmitSearch={onSubmitSearch}
              products={products}
              stores={stores}
              categories={categories}
              onSelectProduct={onSelectProduct}
              onSelectStore={onSelectStore}
              onSelectCategory={onSelectCategory}
              language={language}
            />
          </div>

          {/* Right: Language Selector & Store Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div
              role="group"
              aria-label="Language selector"
              className="inline-flex items-center rounded-lg border border-[#E3E9F4] bg-[#F6F8FC] p-0.5"
            >
              <Globe className="size-3.5 text-[#64748B] ml-2 mr-1 hidden sm:block" aria-hidden="true" />
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  language === 'en'
                    ? 'bg-white text-[#0A1740] shadow-xs'
                    : 'text-[#64748B] hover:text-[#111827]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('fr')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  language === 'fr'
                    ? 'bg-white text-[#0A1740] shadow-xs'
                    : 'text-[#64748B] hover:text-[#111827]'
                }`}
              >
                FR
              </button>
            </div>

            <button
              type="button"
              onClick={onScrollToStores}
              className="hidden sm:inline-flex h-10 items-center gap-1.5 rounded-lg border border-[#E3E9F4] bg-white px-3.5 text-sm font-semibold text-[#111827] hover:border-[#1749C8]/40 hover:bg-[#F6F8FC] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Store className="size-4 text-[#1749C8]" aria-hidden="true" />
              <span>{t.mobileStores}</span>
            </button>

            <a
              href={EINORT_URLS.signup}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex h-10 items-center gap-1.5 rounded-lg bg-[#0A1740] px-4 text-sm font-semibold text-white hover:bg-[#1749C8] transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.openAStore}</span>
            </a>
          </div>
        </div>

        {/* Mobile Full-Width Search Row */}
        <div className="pb-3 md:hidden">
          <SearchBar
            query={searchQuery}
            onQueryChange={onSearchQueryChange}
            onSubmitSearch={onSubmitSearch}
            products={products}
            stores={stores}
            categories={categories}
            onSelectProduct={onSelectProduct}
            onSelectStore={onSelectStore}
            onSelectCategory={onSelectCategory}
            language={language}
            inputId="einort-mobile-search"
            inputRef={searchInputRef}
          />
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[calc(env(safe-area-inset-top)+0px)] z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#050D24]/60 backdrop-blur-xs"
            onClick={() => onToggleMobileMenu(false)}
          />
          <nav
            aria-label="Mobile marketplace navigation"
            className="relative z-10 flex h-full w-full max-w-xs flex-col bg-white shadow-2xl overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-[#E3E9F4] px-4 py-3.5">
              <EinortLogo variant="light-bg" size="sm" showMarketplaceLabel />
              <button
                type="button"
                onClick={() => onToggleMobileMenu(false)}
                aria-label="Close menu"
                className="inline-flex size-9 items-center justify-center rounded-lg border border-[#E3E9F4] text-[#111827] hover:bg-[#F6F8FC]"
              >
                <X className="size-4.5" />
              </button>
            </div>

            <div className="flex-1 p-4 space-y-6">
              <div>
                <p className="px-2 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                  {t.shopByCategoryTitle}
                </p>
                <ul className="mt-2 space-y-1">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCategory('all');
                        onToggleMobileMenu(false);
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-[#111827] hover:bg-[#F6F8FC]"
                    >
                      <span>{t.allCategories}</span>
                      <ChevronRight className="size-4 text-[#64748B]" />
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectCategory(cat.slug);
                          onToggleMobileMenu(false);
                        }}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-[#111827] hover:bg-[#F6F8FC]"
                      >
                        <span>{language === 'fr' ? cat.nameFr : cat.name}</span>
                        <ChevronRight className="size-4 text-[#64748B]" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#E3E9F4] pt-4">
                <p className="px-2 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                  {t.storesTitle}
                </p>
                <ul className="mt-2 space-y-1">
                  {stores.map((store) => (
                    <li key={store.slug}>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectStore(store);
                          onToggleMobileMenu(false);
                        }}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-[#111827] hover:bg-[#F6F8FC]"
                      >
                        <span>{store.name}</span>
                        <span className="text-xs text-[#64748B] tabular-nums">
                          {store.listingsCount} {t.listingsLabel}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#E3E9F4] pt-4 space-y-2.5">
                <p className="px-2 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                  {t.sellOnEinort}
                </p>
                <a
                  href={EINORT_URLS.signup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1749C8] to-[#6439D6] px-4 py-3 text-sm font-semibold text-white"
                >
                  <Store className="size-4" />
                  <span>{t.openAStore}</span>
                </a>
                <a
                  href={EINORT_URLS.login}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E3E9F4] bg-[#F6F8FC] px-4 py-3 text-sm font-semibold text-[#111827]"
                >
                  <LogIn className="size-4 text-[#1749C8]" />
                  <span>{t.merchantLogin}</span>
                </a>
              </div>

              <div className="border-t border-[#E3E9F4] pt-4 px-2 text-xs text-[#64748B] space-y-1">
                <p className="font-semibold text-[#111827]">{t.footerSupport}</p>
                <p>{EINORT_URLS.supportEmail}</p>
                <p>Douala, Cameroon</p>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
