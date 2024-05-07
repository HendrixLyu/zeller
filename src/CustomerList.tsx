import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { ListZellerCustomers } from "./graphql/queries";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  ListItemButton,
  Typography,
} from "@mui/material";
import { lightBlue } from "@mui/material/colors";

interface Customer {
  id: string;
  name: string;
  email: string;
  role: string;
}

function CustomersList() {
  const [userType, setUserType] = useState<string>("admin");
  const [listZellerCustomer, setListZellerCustomer] = useState<Customer[]>([]);

  const LIST_ZELLER_CUSTOMERS = gql`
    ${ListZellerCustomers}
  `;
  const { loading, error, data } = useQuery(LIST_ZELLER_CUSTOMERS);

  useEffect(() => {
    if (data) {
      // setListZellerCustomer(data.listZellerCustomers.items);
      const formattedData = data.listZellerCustomers.items.map(
        (customer: Customer) => ({
          ...customer,
          role: customer.role.toLowerCase(),
        })
      );
      setListZellerCustomer(formattedData);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value);
  };

  const filteredCustomers = listZellerCustomer.filter((customer: Customer) =>
    userType === "admin"
      ? customer.role === "admin"
      : customer.role === "manager"
  );

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: lightBlue[200],
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <>
      <FormLabel id="User-Types">
        <Typography gutterBottom variant="h6" component="div">
          User Types:
        </Typography>
        <RadioGroup
          value={userType}
          defaultValue="admin"
          sx={{
            width: "100%",
            display: 'flex',
            justifyContent: { sm: "space-between", md: "flex-start" },
            marginTop: "1em",
            marginBottom: "1em",
          }}
          onChange={handleChange}
        >
          <ListItemButton
            selected={userType === "admin"}
            sx={{ borderRadius: "1em" }}
          >
            <FormControlLabel
              value="admin"
              control={<Radio id="admin" />}
              label="Admin"
              htmlFor="admin"
            />
          </ListItemButton>
          <ListItemButton
            selected={userType === "manager"}
            sx={{ borderRadius: "1em" }}
          >
            <FormControlLabel
              value="manager"
              control={<Radio id="manager" />}
              label="Manager"
              htmlFor="manager"
            />
          </ListItemButton>
        </RadioGroup>
      </FormLabel>
      <Divider variant="middle" sx={{ width: "90%" }} />
      <Typography gutterBottom variant="h6" component="div" sx={{marginTop: {sm: '0.5em', md: '1em'}}}>
        {userType.charAt(0).toUpperCase() + userType.slice(1)} Users
      </Typography>
      {filteredCustomers && (
        <List
          sx={{ width: "100%", maxWidth: 600, bgcolor: "background.paper" }}
        >
          {filteredCustomers.map((customer: Customer) => (
            <ListItem key={customer.id}>
              <ListItemAvatar>
                <Avatar
                  {...stringAvatar(`${customer.name}`)}
                  variant="square"
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${customer.name}`}
                secondary={`${
                  customer.role.charAt(0).toUpperCase() + customer.role.slice(1)
                }`}
              />
            </ListItem>
          ))}
        </List>
      )}
      <Divider variant="middle" sx={{ width: "90%" }} />
    </>
  );
}

export default CustomersList;
