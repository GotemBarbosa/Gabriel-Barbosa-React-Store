import { gql } from "apollo-boost";

const getHeaderData = gql`
  query GetHeaderData {
    categories {
      name
    }
    currencies {
      symbol
      label
    }
  }
`;

const getCurrencies = gql`
  query GetCurrencies {
    currencies {
      symbol
      label
    }
  }
`;

const getProduct = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

const getProducts = gql`
  query GetProducts($type: String!) {
    category(input: { title: $type }) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

const getCartData = gql`
  query GetCartData {
    category {
      products {
        id
        name
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        gallery
        brand
      }
    }
    currencies {
      symbol
      label
    }
  }
`;

export { getHeaderData, getCurrencies, getProduct, getProducts, getCartData };
