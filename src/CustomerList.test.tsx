import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";
import CustomersList from "./CustomerList";

const ListZellerCustomers = gql`
  query ListZellerCustomers {
    listZellerCustomers {
      items {
        id
        name
        email
        role
      }
    }
  }
`;

const mocks = [
  {
    request: {
      query: ListZellerCustomers,
    },
    result: {
      data: {
        listZellerCustomers: {
          items: [
            {
              id: "1",
              name: "Admin J",
              email: "admin1@example.com",
              role: "ADMIN",
            },
            {
              id: "2",
              name: "Manager M",
              email: "manager1@example.com",
              role: "MANAGER",
            },
            {
              id: "3",
              name: "Other K",
              email: "other2@example.com",
              role: "OTHER",
            },
          ],
        },
      },
    },
  },
];

describe("CustomersList component", () => {
  it("renders loading state initially", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CustomersList />
      </MockedProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders loading state if there is no mock data", async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CustomersList />
      </MockedProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
