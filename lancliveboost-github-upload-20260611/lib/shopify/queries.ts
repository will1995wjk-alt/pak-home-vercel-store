const PRODUCT_FRAGMENT = `#graphql
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    productType
    onlineStoreUrl
    availableForSale
    totalInventory
    tags
    seo {
      title
      description
    }
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 8) {
      nodes {
        url
        altText
        width
        height
      }
    }
    options {
      name
      optionValues {
        name
      }
    }
    collections(first: 10) {
      nodes {
        id
        handle
        title
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 30) {
      nodes {
        id
        title
        sku
        availableForSale
        quantityAvailable
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        image {
          url
          altText
          width
          height
        }
      }
    }
  }
`;

export const PRODUCTS_QUERY = `#graphql
  ${PRODUCT_FRAGMENT}
  query Products($first: Int = 12, $after: String, $query: String, $sortKey: ProductSortKeys = BEST_SELLING) {
    products(first: $first, after: $after, query: $query, sortKey: $sortKey) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...ProductFields
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `#graphql
  ${PRODUCT_FRAGMENT}
  query ProductByHandle($handle: String!) {
    productByHandle: product(handle: $handle) {
      ...ProductFields
      relatedCollection: collections(first: 1) {
        nodes {
          handle
          products(first: 8) {
            nodes {
              ...ProductFields
            }
          }
        }
      }
    }
  }
`;

export const COLLECTIONS_QUERY = `#graphql
  query Collections($first: Int = 20, $after: String) {
    collections(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        handle
        title
        description
        image {
          url
          altText
          width
          height
        }
      }
    }
  }
`;

export const COLLECTION_BY_HANDLE_QUERY = `#graphql
  ${PRODUCT_FRAGMENT}
  query CollectionByHandle($handle: String!, $first: Int = 24, $after: String) {
    collectionByHandle: collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        url
        altText
        width
        height
      }
      products(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ...ProductFields
        }
      }
    }
  }
`;

export const CART_QUERY = `#graphql
  query Cart($id: ID!) {
    cart(id: $id) {
      id
      checkoutUrl
      totalQuantity
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 50) {
        nodes {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              sku
              availableForSale
              quantityAvailable
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
                width
                height
              }
              product {
                title
                handle
                featuredImage {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_FRAGMENT}
  query SearchProducts($query: String!, $first: Int = 24, $after: String) {
    products(first: $first, after: $after, query: $query, sortKey: RELEVANCE) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...ProductFields
      }
    }
  }
`;
