import React from "react";
import { FormikProps, withFormik } from "formik";
import { WeeklyContract } from "../types.model";
import {
  ISearchContractsActions,
  ISearchContractsValues,
  ISearchContracts,
} from "./SearchContracts.model";
import { TextField, Button, Typography } from "@material-ui/core";

const isValidContractAddress = (address: string): boolean => {
  // && valid address check here? checksum?
  return address !== "0x0000000000000000000000000000000000000000";
};

const handleSubmit = async (
  values: ISearchContractsValues,
  actions: ISearchContractsActions
) => {
  actions.setSubmitting(true);

  const yahooId = values[WeeklyContract.YahooLeagueId];

  try {
    const [season, weekly] = await Promise.all([
      actions.props.factoryContract.methods.seasonLeagues(yahooId).call(),
      actions.props.factoryContract.methods.weeklyLeagues(yahooId).call(),
    ]);

    const seasonIsValid = isValidContractAddress(season);
    const weeklyIsValid = isValidContractAddress(weekly);

    if (seasonIsValid || weeklyIsValid) {
      actions.props.setContracts(() => ({
        weekly: weeklyIsValid ? weekly : null,
        season: seasonIsValid ? season : null,
      }));
      actions.props.setLeagueId(yahooId);
    }

    if (!seasonIsValid && !weeklyIsValid) {
      actions.setFieldError(WeeklyContract.YahooLeagueId, "No contract found");
      actions.props.setContracts(() => ({ season: null, weekly: null }));
    }
    actions.setStatus(undefined);
  } catch (error) {
    actions.setStatus(error);
  }

  actions.setSubmitting(false);
};

const SearchContracts = (
  props: ISearchContracts & FormikProps<ISearchContractsValues>
) => {
  const { handleChange, handleSubmit, values, errors, isSubmitting } = props;

  const hasError =
    !isSubmitting && typeof errors[WeeklyContract.YahooLeagueId] === "string";

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "baseline" }}
      >
        <TextField
          label="Yahoo League Id"
          onChange={handleChange}
          error={hasError}
          type="number"
          name={WeeklyContract.YahooLeagueId}
          helperText={errors[WeeklyContract.YahooLeagueId]}
          value={values[WeeklyContract.YahooLeagueId]}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <div style={{ marginLeft: "4px" }} />
        <Button
          type="submit"
          variant="contained"
          color="default"
          disabled={isSubmitting}
        >
          Search
        </Button>
      </form>
      {props.status !== undefined && (
        <Typography color="error">
          {props.status.message || "Please try again."}
        </Typography>
      )}
    </>
  );
};

export default withFormik({
  mapPropsToValues: (props) => {
    return {
      [WeeklyContract.YahooLeagueId]: 0,
    };
  },
  validate: () => {},
  handleSubmit,
})(SearchContracts);
