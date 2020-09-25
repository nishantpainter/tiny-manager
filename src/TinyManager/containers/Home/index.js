import React from "react";
import {
  Fade,
  Typography,
  Tabs,
  Tab,
  FormControlLabel,
  Checkbox,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Notes from "TinyManager/containers/Notes";
import Todos from "TinyManager/containers/Todos";
import QuoteService from "TinyManager/services/QuoteService";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";

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

  const defaultNotes = TinyManagerAPI.fetchDefaultNotes() === "true";

  const [activeTab, setActiveTab] = React.useState(defaultNotes ? 1 : 0);
  const [checked, setChecked] = React.useState(defaultNotes);
  const quote = React.useMemo(() => QuoteService.getQuote(), []);

  const handleChangeActiveTab = React.useCallback((e, value) => {
    setActiveTab(value);
  }, []);

  const handleChangeDefaultNotes = React.useCallback((e) => {
    const { checked } = e.target;
    setChecked(checked);
    TinyManagerAPI.updateDefaultNotes(checked);
  }, []);

  return (
    <Fade in={true}>
      <div className={classes.container}>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {quote}
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={checked}
                onChange={handleChangeDefaultNotes}
              />
            }
            label="Default Notes"
          />
        </Box>
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
