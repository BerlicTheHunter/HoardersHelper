import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      myMTGcards {
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
