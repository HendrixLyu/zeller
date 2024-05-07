import React from "react";
import "./App.css";
import styled from "styled-components";
import { ApolloProvider } from "@apollo/react-hooks";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import CustomersList from "./CustomerList";
import awsconfig from "./aws-exports";

const BackgroundContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to top right, #69c0ff 10%, #b7eb8f 85%);
`;

const CustomersListContainer = styled.div`
  margin: 1.5em;
  padding: 2em;
  min-height: 30em;
  min-width: 20em;
  box-shadow: 5px 10px 35px rgb(0 0 0 / 0.3);
  background-color: #fff;
  color: #000;
  overflow: hidden;
  border-radius: 2em;
  @media screen and (max-width: 600px) {
    overflow: visible;
    padding: 0.5em;
    border-radius: 0.2em;
    box-shadow: 8px 2px 30px rgb(0 0 0 / 0.3);
  }
`;

const client = new ApolloClient({
  uri: awsconfig.aws_appsync_graphqlEndpoint,
  cache: new InMemoryCache(),
  headers: {
    "x-api-key": awsconfig.aws_appsync_apiKey,
  },
});

function App() {
  return (
    <BackgroundContainer>
      <ApolloProvider client={client}>
        <CustomersListContainer>
          <CustomersList />
        </CustomersListContainer>
      </ApolloProvider>
    </BackgroundContainer>
  );
}

export default App;
