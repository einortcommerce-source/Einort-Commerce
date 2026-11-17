import { EINORT_LOGO_PATH } from '../data/marketplace';

interface EinortLogoProps {
  variant?: 'light-bg' | 'dark-bg';
  size?: 'sm' | 'md' | 'lg';
  showMarketplaceLabel?: boolean;
}

export function EinortLogo({
  variant = 'light-bg',
  size = 'md',
  showMarketplaceLabel = false,
}: EinortLogoProps) {
  const emblemSizes = {
    sm: 'h-8 w-8 rounded-lg',
    md: 'h-10 w-10 rounded-xl',
    lg: 'h-12 w-12 rounded-xl',
  };

  const wordmarkClasses =
    variant === 'dark-bg'
      ? 'text-white'
      : 'text-[#050D24]';

  const subClasses =
    variant === 'dark-bg'
      ? 'text-[#93B4FF]'
      : 'text-[#64748B]';

  return (
    <span className="inline-flex items-center gap-2.5 shrink-0 select-none">
      <span
        className={`relative inline-flex items-center justify-center overflow-hidden bg-[#050D24] ring-1 ${
          variant === 'dark-bg' ? 'ring-white/15' : 'ring-[#0A1740]/12'
        } ${emblemSizes[size]}`}
      >
        <img
          src={EINORT_LOGO_PATH}
          alt="EINORT"
          className="h-full w-full object-contain"
          loading="eager"
          decoding="async"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-heading text-lg sm:text-xl font-extrabold tracking-tight ${wordmarkClasses}`}
        >
          EINORT
        </span>
        {showMarketplaceLabel && (
          <span className={`text-[11px] font-medium tracking-wide ${subClasses}`}>
            Marketplace
          </span>
        )}
      </span>
    </span>
  );
}
