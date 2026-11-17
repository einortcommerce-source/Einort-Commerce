import { useState, useMemo } from 'react';
import { ArrowUpDown, Store, SearchX, ChevronDown } from 'lucide-react';
import {
  EINORT_URLS,
  type CategorySlug,
  type MarketplaceCategory,
  type MarketplaceProduct,
} from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import { ProductCard } from './ProductCard';

type SortOrder = 'featured' | 'price-asc' | 'price-desc';

interface ProductGridProps {
  products: MarketplaceProduct[];
  categories: MarketplaceCategory[];
  activeCategory: CategorySlug;
  searchQuery: string;
  onSelectCategory: (slug: CategorySlug) => void;
  onResetFilters: () => void;
  onSelectProduct: (product: MarketplaceProduct) => void;
  language: Language;
  sectionRef?: React.RefObject<HTMLElement | null>;
}

export function ProductGrid({
  products,
  categories,
  activeCategory,
  searchQuery,
  onSelectCategory,
  onResetFilters,
  onSelectProduct,
  language,
  sectionRef,
}: ProductGridProps) {
  const t = TRANSLATIONS[language];
  const [sortOrder, setSortOrder] = useState<SortOrder>('featured');
  const [expanded, setExpanded] = useState(false);

  const filteredProducts = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();

    const list = products.filter((p) => {
      const matchesCat = activeCategory === 'all' || p.categorySlug === activeCategory;
      const matchesSearch =
        trimmed.length === 0 ||
        p.title.toLowerCase().includes(trimmed) ||
        p.storeName.toLowerCase().includes(trimmed) ||
        (p.location && p.location.toLowerCase().includes(trimmed));
      return matchesCat && matchesSearch;
    });

    if (sortOrder === 'price-asc') {
      return [...list].sort((a, b) => a.priceXaf - b.priceXaf);
    }
    if (sortOrder === 'price-desc') {
      return [...list].sort((a, b) => b.priceXaf - a.priceXaf);
    }
    return [...list].sort((a, b) => Number(Boolean(b.isPopular)) - Number(Boolean(a.isPopular)));
  }, [products, activeCategory, searchQuery, sortOrder]);

  const initialCount = 12;
  const isFiltered = activeCategory !== 'all' || searchQuery.trim().length > 0;
  const visibleProducts = expanded || isFiltered ? filteredProducts : filteredProducts.slice(0, initialCount);

  const activeCategoryObj = categories.find((c) => c.slug === activeCategory);

  const headingTitle =
    searchQuery.trim().length > 0
      ? language === 'fr'
        ? `Résultats pour « ${searchQuery.trim()} »`
        : `Results for “${searchQuery.trim()}”`
      : activeCategoryObj
        ? language === 'fr'
          ? activeCategoryObj.nameFr
          : activeCategoryObj.name
        : t.popularTitle;

  return (
    <section
      ref={sectionRef}
      id="popular-products"
      aria-labelledby="popular-products-heading"
      className="bg-[#F6F8FC] py-10 sm:py-12 lg:py-14 border-b border-[#E3E9F4]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header + Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2
              id="popular-products-heading"
              className="font-heading text-2xl sm:text-[28px] font-bold tracking-tight text-[#050D24]"
            >
              {headingTitle}
            </h2>
            <p className="mt-1 text-sm text-[#64748B]">
              {activeCategoryObj
                ? language === 'fr'
                  ? activeCategoryObj.descriptionFr
                  : activeCategoryObj.description
                : t.popularSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-medium text-[#64748B] tabular-nums">
              {filteredProducts.length} {t.listingsLabel}
            </span>

            <div className="relative inline-flex items-center">
              <ArrowUpDown
                className="pointer-events-none absolute left-3 size-3.5 text-[#64748B]"
                aria-hidden="true"
              />
              <label htmlFor="product-sort" className="sr-only">
                Sort products
              </label>
              <select
                id="product-sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="h-9 appearance-none rounded-lg border border-[#E3E9F4] bg-white pl-8 pr-8 text-xs sm:text-sm font-medium text-[#111827] hover:border-[#1749C8]/40 focus:border-[#1749C8] focus:outline-none cursor-pointer"
              >
                <option value="featured">{t.sortFeatured}</option>
                <option value="price-asc">{t.sortPriceAsc}</option>
                <option value="price-desc">{t.sortPriceDesc}</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2.5 size-3.5 text-[#64748B]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Interactive Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter products by category"
          className="mb-6 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'all'}
            onClick={() => onSelectCategory('all')}
            className={`h-9 rounded-lg px-3.5 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#0A1740] text-white shadow-xs'
                : 'bg-white border border-[#E3E9F4] text-[#64748B] hover:text-[#111827]'
            }`}
          >
            {t.allCategories}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`h-9 rounded-lg px-3.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === cat.slug
                  ? 'bg-[#1749C8] text-white font-semibold shadow-xs'
                  : 'bg-white border border-[#E3E9F4] text-[#64748B] hover:text-[#111827]'
              }`}
            >
              {language === 'fr' ? cat.nameFr : cat.name}
            </button>
          ))}
        </div>

        {/* Grid or Honest Empty State */}
        {visibleProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E3E9F4] bg-white px-6 py-14 text-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-[#E9EEF8] text-[#1749C8]">
              {searchQuery.trim().length > 0 ? (
                <SearchX className="size-6" aria-hidden="true" />
              ) : (
                <Store className="size-6" aria-hidden="true" />
              )}
            </span>
            <h3 className="mt-4 font-heading text-lg font-bold text-[#050D24]">
              {searchQuery.trim().length > 0 ? t.noResultsTitle : t.categoryEmptyTitle}
            </h3>
            <p className="mt-1.5 max-w-md text-sm text-[#64748B]">
              {searchQuery.trim().length > 0 ? t.noResultsBody : t.categoryEmptyBody}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-[#1749C8] px-5 text-sm font-semibold text-white hover:bg-[#0A1740] transition-colors cursor-pointer"
              >
                {t.resetFilters}
              </button>
              <a
                href={EINORT_URLS.signup}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-[#E3E9F4] bg-white px-5 text-sm font-semibold text-[#111827] hover:bg-[#F6F8FC] transition-colors"
              >
                {t.openAStore}
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                  language={language}
                />
              ))}
            </div>

            {!isFiltered && filteredProducts.length > initialCount && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => !prev)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#E3E9F4] bg-white px-6 text-sm font-semibold text-[#0A1740] shadow-xs hover:border-[#1749C8] hover:text-[#1749C8] transition-colors cursor-pointer"
                >
                  <span>
                    {expanded
                      ? t.showLess
                      : `${t.showMore} (${filteredProducts.length})`}
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
