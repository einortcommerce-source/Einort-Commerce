import { useState } from 'react';
import {
  Shirt,
  Sparkles,
  Smartphone,
  Armchair,
  Package,
  ArrowUpRight,
} from 'lucide-react';
import type { CategorySlug, MarketplaceCategory } from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';

interface CategoryCardProps {
  category: MarketplaceCategory;
  productCount: number;
  isActive: boolean;
  onSelect: (slug: CategorySlug) => void;
  language: Language;
}

const ICON_MAP: Record<Exclude<CategorySlug, 'all'>, React.ComponentType<{ className?: string }>> = {
  'fashion-apparel': Shirt,
  'beauty-cosmetics': Sparkles,
  electronics: Smartphone,
  'furniture-home': Armchair,
  'general-retail': Package,
};

const BG_GRADIENTS: Record<Exclude<CategorySlug, 'all'>, string> = {
  'fashion-apparel': 'from-[#0A1740] to-[#1749C8]',
  'beauty-cosmetics': 'from-[#1749C8] to-[#6439D6]',
  electronics: 'from-[#050D24] to-[#2445B8]',
  'furniture-home': 'from-[#0A1740] to-[#6439D6]',
  'general-retail': 'from-[#2445B8] to-[#8655F0]',
};

export function CategoryCard({
  category,
  productCount,
  isActive,
  onSelect,
  language,
}: CategoryCardProps) {
  const t = TRANSLATIONS[language];
  const [imgError, setImgError] = useState(false);
  const slug = category.slug as Exclude<CategorySlug, 'all'>;
  const Icon = ICON_MAP[slug] ?? Package;

  return (
    <button
      type="button"
      onClick={() => onSelect(category.slug)}
      className={`group flex flex-col overflow-hidden rounded-xl border text-left transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677F8] ${
        isActive
          ? 'border-[#1749C8] bg-[#F6F8FC] ring-2 ring-[#1677F8]/20'
          : 'border-[#E3E9F4] bg-white hover:border-[#1749C8]/45 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#050D24]/5'
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F6F8FC]">
        {category.previewImage && !imgError ? (
          <img
            src={category.previewImage}
            alt={language === 'fr' ? category.nameFr : category.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br ${BG_GRADIENTS[slug]} p-4 text-white`}
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-white/12 ring-1 ring-white/20 backdrop-blur-xs transition-transform duration-200 group-hover:scale-110">
              <Icon className="size-6 text-white" aria-hidden="true" />
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-1.5 p-3.5 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-sm sm:text-[15px] font-semibold text-[#111827] group-hover:text-[#1749C8] transition-colors leading-snug">
            {language === 'fr' ? category.nameFr : category.name}
          </h3>
          <ArrowUpRight
            className="size-4 shrink-0 text-[#64748B] opacity-60 group-hover:opacity-100 group-hover:text-[#1749C8] transition-all"
            aria-hidden="true"
          />
        </div>
        <p className="text-xs text-[#64748B] tabular-nums">
          {productCount > 0
            ? `${productCount} ${t.listingsLabel}`
            : language === 'fr'
              ? 'Catégorie ouverte aux vendeurs'
              : 'Open for merchants'}
        </p>
      </div>
    </button>
  );
}
