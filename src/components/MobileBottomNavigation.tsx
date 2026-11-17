import { Home, LayoutGrid, Store, Search } from 'lucide-react';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';

interface MobileBottomNavigationProps {
  onHome: () => void;
  onOpenCategories: () => void;
  onStores: () => void;
  onSearch: () => void;
  language: Language;
}

export function MobileBottomNavigation({
  onHome,
  onOpenCategories,
  onStores,
  onSearch,
  language,
}: MobileBottomNavigationProps) {
  const t = TRANSLATIONS[language];

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="fixed bottom-0 inset-x-0 z-30 md:hidden border-t border-[#E3E9F4] bg-white/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-4 h-14">
        <button
          type="button"
          onClick={onHome}
          className="flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-[#111827] hover:text-[#1749C8] transition-colors cursor-pointer"
        >
          <Home className="size-4.5" aria-hidden="true" />
          <span>{t.mobileHome}</span>
        </button>

        <button
          type="button"
          onClick={onOpenCategories}
          className="flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-[#64748B] hover:text-[#1749C8] transition-colors cursor-pointer"
        >
          <LayoutGrid className="size-4.5" aria-hidden="true" />
          <span>{t.mobileCategories}</span>
        </button>

        <button
          type="button"
          onClick={onStores}
          className="flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-[#64748B] hover:text-[#1749C8] transition-colors cursor-pointer"
        >
          <Store className="size-4.5" aria-hidden="true" />
          <span>{t.mobileStores}</span>
        </button>

        <button
          type="button"
          onClick={onSearch}
          className="flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-[#64748B] hover:text-[#1749C8] transition-colors cursor-pointer"
        >
          <Search className="size-4.5" aria-hidden="true" />
          <span>{t.mobileSearch}</span>
        </button>
      </div>
    </nav>
  );
}
