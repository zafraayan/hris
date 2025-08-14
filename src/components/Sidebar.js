import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Collapse,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { Link, NavLink } from "react-router-dom";
import { navItems } from "../arrays/navItems";

const Sidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); // close if clicked again
  };

  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        backgroundColor: "#f4f4f4",
        borderRight: "1px solid #ddd",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        overflowX: "scroll",
      }}
    >
      <Toolbar />
      <List>
        {navItems.map((el, index) => (
          <React.Fragment key={index}>
            <ListItem button onClick={() => handleToggle(index)}>
              <ListItemIcon>{el.icon}</ListItemIcon>
              <ListItemText primary={el.text} />
              {openIndex === index ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {el.subMenu.length > 0 &&
                  el.subMenu.map((sub, subIndex) => (
                    <ListItem
                      key={subIndex}
                      button
                      sx={{
                        pl: 6, // Padding left for indentation
                        py: 1, // Vertical padding
                        my: 0.5, // Margin between items
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <LocationCityIcon fontSize="small" />
                      </ListItemIcon>
                      <Link to={sub.url} style={{ textDecoration: "none" }}>
                        <ListItemText
                          primary={sub.text}
                          sx={{
                            fontSize: "0.9rem",
                            color: "text.secondary",
                          }}
                        />
                      </Link>
                    </ListItem>
                  ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
