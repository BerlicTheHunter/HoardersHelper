import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      password
      mtgCard{
        name
        cmc
        colors
        colorIdentity
        type
        types
        subtypes
        set
        setName
        number
        imageUrl
        rarity
        mvId
        id
      }
    }
  }
`;
