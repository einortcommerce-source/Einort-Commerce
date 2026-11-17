import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MarketplaceProduct } from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import { ProductCard } from './ProductCard';

interface RecentlyAddedProps {
  products: MarketplaceProduct[];
  onSelectProduct: (product: MarketplaceProduct) => void;
  language: Language;
}

export function RecentlyAdded({
  products,
  onSelectProduct,
  language,
}: RecentlyAddedProps) {
  const t = TRANSLATIONS[language];
  const scrollRef = useRef<HTMLDivElement>(null);

  const recentProducts = products.filter((p) => p.isRecentlyAdded);

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = Math.max(280, Math.floor(el.clientWidth * 0.75));
    el.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  if (recentProducts.length === 0) return null;

  return (
    <section
      id="recently-added"
      aria-labelledby="recently-added-heading"
      className="bg-white py-10 sm:py-12 border-b border-[#E3E9F4]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2
              id="recently-added-heading"
              className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#050D24]"
            >
              {t.recentlyAddedTitle}
            </h2>
            <p className="mt-1 text-sm text-[#64748B]">{t.recentlyAddedSubtitle}</p>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollByAmount('left')}
              aria-label="Scroll recently added left"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-[#E3E9F4] bg-white text-[#111827] hover:border-[#1749C8] hover:text-[#1749C8] transition-colors cursor-pointer"
            >
              <ChevronLeft className="size-4.5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount('right')}
              aria-label="Scroll recently added right"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-[#E3E9F4] bg-white text-[#111827] hover:border-[#1749C8] hover:text-[#1749C8] transition-colors cursor-pointer"
            >
              <ChevronRight className="size-4.5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
        >
          {recentProducts.map((product) => (
            <div
              key={product.id}
              className="w-[46%] sm:w-[31%] md:w-[24%] lg:w-[21%] shrink-0 snap-start"
            >
              <ProductCard
                product={product}
                compact
                onSelectProduct={onSelectProduct}
                language={language}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
