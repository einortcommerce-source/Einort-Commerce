import { useState, useRef } from 'react';
import {
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_PRODUCTS,
  MARKETPLACE_STORES,
  type CategorySlug,
  type MarketplaceProduct,
  type MarketplaceStore,
} from './data/marketplace';
import type { Language } from './i18n/translations';
import { AnnouncementBar } from './components/AnnouncementBar';
import { MainHeader } from './components/MainHeader';
import { CategoryNavigation } from './components/CategoryNavigation';
import { HeroBanner } from './components/HeroBanner';
import { VisualCategoryTiles } from './components/VisualCategoryTiles';
import { ProductGrid } from './components/ProductGrid';
import { RecentlyAdded } from './components/RecentlyAdded';
import { IndependentStores } from './components/IndependentStores';
import { HowItWorks } from './components/HowItWorks';
import { MerchantBanner } from './components/MerchantBanner';
import { Footer } from './components/Footer';
import { MobileBottomNavigation } from './components/MobileBottomNavigation';
import { ProductDetailModal } from './components/ProductDetailModal';
import { StoreDetailModal } from './components/StoreDetailModal';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeCategory, setActiveCategory] = useState<CategorySlug>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);
  const [selectedStore, setSelectedStore] = useState<MarketplaceStore | null>(null);

  const catalogRef = useRef<HTMLElement | null>(null);
  const storesRef = useRef<HTMLElement | null>(null);
  const howItWorksRef = useRef<HTMLElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectCategory = (slug: CategorySlug) => {
    setActiveCategory(slug);
    scrollToSection(catalogRef);
  };

  const handleSubmitSearch = (q: string) => {
    setSearchQuery(q);
    scrollToSection(catalogRef);
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
  };

  const selectedProductStore = selectedProduct
    ? MARKETPLACE_STORES.find((s) => s.slug === selectedProduct.storeSlug)
    : undefined;

  return (
    <div id="top" className="min-h-screen flex flex-col bg-white text-[#111827]">
      <AnnouncementBar language={language} />

      <MainHeader
        language={language}
        onLanguageChange={setLanguage}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSubmitSearch={handleSubmitSearch}
        products={MARKETPLACE_PRODUCTS}
        stores={MARKETPLACE_STORES}
        categories={MARKETPLACE_CATEGORIES}
        onSelectProduct={setSelectedProduct}
        onSelectStore={setSelectedStore}
        onSelectCategory={handleSelectCategory}
        onScrollToStores={() => scrollToSection(storesRef)}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={setMobileMenuOpen}
        searchInputRef={searchInputRef}
      />

      <CategoryNavigation
        categories={MARKETPLACE_CATEGORIES}
        stores={MARKETPLACE_STORES}
        featuredProducts={MARKETPLACE_PRODUCTS.filter((p) => p.isPopular)}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onSelectStore={setSelectedStore}
        onSelectProduct={setSelectedProduct}
        language={language}
      />

      <main className="flex-1">
        <HeroBanner
          language={language}
          onBrowseProducts={() => scrollToSection(catalogRef)}
          onScrollToHowItWorks={() => scrollToSection(howItWorksRef)}
          onScrollToStores={() => scrollToSection(storesRef)}
        />

        <VisualCategoryTiles
          categories={MARKETPLACE_CATEGORIES}
          products={MARKETPLACE_PRODUCTS}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          language={language}
        />

        <ProductGrid
          sectionRef={catalogRef}
          products={MARKETPLACE_PRODUCTS}
          categories={MARKETPLACE_CATEGORIES}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onSelectCategory={setActiveCategory}
          onResetFilters={handleResetFilters}
          onSelectProduct={setSelectedProduct}
          language={language}
        />

        <RecentlyAdded
          products={MARKETPLACE_PRODUCTS}
          onSelectProduct={setSelectedProduct}
          language={language}
        />

        <IndependentStores
          sectionRef={storesRef}
          stores={MARKETPLACE_STORES}
          products={MARKETPLACE_PRODUCTS}
          onExploreStore={setSelectedStore}
          onSelectProduct={setSelectedProduct}
          language={language}
        />

        <HowItWorks sectionRef={howItWorksRef} language={language} />

        <MerchantBanner language={language} />
      </main>

      <Footer
        categories={MARKETPLACE_CATEGORIES}
        onSelectCategory={handleSelectCategory}
        onScrollToStores={() => scrollToSection(storesRef)}
        onScrollToRecentlyAdded={() => {
          document.getElementById('recently-added')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onScrollToHowItWorks={() => scrollToSection(howItWorksRef)}
        language={language}
      />

      <MobileBottomNavigation
        onHome={() => {
          handleResetFilters();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCategories={() => setMobileMenuOpen(true)}
        onStores={() => scrollToSection(storesRef)}
        onSearch={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.setTimeout(() => {
            searchInputRef.current?.focus();
          }, 250);
        }}
        language={language}
      />

      <ProductDetailModal
        product={selectedProduct}
        store={selectedProductStore}
        onClose={() => setSelectedProduct(null)}
        onOpenStore={(store) => setSelectedStore(store)}
        language={language}
      />

      <StoreDetailModal
        store={selectedStore}
        products={MARKETPLACE_PRODUCTS}
        onClose={() => setSelectedStore(null)}
        onSelectProduct={setSelectedProduct}
        language={language}
      />
    </div>
  );
}
