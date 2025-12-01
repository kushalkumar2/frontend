import { topwearData } from './topwearData';
import { bottomwearData } from './bottomwearData';
import { athleisureData } from './athleisureData';
import { trendingData } from './trendingData';


// Combine all arrays into one
const combinedData = [
  ...topwearData,
  ...bottomwearData,
  ...athleisureData,
  ...trendingData,
];

// Use a Map to automatically handle duplicates, keeping the first one seen
const uniqueProductsMap = new Map();
combinedData.forEach(product => {
  if (!uniqueProductsMap.has(product.id)) {
    uniqueProductsMap.set(product.id, product);
  }
});

export const allProducts = Array.from(uniqueProductsMap.values());