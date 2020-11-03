import React from "react";
import { TeamProperties, SeasonLeagueInstance } from "../types.model";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core/";
import { withFormik, FormikProps } from "formik";
import {
  ISelectSeasonWinner,
  ISelectSeasonWinnerValues,
  ISelectSeasonWinnerActions,
} from "./SelectSeasonWinner.model";
import { object, string } from "yup";
import { FormSpacer } from "../index";

const handleSubmit = async (
  values: ISelectSeasonWinnerValues,
  actions: ISelectSeasonWinnerActions
) => {
  const { contract, accounts } = actions.props;
  actions.setSubmitting(true);

  try {
    await (contract as SeasonLeagueInstance).methods
      .payOutSeason([
        values[TeamProperties.FirstPlace] || "0",
        values[TeamProperties.SecondPlace] || "0",
        values[TeamProperties.ThirdPlace] || "0",
        values[TeamProperties.FourthPlace] || "0",
      ])
      .send({
        from: accounts[0],
      });
    actions.setStatus(undefined);
  } catch (error) {
    actions.setStatus(error);
  }

  actions.setSubmitting(false);
};

function SelectSeasonWinner(
  props: ISelectSeasonWinner & FormikProps<ISelectSeasonWinnerValues>
) {
  const { color, handleChange, submitForm, managers, values } = props;
  return (
    <form>
      <FormSpacer>
        <FormControl fullWidth>
          <InputLabel color={color} id={TeamProperties.FirstPlace}>
            First Place
          </InputLabel>
          <Select
            id={TeamProperties.FirstPlace}
            color={color}
            autoWidth
            name={TeamProperties.FirstPlace}
            value={values[TeamProperties.FirstPlace]}
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
        </FormControl>
      </FormSpacer>

      {props.numAwards > 1 && (
        <FormSpacer>
          <FormControl fullWidth>
            <InputLabel color={color} id={TeamProperties.SecondPlace}>
              Second Place
            </InputLabel>
            <Select
              id={TeamProperties.SecondPlace}
              color={color}
              autoWidth
              name={TeamProperties.SecondPlace}
              value={values[TeamProperties.SecondPlace]}
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
          </FormControl>
        </FormSpacer>
      )}

      {props.numAwards > 2 && (
        <FormSpacer>
          <FormControl fullWidth>
            <InputLabel color={color} id={TeamProperties.ThirdPlace}>
              Third Place
            </InputLabel>
            <Select
              id={TeamProperties.ThirdPlace}
              color={color}
              autoWidth
              name={TeamProperties.ThirdPlace}
              value={values[TeamProperties.ThirdPlace]}
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
          </FormControl>
        </FormSpacer>
      )}

      {props.numAwards > 3 && (
        <FormSpacer>
          <FormControl fullWidth>
            <InputLabel color={color} id={TeamProperties.FourthPlace}>
              Fourth Place
            </InputLabel>
            <Select
              id={TeamProperties.FourthPlace}
              color={color}
              autoWidth
              name={TeamProperties.FourthPlace}
              value={values[TeamProperties.FourthPlace]}
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
          </FormControl>
        </FormSpacer>
      )}

      <Button
        onClick={submitForm}
        variant="contained"
        color={color}
        style={{ marginTop: "8px" }}
      >
        Submit
      </Button>
    </form>
  );
}

export default withFormik<ISelectSeasonWinner, ISelectSeasonWinnerValues>({
  mapPropsToValues: (props) => ({
    [TeamProperties.FirstPlace]: "",
    [TeamProperties.SecondPlace]: "",
    [TeamProperties.ThirdPlace]: "",
    [TeamProperties.FourthPlace]: "",
  }),
  validationSchema: (props: ISelectSeasonWinner) => {
    return object().shape({
      [TeamProperties.FirstPlace]: string().required(),
      [TeamProperties.SecondPlace]:
        props.numAwards > 1 ? string().required() : string(),
      [TeamProperties.ThirdPlace]:
        props.numAwards > 2 ? string().required() : string(),
      [TeamProperties.FourthPlace]:
        props.numAwards > 3 ? string().required() : string(),
    });
  },
  handleSubmit,
})(SelectSeasonWinner);
