const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const products = [
  {
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear audio with active noise cancellation. Premium build quality with 30-hour battery life.',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
    category: 'Electronics',
    brand: 'ShopVerse',
    rating: 4.8,
    numReviews: 342,
    badge: 'Best Seller',
    countInStock: 10,
    colors: ['#1a1a2e', '#e94560', '#f5f5f5'],
  },
  {
    name: 'Smart Watch Ultra',
    description: 'Advanced health monitoring, GPS, and seamless connectivity. Water resistant to 100m.',
    price: 449.99,
    originalPrice: 549.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
    category: 'Electronics',
    brand: 'ShopVerse',
    rating: 4.7,
    numReviews: 215,
    badge: 'New',
    countInStock: 7,
    colors: ['#1a1a2e', '#c0c0c0', '#ffd700'],
  },
  {
    name: 'MacBook Pro 16" M3',
    description: 'The most powerful MacBook ever. Featuring the M3 Max chip for extreme performance.',
    price: 2499.99,
    originalPrice: 2699.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop',
    category: 'Electronics',
    brand: 'ShopVerse',
    rating: 4.9,
    numReviews: 850,
    badge: 'Elite',
    countInStock: 5,
  },
  {
    name: 'Designer Leather Backpack',
    description: 'Handcrafted from genuine Italian leather. Multiple compartments with laptop sleeve.',
    price: 189.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
    category: 'Fashion',
    brand: 'ShopVerse',
    rating: 4.6,
    numReviews: 178,
    badge: 'Trending',
    countInStock: 5,
    colors: ['#8B4513', '#1a1a2e', '#D2691E'],
  },
  {
    name: 'Minimal Running Shoes',
    description: 'Ultra-lightweight design with responsive cushioning. Perfect for daily runs and workouts.',
    price: 159.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
    category: 'Sports',
    brand: 'ShopVerse',
    rating: 4.5,
    numReviews: 523,
    badge: 'Popular',
    countInStock: 12,
    colors: ['#e94560', '#1a1a2e', '#f5f5f5'],
  },
  {
    name: 'DSLR Professional Camera',
    description: 'Capture stunning 4K video and 45MP photos. The ultimate tool for creators.',
    price: 1899.99,
    originalPrice: 2199.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop',
    category: 'Electronics',
    brand: 'ShopVerse',
    rating: 4.8,
    numReviews: 312,
    badge: 'Professional',
    countInStock: 4,
  },
  {
    name: 'Polarized Aviator Sunglasses',
    description: 'UV400 protection with titanium frame. Scratch-resistant lenses with anti-glare coating.',
    price: 129.99,
    originalPrice: 179.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop',
    category: 'Accessories',
    brand: 'ShopVerse',
    rating: 4.4,
    numReviews: 289,
    badge: 'Sale',
    countInStock: 15,
    colors: ['#1a1a2e', '#ffd700', '#c0c0c0'],
  },
  {
    name: 'Ceramic Pour-Over Coffee Set',
    description: 'Artisan-crafted ceramic dripper with double-wall insulated carafe. Brew café-quality coffee at home.',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1517256064527-9d164d0070e5?q=80&w=600&auto=format&fit=crop',
    category: 'Home',
    brand: 'ShopVerse',
    rating: 4.9,
    numReviews: 156,
    badge: 'Top Rated',
    countInStock: 20,
    colors: ['#f5f5f5', '#1a1a2e', '#8B4513'],
  },
  {
    name: 'Wireless Charging Pad',
    description: 'Fast Qi wireless charging for all compatible devices. Sleek aluminum design with LED indicator.',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=600&auto=format&fit=crop',
    category: 'Electronics',
    brand: 'ShopVerse',
    rating: 4.3,
    numReviews: 412,
    countInStock: 10,
  },
  {
    name: 'Vintage Denim Jacket',
    description: 'Classic fit with modern touches. Premium washed denim with copper hardware accents.',
    price: 119.99,
    originalPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop',
    category: 'Fashion',
    brand: 'ShopVerse',
    rating: 4.6,
    numReviews: 198,
    badge: 'Trending',
    countInStock: 8,
  },
  {
    name: 'Dairy Milk Mini',
    description: 'Sweet chocolate for testing purposes.',
    price: 1,
    originalPrice: 5,
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=600&auto=format&fit=crop",
    category: "Food",
    brand: 'ShopVerse',
    rating: 5,
    numReviews: 120,
    badge: 'Sale',
    countInStock: 100,
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.create({
      name: 'Admin User',
      email: 'admin@shopverse.com',
      password: 'password123',
      isAdmin: true,
    });

    const sampleProducts = products.map((product) => {
      return { ...product, user: createdUser._id };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
