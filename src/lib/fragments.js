import { gql } from '@shopify/hydrogen';

export const MEDIA_FRAGMENT = gql`
  fragment Media on Media {
    mediaContentType
    alt
    previewImage {
      url
    }
    ... on MediaImage {
      id
      image {
        url
        width
        height
      }
    }
    ... on Video {
      id
      sources {
        mimeType
        url
      }
    }
    ... on Model3d {
      id
      sources {
        mimeType
        url
      }
    }
    ... on ExternalVideo {
      id
      embedUrl
      host
    }
  }
`;

export const PRODUCT_CARD_FRAGMENT = gql`
  fragment ProductCard on Product {
    id
    title
    publishedAt
    handle
    variants(first: 1, reverse: true) {
      nodes {
        id
        image {
          url
          altText
          width
          height
        }
        priceV2 {
          amount
          currencyCode
        }
        compareAtPriceV2 {
          amount
          currencyCode
        }
      }
    }
  }
`;

export const ALL_PRODUCTS_FRAGMENT = gql`
  fragment ProductFirstPage on Product {
    id
    title
    publishedAt
    handle
    priceRange {
      minVariantPrice { amount, currencyCode }
      maxVariantPrice { amount, currencyCode }
    }
    images(first:1) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
  }
`;
