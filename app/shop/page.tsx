"use client";

import React, { useState, useEffect } from "react";
import { products, type Product } from "../lib/site-data";

type CartItem = Product & { qty: number; selectedSize?: string; selectedColor?: string };

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "shirt" | "hat" | "sticker">("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("kron-cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("kron-cart", JSON.stringify(cart));
  }, [cart]);

  const filtered = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const addToCart = (product: Product) => {
    const size = product.sizes ? (selectedSize || product.sizes[0]) : undefined;
    const color = product.colors ? (selectedColor || product.colors[0]) : undefined;

    setCart(prev => {
      const existing = prev.findIndex(
        i => i.id === product.id && i.selectedSize === size && i.selectedColor === color
      );
      if (existing >= 0) {
        const copy = [...prev];
        copy[existing] = { ...copy[existing], qty: copy[existing].qty + 1 };
        return copy;
      }
      return [...prev, { ...product, qty: 1, selectedSize: size, selectedColor: color }];
    });

    setIsCartOpen(true);
    setSelectedSize("");
    setSelectedColor("");
    setSelectedProduct(null);
  };

  const updateQty = (index: number, newQty: number) => {
    if (newQty < 1) return;
    setCart(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], qty: newQty };
      return copy;
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleCheckout = () => {
    alert(
      `Thank you! This would normally redirect to Stripe Checkout for $${cartTotal}.\n\n` +
      "To wire up real payments:\n" +
      "1. Create a Stripe account (free)\n" +
      "2. Add your publishable key\n" +
      "3. Create products/prices or use Payment Links\n" +
      "4. Replace this with real checkout flow.\n\n" +
      "Current cart items logged to console."
    );
    console.log("Checkout items:", cart);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#d4af37] uppercase">THE KRONNOISSEUR</p>
            <h1 className="font-semibold text-5xl tracking-tighter">The Shop</h1>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-5 py-2 text-sm border border-white/20 bg-white/5 rounded-full hover:bg-white/10"
          >
            Cart <span className="bg-[#d4af37] text-[#050a08] px-2 py-0.5 rounded-full text-xs font-bold">{cartCount}</span>
          </button>
        </div>

        <p className="max-w-md text-white/70">Limited drops. Premium blanks. Built for the culture. All sales final on custom goods.</p>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {(["all", "shirt", "hat", "sticker"] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-1.5 text-sm rounded-full transition ${activeCategory === cat ? "bg-[#d4af37] text-[#050a08] font-semibold" : "bg-white/5 border border-white/10 hover:bg-white/10"}`}
            >
              {cat === "all" ? "All Goods" : cat + "s"}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map(product => (
            <div key={product.id} className="group rounded-2xl border border-white/10 bg-zinc-950 overflow-hidden flex flex-col">
              <div className="relative aspect-[16/12] bg-black">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="absolute inset-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 transition" 
                />
                {!product.inStock && (
                  <div className="absolute top-3 right-3 bg-black/70 px-3 py-1 text-xs rounded">SOLD OUT</div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <span className="text-[#d4af37] font-semibold">${product.price}</span>
                </div>
                <p className="text-sm text-white/70 mt-2 flex-1">{product.description}</p>

                {product.sizes && <div className="text-xs text-white/50 mt-3">Sizes: {product.sizes.join(" · ")}</div>}
                {product.colors && <div className="text-xs text-white/50">Colors: {product.colors.join(" · ")}</div>}

                <button
                  disabled={!product.inStock}
                  onClick={() => {
                    if (product.sizes || product.colors) {
                      setSelectedProduct(product);
                      setSelectedSize("");
                      setSelectedColor("");
                    } else {
                      addToCart(product);
                    }
                  }}
                  className="mt-5 w-full py-3 rounded-full bg-white text-[#050a08] font-semibold disabled:opacity-50 hover:bg-[#d4af37] hover:text-[#050a08] transition"
                >
                  {product.inStock ? "Add to Cart" : "Sold Out"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Variant Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6" onClick={() => setSelectedProduct(null)}>
          <div className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-2xl p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-2xl">{selectedProduct.name}</h3>
            <p className="text-[#d4af37]">${selectedProduct.price}</p>

            {selectedProduct.sizes && (
              <div className="mt-5">
                <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Size</div>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)} className={`px-4 py-1 text-sm rounded border ${selectedSize === s ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]" : "border-white/20 hover:bg-white/5"}`}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            {selectedProduct.colors && (
              <div className="mt-4">
                <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Color</div>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.colors.map(c => (
                    <button key={c} onClick={() => setSelectedColor(c)} className={`px-4 py-1 text-sm rounded border ${selectedColor === c ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]" : "border-white/20 hover:bg-white/5"}`}>{c}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button onClick={() => setSelectedProduct(null)} className="flex-1 py-3 border border-white/30 rounded-full">Cancel</button>
              <button onClick={() => addToCart(selectedProduct)} className="flex-1 py-3 bg-[#d4af37] text-[#050a08] font-semibold rounded-full">Add to Cart</button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex" onClick={() => setIsCartOpen(false)}>
          <div className="ml-auto w-full max-w-md h-full bg-[#050a08] border-l border-white/10 flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-white/10 flex justify-between">
              <div className="text-xl font-semibold">Your Cart</div>
              <button onClick={() => setIsCartOpen(false)}>Close</button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-white/50">Your cart is empty.</div>
            ) : (
              <>
                <div className="flex-1 overflow-auto p-6 space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex gap-4 border-b border-white/10 pb-4">
                      <div className="w-20 h-20 bg-zinc-900 rounded overflow-hidden flex-shrink-0">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1 text-sm">
                        <div className="font-medium">{item.name}</div>
                        {(item.selectedSize || item.selectedColor) && <div className="text-xs text-white/50">{item.selectedSize} {item.selectedColor}</div>}
                        <div className="text-[#d4af37] mt-0.5">${item.price} × {item.qty}</div>
                        <div className="mt-2 flex items-center gap-2 text-xs">
                          <button onClick={() => updateQty(idx, item.qty - 1)} className="px-2 py-0.5 border border-white/20 rounded active:bg-white/10">-</button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(idx, item.qty + 1)} className="px-2 py-0.5 border border-white/20 rounded active:bg-white/10">+</button>
                          <button onClick={() => removeFromCart(idx)} className="ml-auto text-red-400/80 hover:text-red-400">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-white/10">
                  <div className="flex justify-between text-lg mb-4">
                    <span>Total</span>
                    <span className="font-semibold text-[#d4af37]">${cartTotal}</span>
                  </div>
                  <button onClick={handleCheckout} className="w-full py-4 bg-[#d4af37] text-[#050a08] font-semibold rounded-full">
                    Checkout with Stripe
                  </button>
                  <p className="mt-3 text-center text-[10px] text-white/40">Secure • Ships to all 50 states • 21+</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
