import { useState } from 'react';
import { ArrowUpRight, MapPin, Store } from 'lucide-react';
import type { MarketplaceProduct, MarketplaceStore } from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';

interface StoreCardProps {
  store: MarketplaceStore;
  storeProducts: MarketplaceProduct[];
  onExploreStore: (store: MarketplaceStore) => void;
  onSelectProduct: (product: MarketplaceProduct) => void;
  language: Language;
}

export function StoreCard({
  store,
  storeProducts,
  onExploreStore,
  onSelectProduct,
  language,
}: StoreCardProps) {
  const t = TRANSLATIONS[language];
  const [logoError, setLogoError] = useState(false);

  const previewItems = storeProducts.slice(0, 4);

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-[#E3E9F4] bg-white p-5 sm:p-6 transition-all duration-200 hover:border-[#1749C8]/45 hover:shadow-lg hover:shadow-[#050D24]/6">
      <div>
        {/* Store Identity Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            {store.logoUrl && !logoError ? (
              <div className="size-14 shrink-0 overflow-hidden rounded-xl border border-[#E3E9F4] bg-[#F6F8FC] p-1">
                <img
                  src={store.logoUrl}
                  alt={`${store.name} logo`}
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div
                aria-hidden="true"
                className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0A1740] to-[#1749C8] font-heading text-xl font-bold text-white"
              >
                {store.monogram}
              </div>
            )}

            <div className="min-w-0">
              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#050D24] truncate">
                {store.name}
              </h3>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm text-[#64748B]">
                <span className="font-medium text-[#1749C8]">
                  {language === 'fr' ? store.categoryLabelFr : store.categoryLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {store.listingsCount} {t.listingsLabel}
                </span>
                {store.location && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5 text-[#64748B]" aria-hidden="true" />
                      <span>{store.location}</span>
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Store Bio */}
        <p className="mt-4 text-sm text-[#64748B] leading-relaxed">
          {language === 'fr' ? store.shortBioFr : store.shortBio}
        </p>

        {/* Mini Product Showcase Strip */}
        {previewItems.length > 0 && (
          <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-2.5">
            {previewItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectProduct(item)}
                aria-label={`View ${item.title}`}
                className="group relative aspect-square overflow-hidden rounded-lg border border-[#E3E9F4] bg-[#F6F8FC] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677F8]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Store Actions */}
      <div className="mt-6 pt-4 border-t border-[#E3E9F4] flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onExploreStore(store)}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-[#E3E9F4] bg-[#F6F8FC] px-4 text-sm font-semibold text-[#0A1740] hover:border-[#1749C8]/40 hover:bg-[#E9EEF8] transition-colors cursor-pointer"
        >
          <Store className="size-4 text-[#1749C8]" aria-hidden="true" />
          <span>{t.exploreCatalog}</span>
        </button>

        <a
          href={store.storefrontUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#1749C8] to-[#2445B8] px-5 text-sm font-semibold text-white hover:from-[#0A1740] hover:to-[#1749C8] transition-all"
        >
          <span>{t.visitStore}</span>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
