import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

function Header() {
  return (
    <div>
      <AppBar position="fixed" sx={{ zIndex: 1200 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Statech
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
