import {Suspense} from 'react';
import {useShopQuery, gql, useLocalization, Seo} from '@shopify/hydrogen';

import {ALL_PRODUCTS_FRAGMENT} from '~/lib/fragments';
import {PAGINATION_SIZE} from '~/lib/const';
import {ProductGrid, PageHeader, Section} from '~/components';
import {Layout} from '~/components/index.server';

export default function Home() {
  return (
    <Layout>
      <Seo type="page" data={{title: 'All Products'}} />
      <PageHeader heading="All Products" variant="allCollections" />
      <Section>
        <Suspense>
          <AllProductsGrid />
        </Suspense>
      </Section>
    </Layout>
  );
}

function AllProductsGrid() {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data} = useShopQuery({
    query: ALL_PRODUCTS_QUERY,
    variables: {
      country: countryCode,
      language: languageCode,
      pageBy: PAGINATION_SIZE,
    },
    preload: true,
  });

  const products = data.products;

  return (
    <ProductGrid
      key="products"
      url={`/products?country=${countryCode}`}
      collection={{products}}
    />
  );
}

const ALL_PRODUCTS_QUERY = gql`
  ${ALL_PRODUCTS_FRAGMENT}
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
    $cursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $pageBy, after: $cursor) {
      nodes {
        ...ProductFirstPage
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;