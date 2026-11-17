import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, Store, ArrowUpRight, Tag } from 'lucide-react';
import type {
  MarketplaceCategory,
  MarketplaceProduct,
  MarketplaceStore,
  CategorySlug,
} from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';

interface SearchBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  onSubmitSearch: (q: string) => void;
  products: MarketplaceProduct[];
  stores: MarketplaceStore[];
  categories: MarketplaceCategory[];
  onSelectProduct: (product: MarketplaceProduct) => void;
  onSelectStore: (store: MarketplaceStore) => void;
  onSelectCategory: (slug: CategorySlug) => void;
  language: Language;
  inputId?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export function SearchBar({
  query,
  onQueryChange,
  onSubmitSearch,
  products,
  stores,
  categories,
  onSelectProduct,
  onSelectStore,
  onSelectCategory,
  language,
  inputId = 'einort-marketplace-search',
  inputRef,
}: SearchBarProps) {
  const t = TRANSLATIONS[language];
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const suggestions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length < 1) {
      return {
        stores: stores.slice(0, 2),
        categories: categories.slice(0, 3),
        products: products.slice(0, 4),
        isDefault: true,
      };
    }

    const matchedStores = stores.filter(
      (s) =>
        s.name.toLowerCase().includes(trimmed) ||
        s.categoryLabel.toLowerCase().includes(trimmed) ||
        (s.location && s.location.toLowerCase().includes(trimmed)),
    );

    const matchedCategories = categories.filter(
      (c) =>
        c.name.toLowerCase().includes(trimmed) ||
        c.nameFr.toLowerCase().includes(trimmed),
    );

    const matchedProducts = products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(trimmed) ||
          p.storeName.toLowerCase().includes(trimmed) ||
          (p.location && p.location.toLowerCase().includes(trimmed)),
      )
      .slice(0, 5);

    return {
      stores: matchedStores,
      categories: matchedCategories,
      products: matchedProducts,
      isDefault: false,
    };
  }, [query, products, stores, categories]);

  const hasAnySuggestion =
    suggestions.stores.length > 0 ||
    suggestions.categories.length > 0 ||
    suggestions.products.length > 0;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSearch(query);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <form
        onSubmit={handleFormSubmit}
        role="search"
        className="flex w-full items-center rounded-xl border border-[#E3E9F4] bg-[#F6F8FC] p-1 transition-all duration-150 focus-within:border-[#1749C8] focus-within:bg-white focus-within:ring-3 focus-within:ring-[#1677F8]/15 hover:border-[#2445B8]/40"
      >
        <label htmlFor={inputId} className="sr-only">
          {t.searchPlaceholder}
        </label>
        <div className="flex flex-1 items-center gap-2.5 pl-3 pr-2 min-w-0">
          <Search className="size-4.5 shrink-0 text-[#64748B]" aria-hidden="true" />
          <input
            ref={inputRef}
            id={inputId}
            type="search"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              onQueryChange(e.target.value);
              setIsOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsOpen(false);
              }
            }}
            placeholder={t.searchPlaceholder}
            autoComplete="off"
            className="w-full bg-transparent py-2 text-sm sm:text-[15px] text-[#111827] placeholder:text-[#64748B] focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => {
                onQueryChange('');
                inputRef?.current?.focus();
              }}
              aria-label="Clear search"
              className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#E9EEF8] hover:text-[#111827] transition-colors"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="inline-flex h-9 sm:h-10 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#1749C8] to-[#1677F8] px-4 sm:px-5 text-sm font-semibold text-white shadow-xs transition-all duration-150 hover:from-[#0A1740] hover:to-[#1749C8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677F8] whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>{t.searchButton}</span>
        </button>
      </form>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Search suggestions"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-[#E3E9F4] bg-white shadow-xl shadow-[#050D24]/8"
        >
          {!hasAnySuggestion ? (
            <div className="px-4 py-6 text-center text-sm text-[#64748B]">
              {t.noResultsTitle} — <button type="button" onClick={() => { onQueryChange(''); setIsOpen(false); }} className="font-semibold text-[#1749C8] hover:underline">{t.resetFilters}</button>
            </div>
          ) : (
            <div className="max-h-[70vh] overflow-y-auto divide-y divide-[#E3E9F4]">
              {suggestions.stores.length > 0 && (
                <div className="p-2.5">
                  <p className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                    {suggestions.isDefault
                      ? language === 'fr'
                        ? 'Boutiques indépendantes'
                        : 'Independent Stores'
                      : language === 'fr'
                        ? 'Boutiques correspondantes'
                        : 'Matching Stores'}
                  </p>
                  <div className="mt-1 grid sm:grid-cols-2 gap-1.5">
                    {suggestions.stores.map((store) => (
                      <button
                        key={store.slug}
                        type="button"
                        onClick={() => {
                          onSelectStore(store);
                          setIsOpen(false);
                        }}
                        className="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-[#F6F8FC] cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {store.logoUrl ? (
                            <img
                              src={store.logoUrl}
                              alt=""
                              referrerPolicy="no-referrer"
                              className="size-8 rounded-lg border border-[#E3E9F4] object-contain bg-white shrink-0"
                            />
                          ) : (
                            <span className="flex size-8 items-center justify-center rounded-lg bg-[#E9EEF8] font-heading text-xs font-bold text-[#0A1740] shrink-0">
                              {store.monogram}
                            </span>
                          )}
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#111827]">
                              {store.name}
                            </p>
                            <p className="truncate text-xs text-[#64748B] tabular-nums">
                              {language === 'fr' ? store.categoryLabelFr : store.categoryLabel} · {store.listingsCount} {t.listingsLabel}
                            </p>
                          </div>
                        </div>
                        <Store className="size-4 text-[#1749C8] shrink-0" aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {suggestions.categories.length > 0 && !suggestions.isDefault && (
                <div className="p-2.5">
                  <p className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                    {language === 'fr' ? 'Catégories' : 'Categories'}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5 px-1">
                    {suggestions.categories.map((cat) => (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={() => {
                          onSelectCategory(cat.slug);
                          setIsOpen(false);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#E3E9F4] bg-[#F6F8FC] px-3 py-1.5 text-xs font-medium text-[#111827] hover:border-[#1749C8] hover:text-[#1749C8] transition-colors cursor-pointer"
                      >
                        <Tag className="size-3.5 text-[#1749C8]" aria-hidden="true" />
                        <span>{language === 'fr' ? cat.nameFr : cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {suggestions.products.length > 0 && (
                <div className="p-2.5">
                  <p className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                    {suggestions.isDefault
                      ? language === 'fr'
                        ? 'Recherches populaires'
                        : 'Popular Listings'
                      : language === 'fr'
                        ? 'Produits'
                        : 'Products'}
                  </p>
                  <ul className="mt-1 space-y-1">
                    {suggestions.products.map((product) => (
                      <li key={product.id}>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectProduct(product);
                            setIsOpen(false);
                          }}
                          className="flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-[#F6F8FC] cursor-pointer"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={product.imageUrl}
                              alt=""
                              referrerPolicy="no-referrer"
                              className="size-10 rounded-lg border border-[#E3E9F4] object-cover bg-[#F6F8FC] shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-[#111827]">
                                {product.title}
                              </p>
                              <p className="truncate text-xs text-[#64748B]">
                                {product.storeName}
                                {product.location ? ` · ${product.location}` : ''}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-heading text-xs sm:text-sm font-semibold text-[#111827] tabular-nums">
                              {product.priceFormatted}
                            </span>
                            <ArrowUpRight className="size-3.5 text-[#64748B]" aria-hidden="true" />
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
