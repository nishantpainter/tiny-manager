import React, { useCallback, useState } from "react";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

import Notes from "TinyManager/containers/Notes";
import Todos from "TinyManager/containers/Todos";
import QuoteService from "TinyManager/services/QuoteService";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";
import { useTranslation } from "TinyManager/providers/TranslationProvider";

const TAB = {
  Todos: 0,
  Notes: 1,
};

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  content: {
    width: "100%",
    height: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 500,
  },
  checkbox: {
    alignSelf: "flex-end",
  },
}));

const quote = QuoteService.getQuote();

function Home() {
  const classes = useStyles();
  const { t } = useTranslation();

  const defaultNotes = TinyManagerAPI.fetchDefaultNotes();

  const [activeTab, setActiveTab] = useState(
    defaultNotes ? TAB.Notes : TAB.Todos
  );

  const [checked, setChecked] = useState(defaultNotes);

  const handleChangeActiveTab = useCallback((event, value) => {
    setActiveTab(value);
  }, []);

  const handleChangeDefaultNotes = useCallback((event) => {
    const { checked } = event.target;
    setChecked(checked);
    TinyManagerAPI.updateDefaultNotes(checked);
  }, []);

  return (
    <Fade in={true}>
      <div className={classes.container}>
        <div className={classes.content}>
          <div>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {quote}
            </Typography>
          </div>
          <div className={classes.checkbox}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={checked}
                  onChange={handleChangeDefaultNotes}
                />
              }
              label={t("Default Notes")}
            />
          </div>
          <div>
            <Tabs
              value={activeTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChangeActiveTab}
            >
              <Tab label={t("Todos")} value={TAB.Todos} />
              <Tab label={t("Notes")} value={TAB.Notes} />
            </Tabs>
          </div>
          {activeTab === TAB.Todos && <Todos />}
          {activeTab === TAB.Notes && <Notes />}
        </div>
      </div>
    </Fade>
  );
}

export default Home;
