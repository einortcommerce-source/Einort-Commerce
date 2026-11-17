import { useState } from 'react';
import { ArrowUpRight, ImageOff, MapPin } from 'lucide-react';
import type { MarketplaceProduct } from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';

interface ProductCardProps {
  product?: MarketplaceProduct;
  isLoading?: boolean;
  compact?: boolean;
  onSelectProduct?: (product: MarketplaceProduct) => void;
  language: Language;
}

export function ProductCard({
  product,
  isLoading = false,
  compact = false,
  onSelectProduct,
  language,
}: ProductCardProps) {
  const t = TRANSLATIONS[language];
  const [imgError, setImgError] = useState(false);

  if (isLoading || !product) {
    return (
      <div
        aria-hidden="true"
        className="flex h-full flex-col overflow-hidden rounded-xl border border-[#E3E9F4] bg-white"
      >
        <div className="aspect-square w-full animate-pulse bg-[#E9EEF8]" />
        <div className="flex flex-1 flex-col gap-2.5 p-3 sm:p-4">
          <div className="h-3.5 w-1/2 animate-pulse rounded bg-[#E9EEF8]" />
          <div className="h-4 w-full animate-pulse rounded bg-[#E9EEF8]" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-[#E9EEF8]" />
          <div className="mt-auto pt-2 flex items-center justify-between">
            <div className="h-5 w-24 animate-pulse rounded bg-[#E9EEF8]" />
            <div className="h-8 w-24 animate-pulse rounded-lg bg-[#E9EEF8]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E3E9F4] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1749C8]/40 hover:shadow-lg hover:shadow-[#050D24]/6 focus-within:ring-2 focus-within:ring-[#1677F8]/35">
      {/* Product Photo Trigger */}
      <button
        type="button"
        onClick={() => onSelectProduct?.(product)}
        aria-label={`Inspect ${product.title} from ${product.storeName}`}
        className="relative aspect-square w-full overflow-hidden bg-[#F6F8FC] text-left focus:outline-none cursor-pointer"
      >
        {!imgError ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#F6F8FC] to-[#E9EEF8] p-4 text-center text-[#64748B]">
            <ImageOff className="size-7 text-[#64748B]/70" aria-hidden="true" />
            <span className="text-xs font-medium line-clamp-2">{product.title}</span>
          </div>
        )}
      </button>

      {/* Card Body */}
      <div className={`flex flex-1 flex-col ${compact ? 'gap-2 p-3' : 'gap-2.5 p-3 sm:p-4'}`}>
        {/* Unboxed Merchant Identity */}
        <p className="flex items-center gap-1 truncate text-xs text-[#64748B]">
          <span className="font-medium text-[#2445B8] truncate">{product.storeName}</span>
          {product.location && (
            <>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-0.5 truncate">
                <MapPin className="size-3 shrink-0 text-[#64748B]" aria-hidden="true" />
                <span>{product.location}</span>
              </span>
            </>
          )}
        </p>

        {/* Title */}
        <button
          type="button"
          onClick={() => onSelectProduct?.(product)}
          className="text-left focus:outline-none cursor-pointer"
        >
          <h3
            className={`line-clamp-2 font-medium text-[#111827] group-hover:text-[#1749C8] transition-colors ${
              compact ? 'text-xs sm:text-sm leading-snug' : 'text-sm sm:text-[15px] leading-snug'
            }`}
          >
            {product.title}
          </h3>
        </button>

        {/* Price + View at Store CTA */}
        <div className="mt-auto pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#F6F8FC]">
          <p className="font-heading text-sm sm:text-base font-bold text-[#050D24] tabular-nums whitespace-nowrap">
            {product.priceFormatted}
          </p>

          <a
            href={product.marketplaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 sm:h-9 items-center justify-center gap-1 rounded-lg border border-[#E3E9F4] bg-[#F6F8FC] px-2.5 sm:px-3 text-xs font-semibold text-[#0A1740] transition-colors hover:border-[#1749C8] hover:bg-[#1749C8] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677F8] whitespace-nowrap shrink-0"
          >
            <span>{t.viewAtStore}</span>
            <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
