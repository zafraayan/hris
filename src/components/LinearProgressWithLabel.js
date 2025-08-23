import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Box flexGrow={1}>
        <LinearProgress variant="determinate" {...props} />
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
