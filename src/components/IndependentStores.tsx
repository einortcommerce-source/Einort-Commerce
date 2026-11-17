import type { MarketplaceProduct, MarketplaceStore } from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import { StoreCard } from './StoreCard';

interface IndependentStoresProps {
  stores: MarketplaceStore[];
  products: MarketplaceProduct[];
  onExploreStore: (store: MarketplaceStore) => void;
  onSelectProduct: (product: MarketplaceProduct) => void;
  language: Language;
  sectionRef?: React.RefObject<HTMLElement | null>;
}

export function IndependentStores({
  stores,
  products,
  onExploreStore,
  onSelectProduct,
  language,
  sectionRef,
}: IndependentStoresProps) {
  const t = TRANSLATIONS[language];

  return (
    <section
      ref={sectionRef}
      id="independent-stores"
      aria-labelledby="independent-stores-heading"
      className="bg-[#F6F8FC] py-10 sm:py-12 lg:py-14 border-b border-[#E3E9F4]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-6 sm:mb-8">
          <h2
            id="independent-stores-heading"
            className="font-heading text-2xl sm:text-[28px] font-bold tracking-tight text-[#050D24]"
          >
            {t.storesTitle}
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-[#64748B]">
            {t.storesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {stores.map((store) => (
            <StoreCard
              key={store.slug}
              store={store}
              storeProducts={products.filter((p) => p.storeSlug === store.slug)}
              onExploreStore={onExploreStore}
              onSelectProduct={onSelectProduct}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
