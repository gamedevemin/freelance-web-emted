export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image_url: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Temizlik Malzemeleri',
    slug: 'cleaning-supplies',
    description: 'Profesyonel temizlik malzemeleri ve ekipmanları',
    image_url: 'https://placehold.co/600x400/e2e8f0/1e40af?text=Temizlik+Malzemeleri',
  },
  {
    id: '2',
    name: 'Tek Kullanımlık Ürünler',
    slug: 'disposable-products',
    description: 'Tek kullanımlık tabak, bardak ve diğer malzemeler',
    image_url: 'https://placehold.co/600x400/e2e8f0/1e40af?text=Tek+Kullanımlık+Ürünler',
  },
  {
    id: '3',
    name: 'Çevre Dostu Ürünler',
    slug: 'eco-friendly',
    description: 'Doğa dostu ve sürdürülebilir ürünler',
    image_url: 'https://placehold.co/600x400/e2e8f0/1e40af?text=Çevre+Dostu+Ürünler',
  },
];

export const products: Product[] = [
  // Temizlik Malzemeleri
  {
    id: '1',
    name: 'Profesyonel Yüzey Temizleyici',
    description: 'Her türlü yüzey için güçlü ve etkili temizlik çözümü. 5L',
    price: 149.90,
    category: 'cleaning-supplies',
    stock: 100,
    image_url: 'https://placehold.co/600x400/e2e8f0/1e40af?text=Yüzey+Temizleyici',
  },
  {
    id: '2',
    name: 'Endüstriyel Zemin Temizleme Makinesi',
    description: 'Geniş alanlar için profesyonel zemin temizleme makinesi',
    price: 12999.90,
    category: 'cleaning-supplies',
    stock: 5,
    image_url: 'https://placehold.co/600x400/e2e8f0/1e40af?text=Zemin+Makinesi',
  },
  {
    id: '3',
    name: 'Çok Amaçlı Temizlik Bezi (50 Adet)',
    description: 'Dayanıklı ve emici mikrofiber temizlik bezleri',
    price: 199.90,
    category: 'cleaning-supplies',
    stock: 200,
    image_url: 'https://placehold.co/600x400/e2e8f0/1e40af?text=Temizlik+Bezi',
  },
  {
    id: '4',
    name: 'Konsantre Dezenfektan (10L)',
    description: 'Hastane standardında güçlü dezenfektan',
    price: 299.90,
    category: 'cleaning-supplies',
    stock: 50,
    image_url: 'https://placehold.co/600x400/e2e8f0/1e40af?text=Dezenfektan',
  },
  {
    id: '5',
    name: 'Profesyonel Temizlik Seti',
    description: 'Komple temizlik ekipmanı seti',
    price: 599.90,
    category: 'cleaning-supplies',
    stock: 30,
    image_url: 'https://placehold.co/600x400/e2e8f0/1e40af?text=Temizlik+Seti',
  },

  // Tek Kullanımlık Ürünler
  {
    id: '6',
    name: 'Karton Bardak (1000 Adet)',
    description: '180ml beyaz karton bardak',
    price: 249.90,
    category: 'disposable-products',
    stock: 100,
    image_url: 'https://placehold.co/600x400/e2e8f0/1e40af?text=Karton+Bardak',
  },
  {
    id: '7',
    name: 'Plastik Çatal (1000 Adet)',
    description: 'Dayanıklı plastik çatal seti',
    price: 199.90,
    category: 'disposable-products',
    stock: 150,
    image_url: 'https://placehold.co/600x400/e2e8f0/1e40af?text=Plastik+Çatal',
  },
  {
    id: '8',
    name: 'Kağıt Tabak (500 Adet)',
    description: '22cm beyaz kağıt tabak',
    price: 299.90,
    category: 'disposable-products',
    stock: 80,
    image_url: 'https://placehold.co/600x400/e2e8f0/1e40af?text=Kağıt+Tabak',
  },
  {
    id: '9',
    name: 'Streç Film (30cm x 300m)',
    description: 'Profesyonel kullanım için gıda ambalaj filmi',
    price: 89.90,
    category: 'disposable-products',
    stock: 200,
    image_url: 'https://placehold.co/600x400/e2e8f0/1e40af?text=Streç+Film',
  },
  {
    id: '10',
    name: 'Alüminyum Folyo (45cm x 150m)',
    description: 'Endüstriyel kullanım için kalın alüminyum folyo',
    price: 199.90,
    category: 'disposable-products',
    stock: 100,
    image_url: 'https://placehold.co/600x400/e2e8f0/1e40af?text=Alüminyum+Folyo',
  },

  // Çevre Dostu Ürünler
  {
    id: '11',
    name: 'Biyobozunur Çatal Kaşık Seti (100 Adet)',
    description: 'Doğada çözünebilen mısır nişastası bazlı çatal kaşık seti',
    price: 149.90,
    category: 'eco-friendly',
    stock: 100,
    image_url: 'https://placehold.co/600x400/e2e8f0/1e40af?text=Biyobozunur+Çatal',
  },
  {
    id: '12',
    name: 'Bambu Havlu Kağıt (6 Rulo)',
    description: 'Bambudan üretilmiş çevre dostu havlu kağıt',
    price: 129.90,
    category: 'eco-friendly',
    stock: 150,
    image_url: 'https://placehold.co/600x400/e2e8f0/1e40af?text=Bambu+Havlu',
  },
  {
    id: '13',
    name: 'Organik Yüzey Temizleyici (5L)',
    description: 'Doğal içerikli, ekolojik yüzey temizleme solüsyonu',
    price: 199.90,
    category: 'eco-friendly',
    stock: 80,
    image_url: 'https://placehold.co/600x400/e2e8f0/1e40af?text=Organik+Temizleyici',
  },
  {
    id: '14',
    name: 'Kompostlanabilir Çöp Poşeti (100 Adet)',
    description: 'Doğada çözünebilen büyük boy çöp poşeti',
    price: 179.90,
    category: 'eco-friendly',
    stock: 120,
    image_url: 'https://placehold.co/600x400/e2e8f0/1e40af?text=Çöp+Poşeti',
  },
  {
    id: '15',
    name: 'Geri Dönüştürülmüş Peçete (1000 Adet)',
    description: 'Geri dönüştürülmüş kağıttan üretilmiş peçete',
    price: 89.90,
    category: 'eco-friendly',
    stock: 200,
    image_url: 'https://placehold.co/600x400/e2e8f0/1e40af?text=Geri+Dönüşümlü+Peçete',
  },
];
