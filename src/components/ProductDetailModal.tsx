import { useEffect } from 'react';
import { X, ArrowUpRight, Store, MapPin, Wallet } from 'lucide-react';
import type { MarketplaceProduct, MarketplaceStore } from '../data/marketplace';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';

interface ProductDetailModalProps {
  product: MarketplaceProduct | null;
  store?: MarketplaceStore;
  onClose: () => void;
  onOpenStore: (store: MarketplaceStore) => void;
  language: Language;
}

export function ProductDetailModal({
  product,
  store,
  onClose,
  onOpenStore,
  language,
}: ProductDetailModalProps) {
  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (!product) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div
        className="fixed inset-0 bg-[#050D24]/65 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-t-2xl sm:rounded-2xl border border-[#E3E9F4] bg-white shadow-2xl max-h-[90vh] flex flex-col">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-3 top-3 z-20 inline-flex size-9 items-center justify-center rounded-lg border border-[#E3E9F4] bg-white/95 text-[#111827] hover:bg-[#F6F8FC] transition-colors cursor-pointer"
        >
          <X className="size-4.5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
          {/* Left: Product Image */}
          <div className="aspect-square bg-[#F6F8FC] border-b md:border-b-0 md:border-r border-[#E3E9F4]">
            <img
              src={product.imageUrl}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right: Merchant Handoff Details */}
          <div className="flex flex-col justify-between p-5 sm:p-7 gap-5">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
                <span className="font-semibold text-[#1749C8]">{product.storeName}</span>
                {product.location && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5" aria-hidden="true" />
                      <span>{product.location}</span>
                    </span>
                  </>
                )}
              </div>

              <h2
                id="product-modal-title"
                className="font-heading text-xl sm:text-2xl font-bold text-[#050D24] leading-snug pr-6"
              >
                {product.title}
              </h2>

              <p className="font-heading text-2xl font-extrabold text-[#0A1740] tabular-nums">
                {product.priceFormatted}
              </p>

              <div className="rounded-xl border border-[#E3E9F4] bg-[#F6F8FC] p-4 space-y-2">
                <p className="flex items-center gap-2 text-xs font-semibold text-[#0A1740]">
                  <Wallet className="size-4 text-[#1749C8]" aria-hidden="true" />
                  <span>
                    {language === 'fr'
                      ? 'Achat direct sur la boutique du vendeur'
                      : 'Direct purchase on the merchant’s own storefront'}
                  </span>
                </p>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {language === 'fr'
                    ? `Vous achetez directement auprès de ${product.storeName} sur EINORT. Les options de règlement incluent généralement Mobile Money, paiement à la livraison ou commande WhatsApp selon la boutique.`
                    : `You order directly from ${product.storeName} on their EINORT store. Sellers accept options such as MTN Mobile Money, Orange Money, cash on delivery, or WhatsApp orders.`}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-[#E3E9F4]">
              <a
                href={product.marketplaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1749C8] to-[#6439D6] px-5 text-sm font-semibold text-white shadow-sm hover:brightness-110 transition-all"
              >
                <span>{t.viewAtStore}</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>

              {store && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenStore(store);
                  }}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#E3E9F4] bg-white px-5 text-sm font-semibold text-[#0A1740] hover:bg-[#F6F8FC] transition-colors cursor-pointer"
                >
                  <Store className="size-4 text-[#1749C8]" aria-hidden="true" />
                  <span>
                    {language === 'fr'
                      ? `Tout voir chez ${store.name} (${store.listingsCount})`
                      : `Browse all ${store.listingsCount} items from ${store.name}`}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
