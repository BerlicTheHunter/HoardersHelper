import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      myMTGCards {
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
