import React from "react";
import { TeamProperties, WeeklyLeagueInstance } from "../types.model";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core/";
import { withFormik, FormikProps } from "formik";
import {
  ISelectWeeklyWinnerValues,
  ISelectWeeklyWinner,
  ISelectWeeklyWinnerActions,
} from "./SelectWeeklyWinner.model";
import { object, string } from "yup";

const handleSubmit = async (
  values: ISelectWeeklyWinnerValues,
  actions: ISelectWeeklyWinnerActions
) => {
  const { contract, accounts } = actions.props;
  actions.setSubmitting(true);
  const teamId = parseInt(values[TeamProperties.TeamId], 10);

  try {
    await (contract as WeeklyLeagueInstance).methods.payOutWeek(teamId).send({
      from: accounts[0],
    });
    actions.setStatus(undefined);
  } catch (error) {
    actions.setStatus(error);
  }

  actions.setSubmitting(false);
};

function SelectWinner(
  props: ISelectWeeklyWinner & FormikProps<ISelectWeeklyWinnerValues>
) {
  const { color, handleChange, submitForm, managers, values } = props;
  return (
    <form>
      <FormControl fullWidth>
        <InputLabel color={color} id="pick-winner">
          Team Id
        </InputLabel>
        <Select
          id="pick-winner"
          color={color}
          autoWidth
          name={TeamProperties.TeamId}
          value={values[TeamProperties.TeamId]}
          onChange={handleChange}
        >
          {managers.map((manager) => {
            return (
              <MenuItem key={manager.teamId} value={manager.teamId}>
                {manager.teamId}
              </MenuItem>
            );
          })}
        </Select>
        <Button
          onClick={submitForm}
          variant="contained"
          color={color}
          style={{ marginTop: "8px" }}
        >
          Submit
        </Button>
      </FormControl>
    </form>
  );
}

export default withFormik<ISelectWeeklyWinner, ISelectWeeklyWinnerValues>({
  mapPropsToValues: (props) => ({
    [TeamProperties.TeamId]: "",
  }),
  validationSchema: (props: ISelectWeeklyWinner) => {
    return object().shape({
      [TeamProperties.TeamId]: string().required("Required"),
    });
  },
  handleSubmit,
})(SelectWinner);
