import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_MTGCARD = gql`
  mutation saveMTGcard($MTGCardData: MTGCardInput!) {
    saveMTGcard(MTGCardData: $MTGCardData) {
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

export const REMOVE_MTGCARD = gql`
  mutation removeMTGCard($MTGCardId: ID!) {
    removeBook(MTGCardId: $MTGCardId) {
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