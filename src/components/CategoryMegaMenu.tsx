import { ArrowRight, Store } from 'lucide-react';
import type {
  CategorySlug,
  MarketplaceCategory,
  MarketplaceProduct,
  MarketplaceStore,
} from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';

interface CategoryMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: MarketplaceCategory[];
  stores: MarketplaceStore[];
  featuredProducts: MarketplaceProduct[];
  activeCategory: CategorySlug;
  onSelectCategory: (slug: CategorySlug) => void;
  onSelectStore: (store: MarketplaceStore) => void;
  onSelectProduct: (product: MarketplaceProduct) => void;
  language: Language;
}

export function CategoryMegaMenu({
  isOpen,
  onClose,
  categories,
  stores,
  featuredProducts,
  activeCategory,
  onSelectCategory,
  onSelectStore,
  onSelectProduct,
  language,
}: CategoryMegaMenuProps) {
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Category directory"
      onMouseLeave={onClose}
      className="hidden lg:block absolute left-0 right-0 top-full z-40 border-b border-[#E3E9F4] bg-white shadow-xl shadow-[#050D24]/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-8">
          {/* Category Groups */}
          <div className="col-span-7 grid grid-cols-3 gap-5 border-r border-[#E3E9F4] pr-6">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.slug;
              const subs = language === 'fr' ? cat.subcategoriesFr : cat.subcategories;

              return (
                <div key={cat.slug} className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat.slug);
                      onClose();
                    }}
                    className={`group flex items-center gap-1.5 text-sm font-bold transition-colors cursor-pointer ${
                      isActive ? 'text-[#1749C8]' : 'text-[#050D24] hover:text-[#1749C8]'
                    }`}
                  >
                    <span>{language === 'fr' ? cat.nameFr : cat.name}</span>
                    <ArrowRight
                      className="size-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                      aria-hidden="true"
                    />
                  </button>
                  <ul className="space-y-1.5">
                    {subs.map((sub) => (
                      <li key={sub}>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectCategory(cat.slug);
                            onClose();
                          }}
                          className="text-xs text-[#64748B] hover:text-[#1749C8] transition-colors text-left cursor-pointer"
                        >
                          {sub}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Right: Featured Stores & Listings Preview */}
          <div className="col-span-5 space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                  {t.storesTitle}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {stores.map((store) => (
                  <button
                    key={store.slug}
                    type="button"
                    onClick={() => {
                      onSelectStore(store);
                      onClose();
                    }}
                    className="flex items-center gap-2.5 rounded-xl border border-[#E3E9F4] bg-[#F6F8FC] p-2.5 text-left hover:border-[#1749C8]/40 hover:bg-white transition-colors cursor-pointer"
                  >
                    {store.logoUrl ? (
                      <img
                        src={store.logoUrl}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="size-9 rounded-lg border border-[#E3E9F4] bg-white object-contain shrink-0"
                      />
                    ) : (
                      <span className="flex size-9 items-center justify-center rounded-lg bg-[#0A1740] font-heading text-xs font-bold text-white shrink-0">
                        {store.monogram}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-[#111827]">
                        {store.name}
                      </p>
                      <p className="truncate text-[11px] text-[#64748B] tabular-nums">
                        {store.listingsCount} {t.listingsLabel}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2.5">
                {t.popularTitle}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {featuredProducts.slice(0, 2).map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="group flex items-center gap-2.5 rounded-xl border border-[#E3E9F4] bg-white p-2 text-left hover:border-[#1749C8]/40 transition-colors cursor-pointer"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="size-12 rounded-lg bg-[#F6F8FC] object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="line-clamp-1 text-xs font-semibold text-[#111827] group-hover:text-[#1749C8]">
                        {product.title}
                      </p>
                      <p className="text-[11px] text-[#64748B] truncate">{product.storeName}</p>
                      <p className="font-heading text-xs font-bold text-[#0A1740] tabular-nums mt-0.5">
                        {product.priceFormatted}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[#E3E9F4]">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#64748B]">
                <Store className="size-3.5 text-[#1749C8]" aria-hidden="true" />
                <span>{t.trustDirect}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('all');
                  onClose();
                }}
                className="text-xs font-semibold text-[#1749C8] hover:underline cursor-pointer"
              >
                {t.browseAll}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
