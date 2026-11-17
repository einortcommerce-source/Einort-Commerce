export type CategorySlug =
  | 'all'
  | 'fashion-apparel'
  | 'beauty-cosmetics'
  | 'electronics'
  | 'furniture-home'
  | 'general-retail';

export interface MarketplaceCategory {
  slug: CategorySlug;
  name: string;
  nameFr: string;
  description: string;
  descriptionFr: string;
  url: string;
  subcategories: string[];
  subcategoriesFr: string[];
  previewImage?: string;
}

export interface MarketplaceStore {
  slug: string;
  name: string;
  categorySlug: Exclude<CategorySlug, 'all'>;
  categoryLabel: string;
  categoryLabelFr: string;
  location?: string;
  listingsCount: number;
  logoUrl?: string;
  monogram: string;
  marketplaceUrl: string;
  storefrontUrl: string;
  paymentMethods: string[];
  shortBio: string;
  shortBioFr: string;
}

export interface MarketplaceProduct {
  id: string;
  title: string;
  priceXaf: number;
  priceFormatted: string;
  storeSlug: string;
  storeName: string;
  location?: string;
  categorySlug: Exclude<CategorySlug, 'all'>;
  imageUrl: string;
  marketplaceUrl: string;
  storefrontUrl: string;
  isPopular?: boolean;
  isRecentlyAdded?: boolean;
}

export interface HeroSlide {
  id: string;
  headline: string;
  headlineFr: string;
  subcopy: string;
  subcopyFr: string;
  ctaLabel: string;
  ctaLabelFr: string;
  ctaTarget: 'browse' | 'how-it-works' | 'stores';
  desktopImage: string;
  mobileImage: string;
  imageAlt: string;
}

export const EINORT_URLS = {
  marketplace: 'https://einortcommerce.com/marketplace',
  browseAll: 'https://einortcommerce.com/marketplace/browse',
  search: 'https://einortcommerce.com/marketplace/search',
  signup: 'https://einortcommerce.com/signup',
  login: 'https://einortcommerce.com/login',
  about: 'https://einortcommerce.com/',
  privacy: 'https://einortcommerce.com/privacy',
  terms: 'https://einortcommerce.com/terms',
  cookies: 'https://einortcommerce.com/privacy#cookies',
  supportEmail: 'einortsolutions237@gmail.com',
} as const;

export const EINORT_LOGO_PATH =
  '/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.05.56_884b09be.jpeg';

export const ACCEPTED_SELLER_METHODS = [
  'MTN Mobile Money',
  'Orange Money',
  'Cash on delivery',
  'WhatsApp orders',
] as const;

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'discover-local',
    headline: 'Find Something Good From a Local Store.',
    headlineFr: 'Trouvez des pépites auprès de boutiques locales.',
    subcopy:
      'Discover amazing products from independent EINORT stores across Cameroon, then buy directly on each seller’s own storefront.',
    subcopyFr:
      'Découvrez des produits uniques de boutiques indépendantes EINORT à travers le Cameroun et commandez directement sur leur vitrine.',
    ctaLabel: 'Browse Products',
    ctaLabelFr: 'Parcourir les produits',
    ctaTarget: 'browse',
    desktopImage:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/platform/marketplace-hero/einort-default-shop/wide.webp',
    mobileImage:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/platform/marketplace-hero/einort-default-shop/phone.webp',
    imageAlt: 'Shoppers discovering products from independent local stores on EINORT Cameroon',
  },
  {
    id: 'local-payments',
    headline: 'Pay the Way Each Seller Offers.',
    headlineFr: 'Payez selon les options de chaque vendeur.',
    subcopy:
      'MTN Mobile Money, Orange Money, cash on delivery, or WhatsApp orders — every independent merchant chooses how you pay.',
    subcopyFr:
      'MTN Mobile Money, Orange Money, paiement à la livraison ou commande WhatsApp : chaque boutique choisit ses modes de règlement.',
    ctaLabel: 'How EINORT Works',
    ctaLabelFr: 'Comment ça marche',
    ctaTarget: 'how-it-works',
    desktopImage:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/platform/marketplace-hero/einort-default-pay/wide.webp',
    mobileImage:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/platform/marketplace-hero/einort-default-pay/phone.webp',
    imageAlt: 'Mobile Money and direct storefront payment options in Cameroon',
  },
  {
    id: 'independent-stores',
    headline: 'Shop Local Stores in One Place.',
    headlineFr: 'Des boutiques locales réunies au même endroit.',
    subcopy:
      'Fashion, beauty, electronics, home and everyday retail curated directly from independent Cameroon businesses.',
    subcopyFr:
      'Mode, beauté, électronique, maison et commerce de détail proposés par des commerçants indépendants au Cameroun.',
    ctaLabel: 'Explore Stores',
    ctaLabelFr: 'Découvrir les boutiques',
    ctaTarget: 'stores',
    desktopImage:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/platform/marketplace-hero/23fd585b-abd7-4caf-a6bb-da34dd4d567c/wide.webp',
    mobileImage:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/platform/marketplace-hero/23fd585b-abd7-4caf-a6bb-da34dd4d567c/phone.webp',
    imageAlt: 'Independent merchant showcase on EINORT Marketplace',
  },
];

export const MARKETPLACE_CATEGORIES: MarketplaceCategory[] = [
  {
    slug: 'fashion-apparel',
    name: 'Fashion & Apparel',
    nameFr: 'Mode & vêtements',
    description: 'Handbags, accessories, footwear, and everyday style from Cameroonian boutiques.',
    descriptionFr: 'Sacs à main, accessoires, chaussures et mode du quotidien.',
    url: 'https://einortcommerce.com/marketplace/browse/fashion-apparel',
    subcategories: ['Handbags & Totes', 'Shoulder & Crossbody Bags', 'Top-Handle Bags', 'Everyday Accessories'],
    subcategoriesFr: ['Sacs à main & cabas', 'Sacs bandoulière', 'Sacs à poignée', 'Accessoires du quotidien'],
    previewImage:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/6aa477ae-e80e-4fca-8d37-bd81ec0c7c72/card.webp',
  },
  {
    slug: 'beauty-cosmetics',
    name: 'Beauty & Cosmetics',
    nameFr: 'Beauté & cosmétiques',
    description: 'Skincare essentials, sunscreens, cleansers, scrubs, and body care.',
    descriptionFr: 'Soins du visage, protections solaires, nettoyants, gommages et huiles.',
    url: 'https://einortcommerce.com/marketplace/browse/beauty-cosmetics',
    subcategories: ['Facial Cleansers', 'Sunscreen & SPF', 'Exfoliating Scrubs', 'Body & Radiance Care'],
    subcategoriesFr: ['Nettoyants visage', 'Protections solaires', 'Gommages exfoliants', 'Soins corps & éclat'],
    previewImage:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/U8CbUIw4NygxVSbmT6hbdri54SWWfcw2/products/237ac439-4b3b-4e50-acab-4e28c9271d0a/card.webp',
  },
  {
    slug: 'electronics',
    name: 'Electronics',
    nameFr: 'Électronique',
    description: 'Smartphones, accessories, audio gear, and everyday consumer tech.',
    descriptionFr: 'Smartphones, accessoires, équipements audio et électronique du quotidien.',
    url: 'https://einortcommerce.com/marketplace/browse/electronics',
    subcategories: ['Phones & Accessories', 'Audio & Headphones', 'Computing & Chargers', 'Smart Devices'],
    subcategoriesFr: ['Téléphones & accessoires', 'Audio & écouteurs', 'Informatique & chargeurs', 'Appareils connectés'],
  },
  {
    slug: 'furniture-home',
    name: 'Furniture & Home',
    nameFr: 'Maison & mobilier',
    description: 'Home accents, lighting, storage, and living space essentials.',
    descriptionFr: 'Décoration, luminaires, rangement et essentiels pour la maison.',
    url: 'https://einortcommerce.com/marketplace/browse/furniture-home',
    subcategories: ['Living Room', 'Home Decor', 'Kitchen & Dining', 'Storage & Organization'],
    subcategoriesFr: ['Salon', 'Décoration intérieure', 'Cuisine & table', 'Rangement'],
  },
  {
    slug: 'general-retail',
    name: 'General Retail',
    nameFr: 'Commerce général',
    description: 'Multi-category everyday essentials from local independent merchants.',
    descriptionFr: 'Articles du quotidien proposés par des commerçants locaux indépendants.',
    url: 'https://einortcommerce.com/marketplace/browse/general-retail',
    subcategories: ['Daily Essentials', 'Gifts & Lifestyle', 'Office & Stationery', 'Seasonal Picks'],
    subcategoriesFr: ['Essentiels du quotidien', 'Cadeaux & style de vie', 'Bureau & papeterie', 'Sélections de saison'],
  },
];

export const MARKETPLACE_STORES: MarketplaceStore[] = [
  {
    slug: 'joaccessories',
    name: 'Joaccessories',
    categorySlug: 'fashion-apparel',
    categoryLabel: 'Fashion & apparel',
    categoryLabelFr: 'Mode & vêtements',
    location: 'Douala',
    listingsCount: 22,
    monogram: 'J',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/stores/joaccessories',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
    paymentMethods: ['MTN Mobile Money', 'Cash on delivery', 'WhatsApp orders'],
    shortBio: 'Everyday fashion and curated handbags based in Douala.',
    shortBioFr: 'Sacs à main et accessoires de mode basés à Douala.',
  },
  {
    slug: 'gold-and-green',
    name: 'Gold And Green',
    categorySlug: 'beauty-cosmetics',
    categoryLabel: 'Beauty & cosmetics',
    categoryLabelFr: 'Beauté & cosmétiques',
    listingsCount: 10,
    logoUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/U8CbUIw4NygxVSbmT6hbdri54SWWfcw2/logos/2b551869-e709-4a38-be7a-cd1fd4e43708/small.webp',
    monogram: 'G',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/stores/gold-and-green',
    storefrontUrl: 'https://gold-and-green.einortcommerce.com/',
    paymentMethods: ['MTN Mobile Money', 'Orange Money', 'Cash on delivery', 'WhatsApp orders'],
    shortBio: 'Skincare, facial cleansers, SPF protection, and body radiance essentials.',
    shortBioFr: 'Soins du visage, nettoyants, protection solaire et soins éclat du corps.',
  },
];

function formatXaf(amount: number): string {
  return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} XAF`;
}

export const MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
  // --- Joaccessories (22 live listings, Fashion & apparel, Douala) ---
  {
    id: 'cmw8atryt000o08levltuzihc',
    title: 'Louis Vuitton Alma BB in Damier Ébène Canvas.',
    priceXaf: 35000,
    priceFormatted: formatXaf(35000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/6aa477ae-e80e-4fca-8d37-bd81ec0c7c72/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atryt000o08levltuzihc',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
    isPopular: true,
  },
  {
    id: 'cmw8ats01001408leaoa9vu0v',
    title: 'Hermès Kelly To Go Pouch',
    priceXaf: 25000,
    priceFormatted: formatXaf(25000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/0489a57f-459a-4f1e-aa25-b3659be9078b/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8ats01001408leaoa9vu0v',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
    isPopular: true,
  },
  {
    id: 'cmw8atrzr001008le7k8xd2sg',
    title: 'Chanel Trendy CC Top Handle Flap Bag in red',
    priceXaf: 25000,
    priceFormatted: formatXaf(25000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/7e9ce8f4-e6e7-4553-8c24-fd217f86a229/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atrzr001008le7k8xd2sg',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
    isPopular: true,
  },
  {
    id: 'cmw8atrx9000408lea1iwlmak',
    title: 'Hermès Kelly Sellier Bag in Black Epsom Leather with Gold Hardware.',
    priceXaf: 70000,
    priceFormatted: formatXaf(70000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/9c0e1a94-0c08-4203-88e4-2a6da752d4d4/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atrx9000408lea1iwlmak',
    storefrontUrl:
      'https://joaccessories.einortcommerce.com/p/hermes-kelly-sellier-bag-in-black-epsom-leather-with-gold-ha',
    isPopular: true,
  },
  {
    id: 'cmw8atrwn000008le24mad7rm',
    title: 'JW PEI Harlee Medium Suede Tote in olive green.',
    priceXaf: 80000,
    priceFormatted: formatXaf(80000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/6878591e-233d-4932-8f53-113294d69c04/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atrwn000008le24mad7rm',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
    isPopular: true,
  },
  {
    id: 'cmw8atrxp000a08le781vzz5g',
    title: 'Ferragamo Hug Luxury Leather Handbag – Chocolate Brown',
    priceXaf: 100000,
    priceFormatted: formatXaf(100000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/8e480b61-7bd5-49fc-a5c4-058fc7a04fe3/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atrxp000a08le781vzz5g',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
    isPopular: true,
  },
  {
    id: 'cmw8ats07001608lelmehng8a',
    title: 'Tory Burch Emerson Mini Dome',
    priceXaf: 25000,
    priceFormatted: formatXaf(25000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/4ebe94f4-dbc7-48f6-9950-4f27ef0f8bb9/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8ats07001608lelmehng8a',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
  },
  {
    id: 'cmw8atrzw001208le9b89dgvk',
    title: 'Polène Béri Bag',
    priceXaf: 25000,
    priceFormatted: formatXaf(25000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/936f69e2-9f26-4d66-a60f-962c8d22c3ef/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atrzw001208le9b89dgvk',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
  },
  {
    id: 'cmw8atrzl000y08le1xzfbh2c',
    title: 'Bovip Cut-Out Crescent Shoulder Bag in cognac brown.',
    priceXaf: 25000,
    priceFormatted: formatXaf(25000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/4e346902-8085-448e-9eb9-72c15833c090/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atrzl000y08le1xzfbh2c',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
  },
  {
    id: 'cmw8atrzg000w08lefvh3iwxz',
    title: 'Chanel Small "Kelly" Shopper / Mini Top Handle Flap Bag in black quilted lambskin.',
    priceXaf: 25000,
    priceFormatted: formatXaf(25000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/8f90b8d9-b7bf-4b16-9399-9cc0cc1a37ff/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atrzg000w08lefvh3iwxz',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
  },
  {
    id: 'cmw8atrza000u08levgqirtd9',
    title: 'Coach Tabby Shoulder Bag 20 in Polished Pebble Leather (in Dark Stone / Taupe).',
    priceXaf: 25000,
    priceFormatted: formatXaf(25000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/e1e15b23-1348-479c-805c-83b11c1d96d1/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atrza000u08levgqirtd9',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
  },
  {
    id: 'cmw8atrz5000s08lewy8mosb3',
    title: 'Bottega Veneta Andiamo Bag.',
    priceXaf: 30000,
    priceFormatted: formatXaf(30000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/cd0dfff8-0f83-4b11-ab35-b94d8c25da3a/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atrz5000s08lewy8mosb3',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
  },
  {
    id: 'cmw8atryy000q08leamnkm6zr',
    title: 'Polène Numéro Un in Textured Black.',
    priceXaf: 35000,
    priceFormatted: formatXaf(35000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/a5bc965d-d388-4240-aa77-67a65fee3671/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atryy000q08leamnkm6zr',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
  },
  {
    id: 'cmw8atryn000m08leixt8kwyk',
    title: 'Coach Lana Shoulder Bag 23 in dark stone / taupe pebbled leather, styled with a Coach cherry Bag Charm',
    priceXaf: 40000,
    priceFormatted: formatXaf(40000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/611c319d-8070-4d54-88da-7cd31b98f1e4/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atryn000m08leixt8kwyk',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
  },
  {
    id: 'cmw8atryi000k08legk8zs1p4',
    title: 'Coach Quilted Tabby Shoulder Bag 26 in deep espresso / dark chocolate brown.',
    priceXaf: 35000,
    priceFormatted: formatXaf(35000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/af52a9da-f73a-4273-8ead-56b0722a6731/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atryi000k08legk8zs1p4',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
  },
  {
    id: 'cmw8atryc000i08leta4lbztb',
    title: 'Chrisbella Structured Flap Top-Handle Tote Bag shown in vibrant purple.',
    priceXaf: 40000,
    priceFormatted: formatXaf(40000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/49faa37b-6f1a-4b64-8a02-a9e8ce4d1f71/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atryc000i08leta4lbztb',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
  },
  {
    id: 'cmw8atry7000g08lest3x6rqb',
    title: 'Hermès Birkin Bag',
    priceXaf: 60000,
    priceFormatted: formatXaf(60000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/0bfb052b-e860-449d-b574-b65d736cab4f/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atry7000g08lest3x6rqb',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
  },
  {
    id: 'cmw8atry1000e08le7h11dgw3',
    title: 'Coach Grace Carryall shown in smooth refined leather in a neutral taupe/clay shade',
    priceXaf: 50000,
    priceFormatted: formatXaf(50000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/75555c76-bec9-4b2f-b789-790b55693ecf/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atry1000e08le7h11dgw3',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
  },
  {
    id: 'cmw8atrxv000c08ler4s56qm5',
    title: 'Ferragamo Hug Bag.',
    priceXaf: 65000,
    priceFormatted: formatXaf(65000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/dff26359-ef1c-4fb8-942a-a0bf88e324ee/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atrxv000c08ler4s56qm5',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
  },
  {
    id: 'cmw8atrxk000808le3vdom8qb',
    title: 'Savette Symmetry Pochette in suede.',
    priceXaf: 60000,
    priceFormatted: formatXaf(60000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/e3b70651-9b0c-45cc-bc4a-01af27bf474b/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atrxk000808le3vdom8qb',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
  },
  {
    id: 'cmw8atrxe000608leqmqc144y',
    title: 'Valérie Bag by Jacquemus (shown here in camel suede).',
    priceXaf: 60000,
    priceFormatted: formatXaf(60000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/6e9b6921-60d6-4477-97d5-3993479c7aaf/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atrxe000608leqmqc144y',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
  },
  {
    id: 'cmw8atrwy000208lenp3o60mw',
    title: 'Savette Symmetry Pochette / Symmetry Top Handle in a smooth beige/sand grained leather.',
    priceXaf: 75000,
    priceFormatted: formatXaf(75000),
    storeSlug: 'joaccessories',
    storeName: 'Joaccessories',
    location: 'Douala',
    categorySlug: 'fashion-apparel',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/c7A8Z3KkHPNkJr6DU4dbvxMaFS8QU228/products/12f9efc9-42f1-4abe-85af-e0064c8c3be7/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmw8atrwy000208lenp3o60mw',
    storefrontUrl: 'https://joaccessories.einortcommerce.com/',
  },

  // --- Gold And Green (10 live listings, Beauty & cosmetics) ---
  {
    id: 'cmwihtl83000i08l204zupc8o',
    title: 'KALIYA BEAUTY – Sunscreen SPF 65+',
    priceXaf: 2000,
    priceFormatted: formatXaf(2000),
    storeSlug: 'gold-and-green',
    storeName: 'Gold And Green',
    categorySlug: 'beauty-cosmetics',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/U8CbUIw4NygxVSbmT6hbdri54SWWfcw2/products/237ac439-4b3b-4e50-acab-4e28c9271d0a/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmwihtl83000i08l204zupc8o',
    storefrontUrl: 'https://gold-and-green.einortcommerce.com/',
    isPopular: true,
    isRecentlyAdded: true,
  },
  {
    id: 'cmwihtl7w000g08l2aels475a',
    title: 'Nettoyant Visage Éclaircissant Kojie San – BEVi (Original)',
    priceXaf: 7000,
    priceFormatted: formatXaf(7000),
    storeSlug: 'gold-and-green',
    storeName: 'Gold And Green',
    categorySlug: 'beauty-cosmetics',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/U8CbUIw4NygxVSbmT6hbdri54SWWfcw2/products/db9d0f59-ab08-41b8-86f4-c55a46cd6409/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmwihtl7w000g08l2aels475a',
    storefrontUrl: 'https://gold-and-green.einortcommerce.com/',
    isPopular: true,
    isRecentlyAdded: true,
  },
  {
    id: 'cmwihtl7p000e08l2vunl9hxd',
    title: 'Savon Éclaircissant Kojie San HydroMoist – BEVi (Original)',
    priceXaf: 10000,
    priceFormatted: formatXaf(10000),
    storeSlug: 'gold-and-green',
    storeName: 'Gold And Green',
    categorySlug: 'beauty-cosmetics',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/U8CbUIw4NygxVSbmT6hbdri54SWWfcw2/products/4f2ed8d7-fc64-4d40-b832-85483ffdf414/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmwihtl7p000e08l2vunl9hxd',
    storefrontUrl: 'https://gold-and-green.einortcommerce.com/',
    isRecentlyAdded: true,
  },
  {
    id: 'cmwihtl7i000c08l224fky75t',
    title: 'LUMINIZE – Radiance Face & Body Oil',
    priceXaf: 10000,
    priceFormatted: formatXaf(10000),
    storeSlug: 'gold-and-green',
    storeName: 'Gold And Green',
    categorySlug: 'beauty-cosmetics',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/U8CbUIw4NygxVSbmT6hbdri54SWWfcw2/products/dcf600d8-3a41-48bc-a3e9-0d93557a2661/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmwihtl7i000c08l224fky75t',
    storefrontUrl: 'https://gold-and-green.einortcommerce.com/',
    isRecentlyAdded: true,
  },
  {
    id: 'cmwihtl7b000a08l2fhzwxv4y',
    title: 'LUXCENT – L-Glutathione Plus Marine Collagen',
    priceXaf: 25000,
    priceFormatted: formatXaf(25000),
    storeSlug: 'gold-and-green',
    storeName: 'Gold And Green',
    categorySlug: 'beauty-cosmetics',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/U8CbUIw4NygxVSbmT6hbdri54SWWfcw2/products/2b3fd0fb-2323-4544-945b-cc3e5777df03/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmwihtl7b000a08l2fhzwxv4y',
    storefrontUrl: 'https://gold-and-green.einortcommerce.com/',
    isRecentlyAdded: true,
  },
  {
    id: 'cmwihtl70000808l2oanqogtg',
    title: 'Savon Éclaircissant Kojie San Classic – BEVi',
    priceXaf: 10000,
    priceFormatted: formatXaf(10000),
    storeSlug: 'gold-and-green',
    storeName: 'Gold And Green',
    categorySlug: 'beauty-cosmetics',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/U8CbUIw4NygxVSbmT6hbdri54SWWfcw2/products/246fd44a-b472-46ba-a6f6-f0b12a2882e2/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmwihtl70000808l2oanqogtg',
    storefrontUrl: 'https://gold-and-green.einortcommerce.com/',
    isRecentlyAdded: true,
  },
  {
    id: 'cmwihtl6r000608l2ue9o6xvv',
    title: 'LUMINIZE – Gel Douche Exfoliant à l’Acide Kojique',
    priceXaf: 6000,
    priceFormatted: formatXaf(6000),
    storeSlug: 'gold-and-green',
    storeName: 'Gold And Green',
    categorySlug: 'beauty-cosmetics',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/U8CbUIw4NygxVSbmT6hbdri54SWWfcw2/products/81756e38-2641-40a3-94cd-918894c544e6/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmwihtl6r000608l2ue9o6xvv',
    storefrontUrl: 'https://gold-and-green.einortcommerce.com/',
    isRecentlyAdded: true,
  },
  {
    id: 'cmwihtl6k000408l2y9a3b8yc',
    title: 'LUMINIZE – Gommage Fin Éclat & Douceur',
    priceXaf: 4000,
    priceFormatted: formatXaf(4000),
    storeSlug: 'gold-and-green',
    storeName: 'Gold And Green',
    categorySlug: 'beauty-cosmetics',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/U8CbUIw4NygxVSbmT6hbdri54SWWfcw2/products/a3aba25c-a50f-4d68-80bd-b06b91c8906f/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmwihtl6k000408l2y9a3b8yc',
    storefrontUrl: 'https://gold-and-green.einortcommerce.com/',
    isRecentlyAdded: true,
  },
  {
    id: 'cmwihtl6d000208l2lx9blfp5',
    title: 'LUMINIZE – Crème de Visage Éclat & Hydratation à l’Acide Kojique',
    priceXaf: 5000,
    priceFormatted: formatXaf(5000),
    storeSlug: 'gold-and-green',
    storeName: 'Gold And Green',
    categorySlug: 'beauty-cosmetics',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/U8CbUIw4NygxVSbmT6hbdri54SWWfcw2/products/e3aedd57-8024-4d03-b7ca-3e41de491b2b/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmwihtl6d000208l2lx9blfp5',
    storefrontUrl: 'https://gold-and-green.einortcommerce.com/',
    isRecentlyAdded: true,
  },
  {
    id: 'cmwihtl5g000008l25mxt3p18',
    title: 'LUMINIZE – Nettoyant Visage Rafraîchissant au Curcuma (100 g)',
    priceXaf: 3500,
    priceFormatted: formatXaf(3500),
    storeSlug: 'gold-and-green',
    storeName: 'Gold And Green',
    categorySlug: 'beauty-cosmetics',
    imageUrl:
      'https://pub-d497d316bdd246b2896bacf3898d3003.r2.dev/tenants/U8CbUIw4NygxVSbmT6hbdri54SWWfcw2/products/db71ffc5-58b1-4200-89f5-9cebc768e904/card.webp',
    marketplaceUrl: 'https://einortcommerce.com/marketplace/listings/cmwihtl5g000008l25mxt3p18',
    storefrontUrl: 'https://gold-and-green.einortcommerce.com/',
    isRecentlyAdded: true,
  },
];
