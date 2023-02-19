import React, { useState } from "react";
import {
  Chip,
  Collapse,
  Container,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { addItemToArray, removeItemFromArray } from "../../utils/utils";

const TypeAhead = ({ data }) => {
  const [searchString, setSearchString] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [displayList, setDisplayList] = useState(false);

  const handleInputChange = (val) => {
    setDisplayList(val.length > 0);
    setSearchString(val);
  };

  const addSelection = (newValue) => {
    setSelectedValues(addItemToArray(selectedValues, newValue));
  };

  const removeSelection = (newValue) => {
    setSelectedValues(removeItemFromArray(selectedValues, newValue));
  };

  const toggleSelection = (newValue) => {
    if (selectedValues.includes(newValue)) {
      removeSelection(newValue);
    } else {
      addSelection(newValue);
    }
  };

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        onChange={(e) => handleInputChange(e.target.value)}
        sx={{ width: "100%" }}
      />

      <Collapse in={selectedValues.length > 0}>
        <Box
          sx={{
            padding: "8px 0",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            maxWidth: "100%",
          }}
        >
          {selectedValues?.map((item) => (
            <Chip
              label={item}
              onDelete={() => {
                removeSelection(item);
              }}
              key={item}
            />
          ))}
        </Box>
      </Collapse>

      <Collapse
        in={
          displayList &&
          data?.filter((str) =>
            str?.toLowerCase().includes(searchString?.toLowerCase())
          ).length > 0
        }
        sx={{
          width: "100%",
          marginTop: selectedValues.length <= 0 ? "8px" : 0,
        }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            borderRadius: "4px",
            border: "1px solid lightgrey",
            maxHeight: "316px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "stretch",
            gap: "2px",
          }}
        >
          {data
            ?.filter((str) =>
              str?.toLowerCase().includes(searchString?.toLowerCase())
            )
            ?.map((item) => {
              return (
                <ListItem
                  key={item}
                  onClick={() => toggleSelection(item)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: selectedValues?.includes(item)
                      ? "lightgrey"
                      : "initial",
                  }}
                >
                  {item}
                </ListItem>
              );
            })}
        </List>
      </Collapse>
    </>
  );
};

export default TypeAhead;
