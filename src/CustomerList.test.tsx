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
              role: "admin",
            },
            {
              id: "2",
              name: "Manager M",
              email: "manager1@example.com",
              role: "manager",
            },
            {
              id: "3",
              name: "Admin K",
              email: "admin2@example.com",
              role: "admin",
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

  it("renders list of admin users when admin is selected", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CustomersList />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Admin")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText("Admin"));
    expect(screen.getByText("Admin J")).toBeInTheDocument();
    expect(screen.getByText("Admin K")).toBeInTheDocument();
    expect(screen.getByText("Manager M")).toBeNull();
  });

  it("renders list of manager users when manager is selected", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CustomersList />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Manager")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText("Manager"));
    expect(screen.getByText("Manager M")).toBeInTheDocument();
    expect(screen.getByText("Admin J")).toBeNull();
    expect(screen.getByText("Admin K")).toBeNull();
  });
});
