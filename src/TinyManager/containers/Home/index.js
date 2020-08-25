import React from "react";
import Typography from "@material-ui/core/Typography";

import QuoteService from "TinyManager/services/QuoteService";

function Home() {
  const quote = QuoteService.getQuote();

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Home
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {quote}
      </Typography>
    </>
  );
}

export default Home;
