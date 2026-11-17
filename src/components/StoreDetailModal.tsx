import { useEffect } from 'react';
import { X, ArrowUpRight, MapPin } from 'lucide-react';
import type { MarketplaceProduct, MarketplaceStore } from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import { ProductCard } from './ProductCard';

interface StoreDetailModalProps {
  store: MarketplaceStore | null;
  products: MarketplaceProduct[];
  onClose: () => void;
  onSelectProduct: (product: MarketplaceProduct) => void;
  language: Language;
}

export function StoreDetailModal({
  store,
  products,
  onClose,
  onSelectProduct,
  language,
}: StoreDetailModalProps) {
  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (!store) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [store, onClose]);

  if (!store) return null;

  const storeProducts = products.filter((p) => p.storeSlug === store.slug);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="store-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div
        className="fixed inset-0 bg-[#050D24]/65 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-t-2xl sm:rounded-2xl border border-[#E3E9F4] bg-[#F6F8FC] shadow-2xl max-h-[90vh] flex flex-col">
        {/* Store Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E3E9F4] bg-white px-5 sm:px-7 py-4 sm:py-5">
          <div className="flex items-center gap-3.5 min-w-0">
            {store.logoUrl ? (
              <img
                src={store.logoUrl}
                alt={`${store.name} logo`}
                referrerPolicy="no-referrer"
                className="size-12 rounded-xl border border-[#E3E9F4] bg-[#F6F8FC] object-contain p-1 shrink-0"
              />
            ) : (
              <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0A1740] to-[#1749C8] font-heading text-lg font-bold text-white shrink-0">
                {store.monogram}
              </span>
            )}
            <div className="min-w-0">
              <h2
                id="store-modal-title"
                className="font-heading text-lg sm:text-xl font-bold text-[#050D24] truncate"
              >
                {store.name}
              </h2>
              <p className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm text-[#64748B]">
                <span>{language === 'fr' ? store.categoryLabelFr : store.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {storeProducts.length} {t.listingsLabel}
                </span>
                {store.location && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5" aria-hidden="true" />
                      <span>{store.location}</span>
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={store.storefrontUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#1749C8] to-[#2445B8] px-4 text-sm font-semibold text-white hover:brightness-110 transition-all"
            >
              <span>{t.visitStore}</span>
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close store preview"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-[#E3E9F4] bg-white text-[#111827] hover:bg-[#F6F8FC] transition-colors cursor-pointer"
            >
              <X className="size-4.5" />
            </button>
          </div>
        </div>

        {/* Store Listings Grid */}
        <div className="overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {storeProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={(p) => {
                  onClose();
                  onSelectProduct(p);
                }}
                language={language}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
