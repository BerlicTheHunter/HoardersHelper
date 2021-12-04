import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  // ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { ApolloClient } from "apollo-client";
import { setContext } from '@apollo/client/link/context';
import Layout from './components/Layout'

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyCollection from './pages/MyCollection';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

console.log(authLink);

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>    
        <Layout> 
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/mycollection' element={<MyCollection />} />
          </Routes>
        </Layout>
      </Router>
    </ApolloProvider> 
  );
}

export default App;
