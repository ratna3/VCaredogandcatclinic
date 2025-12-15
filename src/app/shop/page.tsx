'use client';

import { useState } from 'react';
import Link from 'next/link';


import { useEffect } from 'react';




export default function ShopPage() {
  const [categories, setCategories] = useState<string[]>(['All']);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [catRes, prodRes] = await Promise.all([
        fetch('/api/admin/categories'),
        fetch('/api/admin/items'),
      ]);
      const catData = catRes.ok ? await catRes.json() : [];
      const prodData = prodRes.ok ? await prodRes.json() : [];
      setCategories(['All', ...catData.map((c: any) => c.name)]);
      setProducts(prodData);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p: any) => p.category && p.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
    switch (sortBy) {
      case 'price-low':
        return a.price_inr - b.price_inr;
      case 'price-high':
        return b.price_inr - a.price_inr;
      default:
        return 0;
    }
  });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="royal-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Pet Shop
          </h1>
          <p className="text-xl text-royal-100 max-w-2xl mx-auto">
            Premium products for your beloved pets. Quality food, toys, and accessories 
            at the best prices.
          </p>
        </div>
      </section>

      {/* Promo Banner */}
      <div className="bg-gold-500 py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white font-semibold">
            🎉 Extra 10% OFF on orders above $100 - Use code: VCARE10
          </p>
        </div>
      </div>

      {/* Shop Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-royal-50 rounded-xl p-6 sticky top-24">
                <h3 className="font-display font-semibold text-royal-900 mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-royal-900 text-white'
                          : 'bg-white text-royal-700 hover:bg-royal-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-grow">
              {/* Sort Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <p className="text-royal-600">
                  Showing {sortedProducts.length} products
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-royal-200 rounded-lg 
                             text-royal-700 focus:outline-none focus:ring-2 focus:ring-royal-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* Products */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl border border-royal-100 overflow-hidden 
                               hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Product Image */}
                    <div className="relative bg-royal-50 p-8 text-center">
                      <span className="text-7xl">{product.image}</span>
                      {product.originalPrice && (
                        <span className="absolute top-4 left-4 bg-red-500 text-white 
                                         text-xs font-bold px-2 py-1 rounded">
                          SALE
                        </span>
                      )}
                      {!product.inStock && (
                        <span className="absolute top-4 right-4 bg-gray-500 text-white 
                                         text-xs font-bold px-2 py-1 rounded">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <span className="text-xs text-royal-500 uppercase tracking-wide">
                        {product.category}
                      </span>
                      <h3 className="font-display font-semibold text-royal-900 mt-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-royal-600 mt-1">{product.description}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex text-gold-500">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-current'
                                  : 'fill-gray-300'
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-royal-500">
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xl font-bold text-royal-900">
                          ₹{product.price_inr ?? product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        disabled={!product.inStock}
                        className={`w-full mt-4 py-2 rounded-lg font-medium transition-colors ${
                          product.inStock
                            ? 'bg-royal-900 text-white hover:bg-royal-700'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-royal-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-royal-900 mb-4">
            Subscribe for Exclusive Deals
          </h2>
          <p className="text-royal-600 max-w-xl mx-auto mb-6">
            Get the latest offers and pet care tips delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg border border-royal-200 
                         focus:outline-none focus:ring-2 focus:ring-royal-500"
            />
            <button type="submit" className="btn-gold whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
