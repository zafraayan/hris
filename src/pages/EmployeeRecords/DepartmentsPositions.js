import React from "react";
import { departments } from "../../arrays/departments";
import {
  Box,
  Card,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import ContentTitle from "../../components/ContentTitle";

function DepartmentsPositions() {
  const colors = [
    "#FFCDD2", // light red
    "#C8E6C9", // light green
    "#BBDEFB", // light blue
    "#FFF9C4", // light yellow
    "#D1C4E9", // light purple
    "#FFECB3", // light orange
  ];

  return (
    <>
      <ContentTitle />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // 4 equal columns
          gap: 2,
          width: "100%",
        }}
      >
        {departments.map((el, index) => (
          <Card
            key={index}
            sx={{
              minHeight: 275,
              padding: 1,
              backgroundColor: colors[index % colors.length], // cycle through colors
            }}
          >
            <Typography variant="h6">{el.department}</Typography>
            <List>
              {el.positions.map((pos, i) => (
                <>
                  <ListItem>
                    <ListItemText primary={pos}>{pos}</ListItemText>
                  </ListItem>
                </>
              ))}
            </List>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default DepartmentsPositions;
