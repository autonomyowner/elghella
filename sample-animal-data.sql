-- Sample Animal Listings Data for Elghella Marketplace
-- This file contains sample data for the animal_listings table

-- Insert sample animal listings (Note: Replace user_id with actual profile IDs)
INSERT INTO animal_listings (
  user_id,
  title,
  description,
  price,
  currency,
  animal_type,
  breed,
  age_months,
  gender,
  quantity,
  health_status,
  vaccination_status,
  location,
  images,
  weight_kg,
  price_per_head,
  purpose,
  is_featured
) VALUES
-- Sheep listings
(
  (SELECT id FROM profiles LIMIT 1),
  'أغنام عواسي عالية الجودة للبيع',
  'أغنام عواسي أصيلة، تربية محلية، صحة ممتازة، مُطعمة بالكامل. مناسبة للذبح أو التربية. الأغنام في حالة صحية ممتازة ومُطعمة ضد جميع الأمراض الشائعة.',
  45000,
  'DZD',
  'sheep',
  'عواسي',
  18,
  'mixed',
  25,
  'ممتازة',
  true,
  'ولاية البليدة، دائرة الشريعة',
  '{}',
  55.5,
  true,
  'meat',
  true
),
(
  (SELECT id FROM profiles LIMIT 1),
  'نعاج حوامل للبيع - سلالة رمان',
  'نعاج حوامل من سلالة الرمان المحسنة، عمر سنتين، متوقع الولادة خلال شهر. تربية طبيعية بدون هرمونات.',
  85000,
  'DZD',
  'sheep',
  'رمان محسن',
  24,
  'female',
  8,
  'حوامل وبصحة جيدة',
  true,
  'ولاية سطيف، بلدية عين أرنات',
  '{}',
  48.0,
  true,
  'breeding',
  false
),

-- Cow listings
(
  (SELECT id FROM profiles LIMIT 1),
  'بقرة هولشتاين عالية الإنتاج',
  'بقرة هولشتاين أصيلة، عمر 4 سنوات، إنتاج يومي 25-30 لتر حليب. مُطعمة وصحتها ممتازة. مناسبة للمزارع الصغيرة والمتوسطة.',
  180000,
  'DZD',
  'cow',
  'هولشتاين',
  48,
  'female',
  1,
  'ممتازة وعالية الإنتاج',
  true,
  'ولاية قسنطينة، دائرة الخروب',
  '{}',
  450.0,
  false,
  'dairy',
  true
),
(
  (SELECT id FROM profiles LIMIT 1),
  'عجول للتسمين - سلالة مختلطة',
  'عجول صغيرة مناسبة للتسمين، أعمار مختلفة من 6 إلى 12 شهر. تربية محلية، صحة جيدة، مُطعمة.',
  95000,
  'DZD',
  'cow',
  'محلية مختلطة',
  9,
  'mixed',
  6,
  'جيدة',
  true,
  'ولاية تيارت، بلدية السوقر',
  '{}',
  180.0,
  true,
  'meat',
  false
),

-- Goat listings
(
  (SELECT id FROM profiles LIMIT 1),
  'ماعز شامي للبيع - إنتاج حليب عالي',
  'ماعز شامي أصيل، إنتاج حليب ممتاز، مناسب للألبان والتربية. عمر سنتين، صحة ممتازة.',
  35000,
  'DZD',
  'goat',
  'شامي',
  24,
  'female',
  4,
  'ممتازة',
  true,
  'ولاية المسيلة، بلدية سيدي عامر',
  '{}',
  32.0,
  true,
  'dairy',
  false
),
(
  (SELECT id FROM profiles LIMIT 1),
  'جداء صغيرة للتربية',
  'جداء صغيرة من سلالة محلية جيدة، أعمار من 3 إلى 6 أشهر. مناسبة للتربية المنزلية أو التجارية.',
  12000,
  'DZD',
  'goat',
  'محلية',
  4,
  'mixed',
  12,
  'جيدة',
  true,
  'ولاية معسكر، دائرة ماءالعبد',
  '{}',
  8.5,
  true,
  'breeding',
  false
),

-- Chicken listings
(
  (SELECT id FROM profiles LIMIT 1),
  'دجاج بلدي للبيع - تربية طبيعية',
  'دجاج بلدي أصيل، تربية طبيعية بدون علف صناعي. مناسب للبيض واللحم. أعمار مختلفة متوفرة.',
  800,
  'DZD',
  'chicken',
  'بلدي',
  6,
  'mixed',
  50,
  'ممتازة',
  false,
  'ولاية الجلفة، بلدية عين وسارة',
  '{}',
  1.8,
  true,
  'meat',
  false
),
(
  (SELECT id FROM profiles LIMIT 1),
  'دجاج بياض - سلالة إيزا براون',
  'دجاج بياض عالي الإنتاج، سلالة إيزا براون، إنتاج يومي ممتاز. عمر 5 أشهر، جاهز للإنتاج.',
  1200,
  'DZD',
  'chicken',
  'إيزا براون',
  5,
  'female',
  100,
  'ممتازة وجاهزة للإنتاج',
  true,
  'ولاية بسكرة، دائرة طولقة',
  '{}',
  1.6,
  true,
  'breeding',
  true
),

-- Camel listings
(
  (SELECT id FROM profiles LIMIT 1),
  'ناقة سانية للبيع - إنتاج حليب',
  'ناقة سانية أصيلة، عمر 6 سنوات، إنتاج حليب ممتاز. مناسبة للألبان أو التربية. صحة ممتازة وسهلة التعامل.',
  450000,
  'DZD',
  'camel',
  'سانية',
  72,
  'female',
  1,
  'ممتازة',
  false,
  'ولاية ورقلة، دائرة الرويسات',
  '{}',
  380.0,
  false,
  'dairy',
  false
),
(
  (SELECT id FROM profiles LIMIT 1),
  'جمل مهاري للركوب والسياحة',
  'جمل مهاري مدرب، مناسب للركوب والسياحة الصحراوية. عمر 8 سنوات، طباع هادئة ومدرب جيداً.',
  320000,
  'DZD',
  'camel',
  'مهاري',
  96,
  'male',
  1,
  'ممتازة ومدرب',
  false,
  'ولاية تمنراست، بلدية عين صالح',
  '{}',
  420.0,
  false,
  'work',
  true
),

-- Horse listings
(
  (SELECT id FROM profiles LIMIT 1),
  'حصان عربي أصيل للبيع',
  'حصان عربي أصيل، نسب موثقة، عمر 5 سنوات. مناسب للركوب والرياضة. تدريب جيد وطباع ممتازة.',
  850000,
  'DZD',
  'horse',
  'عربي أصيل',
  60,
  'male',
  1,
  'ممتازة ومدرب',
  true,
  'ولاية تيزي وزو، دائرة أزازقة',
  '{}',
  450.0,
  false,
  'work',
  true
),
(
  (SELECT id FROM profiles LIMIT 1),
  'فرس للتربية والإنتاج',
  'فرس من سلالة ممتازة، عمر 4 سنوات، مناسبة للتربية والإنتاج. نسب جيدة وصحة ممتازة.',
  580000,
  'DZD',
  'horse',
  'محلية محسنة',
  48,
  'female',
  1,
  'ممتازة وجاهزة للتربية',
  true,
  'ولاية عنابة، دائرة الحجار',
  '{}',
  380.0,
  false,
  'breeding',
  false
);

-- Update some listings to have sample images (these would be real uploaded image URLs in practice)
UPDATE animal_listings 
SET images = ARRAY[
  'https://fyfgsvuenljeiicpwtjg.Firebase.co/storage/v1/object/public/listings/animals/sheep1.jpg',
  'https://fyfgsvuenljeiicpwtjg.Firebase.co/storage/v1/object/public/listings/animals/sheep2.jpg'
]
WHERE animal_type = 'sheep' AND title LIKE '%عواسي%';

UPDATE animal_listings 
SET images = ARRAY[
  'https://fyfgsvuenljeiicpwtjg.Firebase.co/storage/v1/object/public/listings/animals/cow1.jpg'
]
WHERE animal_type = 'cow' AND title LIKE '%هولشتاين%';

UPDATE animal_listings 
SET images = ARRAY[
  'https://fyfgsvuenljeiicpwtjg.Firebase.co/storage/v1/object/public/listings/animals/chicken1.jpg'
]
WHERE animal_type = 'chicken' AND title LIKE '%إيزا براون%';

-- Success message
SELECT 'Sample animal listings data inserted successfully! 🐄🐑🐐🐓🐪🐎' as message;
