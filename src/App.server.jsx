import React from 'react';
import renderHydrogen from '@shopify/hydrogen/entry-server';
import {Router, FileRoutes, ShopifyProvider, CartProvider} from '@shopify/hydrogen';
import {Suspense} from 'react';

function App({ request }) {
  const pathname = new URL(request.normalizedUrl).pathname;
  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;

  return (
    <Suspense fallback={null}>
      <ShopifyProvider countryCode={countryCode}>
        <CartProvider countryCode={countryCode}>
          <Router>
            <FileRoutes />
          </Router>
        </CartProvider>
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
