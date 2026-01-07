# Development Plan

This document outlines the features and improvements to be implemented in the Quikee e-commerce application.

## 1. Fix "Add to Cart" Quantity Bug

*   **Objective:** Ensure that when a user selects a quantity on the product detail page, that exact quantity is added to the cart.
*   **Current State (Bug):** The quantity selector on the product page is ignored. The cart quantity is always incremented by 1, regardless of the user's selection.
*   **Plan:**
    1.  Modify the `addToCart` function in `contexts/CartContext.tsx` to accept a `quantity` parameter.
    2.  Update the `handleAddToCart` function in `app/product/[slug]/page.tsx` to pass the selected quantity to the `addToCart` function.

## 2. Implement Dynamic Category Pages

*   **Objective:** Make the category links in the header and on the homepage functional.
*   **Current State:** The category pages are placeholders and do not display products related to the category.
*   **Plan:**
    1.  Add logic to `app/category/[slug]/page.tsx` to read the `slug` from the URL.
    2.  Filter the `data/products.json` file to find all products matching the category slug.
    3.  Display the filtered products on the page.

## 3. Add Background Images to Category Carousel

*   **Objective:** Fulfill the `overview.md` requirement for the full-screen carousel to have category-specific images, enhancing the homepage's visual appeal.
*   **Current State:** The carousel displays a simple gradient background for each category slide.
*   **Plan:**
    1.  Source high-quality, free-to-use placeholder images online that visually represent each product category.
    2.  Modify the `components/CategoryCarousel.tsx` component to display these images as the background for each respective slide.

## 4. Create About, FAQ, and Contact Pages

*   **Objective:** Create the About, FAQ, and Contact pages to provide essential information to users.
*   **Current State:** These pages result in a "404 Not Found" error as they do not exist.
*   **Plan:**
    1.  Create the necessary files: `app/about/page.tsx`, `app/faq/page.tsx`, and `app/contact/page.tsx`.
    2.  Populate these pages with placeholder content initially.
    3.  Ensure the design of these pages is consistent with the existing design language of the project (layout, fonts, colors, etc.).

## 5. Implement Currency Conversion

*   **Objective:** Implement a fully functional currency conversion feature.
*   **Current State:** The UI allows switching currencies, but the price is not converted.
*   **Plan:**
    1.  Integrate a free, public API (e.g., Frankfurter.app) to fetch real-time exchange rates.
    2.  Update `contexts/CurrencyContext.tsx` to fetch and store these rates.
    3.  Modify the `formatPrice` function to calculate and display prices based on the selected currency and the fetched exchange rates.
    4.  Set a default currency (e.g., USD) for the initial state.
