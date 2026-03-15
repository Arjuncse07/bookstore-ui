import type { Product } from "./types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex h-48 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-auto object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/150?text=No+Image";
          }}
        />
      </div>
      <h3 className="truncate text-sm font-semibold text-gray-900">
        {product.name}
      </h3>
      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
        {product.description}
      </p>
      <p className="mt-2 text-lg font-bold text-indigo-600">
        ${product.price.toFixed(2)}
      </p>
    </div>
  );
}
