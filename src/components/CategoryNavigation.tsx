import { useState, useRef, useEffect } from 'react';
import {
  LayoutGrid,
  Shirt,
  Sparkles,
  Smartphone,
  Armchair,
  Package,
  ChevronDown,
} from 'lucide-react';
import type {
  CategorySlug,
  MarketplaceCategory,
  MarketplaceProduct,
  MarketplaceStore,
} from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import { CategoryMegaMenu } from './CategoryMegaMenu';

interface CategoryNavigationProps {
  categories: MarketplaceCategory[];
  stores: MarketplaceStore[];
  featuredProducts: MarketplaceProduct[];
  activeCategory: CategorySlug;
  onSelectCategory: (slug: CategorySlug) => void;
  onSelectStore: (store: MarketplaceStore) => void;
  onSelectProduct: (product: MarketplaceProduct) => void;
  language: Language;
}

const CATEGORY_ICONS: Record<CategorySlug, React.ComponentType<{ className?: string }>> = {
  all: LayoutGrid,
  'fashion-apparel': Shirt,
  'beauty-cosmetics': Sparkles,
  electronics: Smartphone,
  'furniture-home': Armchair,
  'general-retail': Package,
};

export function CategoryNavigation({
  categories,
  stores,
  featuredProducts,
  activeCategory,
  onSelectCategory,
  onSelectStore,
  onSelectProduct,
  language,
}: CategoryNavigationProps) {
  const t = TRANSLATIONS[language];
  const [megaOpen, setMegaOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div ref={navRef} className="relative border-b border-[#E3E9F4] bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Category navigation"
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-2"
        >
          {/* All Categories (triggers Mega-Menu on desktop, filters all on click) */}
          <button
            type="button"
            onClick={() => {
              onSelectCategory('all');
              setMegaOpen((prev) => !prev);
            }}
            onMouseEnter={() => {
              if (window.innerWidth >= 1024) setMegaOpen(true);
            }}
            aria-expanded={megaOpen}
            className={`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#0A1740] text-white'
                : 'bg-[#F6F8FC] text-[#111827] hover:bg-[#E9EEF8]'
            }`}
          >
            <LayoutGrid className="size-4" aria-hidden="true" />
            <span>{t.allCategories}</span>
            <ChevronDown
              className={`hidden lg:block size-3.5 transition-transform duration-150 ${
                megaOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          <span className="hidden sm:block h-5 w-px bg-[#E3E9F4] mx-1 shrink-0" aria-hidden="true" />

          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.slug] ?? Package;
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => {
                  onSelectCategory(cat.slug);
                  setMegaOpen(false);
                }}
                className={`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#1749C8] to-[#2445B8] text-white font-semibold'
                    : 'text-[#64748B] hover:bg-[#F6F8FC] hover:text-[#111827]'
                }`}
              >
                <Icon
                  className={`size-4 shrink-0 ${isActive ? 'text-white' : 'text-[#64748B]'}`}
                  aria-hidden="true"
                />
                <span>{language === 'fr' ? cat.nameFr : cat.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <CategoryMegaMenu
        isOpen={megaOpen}
        onClose={() => setMegaOpen(false)}
        categories={categories}
        stores={stores}
        featuredProducts={featuredProducts}
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
        onSelectStore={onSelectStore}
        onSelectProduct={onSelectProduct}
        language={language}
      />
    </div>
  );
}
