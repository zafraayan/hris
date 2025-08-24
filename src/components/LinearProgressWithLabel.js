import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Box flexGrow={1}>
        <LinearProgress variant="determinate" {...props} />
        <Typography variant="h6" sx={{ mt: 1, fontSize: 12 }} align="center">
          This may take 2 mins or more to populate...
        </Typography>
      </Box>
      <Box minWidth={40}>
        <Typography variant="body2" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default LinearProgressWithLabel;
