import React from "react";
import { Fade, Typography, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Notes from "TinyManager/containers/Notes";
import Todos from "TinyManager/containers/Todos";
import QuoteService from "TinyManager/services/QuoteService";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
  },
  todos: {
    height: "100%",
    overflow: "hidden",
    marginTop: theme.spacing(2),
  },
}));

function Home() {
  const classes = useStyles();

  const [activeTab, setActiveTab] = React.useState(0);
  const quote = React.useMemo(() => QuoteService.getQuote(), []);

  const handleChangeActiveTab = React.useCallback((e, value) => {
    setActiveTab(value);
  }, []);

  return (
    <Fade in={true}>
      <div className={classes.container}>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {quote}
        </Typography>
        <Tabs
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChangeActiveTab}
        >
          <Tab label="Todos" value={0} />
          <Tab label="Notes" value={1} />
        </Tabs>
        {activeTab === 0 && <Todos className={classes.todos} />}
        {activeTab === 1 && <Notes />}
      </div>
    </Fade>
  );
}

export default Home;
