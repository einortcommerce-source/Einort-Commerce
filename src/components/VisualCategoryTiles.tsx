import type { CategorySlug, MarketplaceCategory, MarketplaceProduct } from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import { CategoryCard } from './CategoryCard';

interface VisualCategoryTilesProps {
  categories: MarketplaceCategory[];
  products: MarketplaceProduct[];
  activeCategory: CategorySlug;
  onSelectCategory: (slug: CategorySlug) => void;
  language: Language;
}

export function VisualCategoryTiles({
  categories,
  products,
  activeCategory,
  onSelectCategory,
  language,
}: VisualCategoryTilesProps) {
  const t = TRANSLATIONS[language];

  return (
    <section
      aria-labelledby="visual-categories-heading"
      className="bg-white py-8 sm:py-10 lg:py-12 border-b border-[#E3E9F4]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h2
              id="visual-categories-heading"
              className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#050D24]"
            >
              {t.shopByCategoryTitle}
            </h2>
            <p className="mt-1 text-sm text-[#64748B]">{t.shopByCategorySubtitle}</p>
          </div>
          {activeCategory !== 'all' && (
            <button
              type="button"
              onClick={() => onSelectCategory('all')}
              className="text-sm font-semibold text-[#1749C8] hover:underline cursor-pointer"
            >
              {t.resetFilters}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const count = products.filter((p) => p.categorySlug === cat.slug).length;
            return (
              <CategoryCard
                key={cat.slug}
                category={cat}
                productCount={count}
                isActive={activeCategory === cat.slug}
                onSelect={onSelectCategory}
                language={language}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
