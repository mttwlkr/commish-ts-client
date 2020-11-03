import React from "react";
import { withFormik, FormikProps } from "formik";
import Button from "@material-ui/core/Button";
import { TextField, Typography } from "@material-ui/core";
import { FormSpacer } from "../index";
import { TeamProperties, ContractType } from "../types.model";
import { TeamFormValues, TeamForm, TeamFormActions } from "./TeamForm.model";
import { number, object } from "yup";

const handleSubmit = async (
  values: TeamFormValues,
  actions: TeamFormActions
) => {
  const { contract, accounts, web3 } = actions.props;

  actions.setSubmitting(true);

  const inEther = values[TeamProperties.BuyInAmount].toString();
  const inWei = web3.utils.toWei(inEther, "ether");

  try {
    await contract.methods.addTeam(values[TeamProperties.TeamId]).send({
      value: inWei,
      from: accounts[0],
    });
    actions.setStatus(undefined);
  } catch (error) {
    actions.setStatus(error);
  }

  actions.setSubmitting(false);
};

function RenderTeamForm(props: TeamForm & FormikProps<TeamFormValues>) {
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    isSubmitting,
    contractType,
    touched,
    setFieldTouched,
  } = props;

  const contractColor =
    contractType === ContractType.Weekly ? "secondary" : "primary";

  return (
    <form onSubmit={handleSubmit}>
      <FormSpacer>
        <TextField
          color={contractColor}
          label="Team Id"
          onChange={handleChange}
          type="number"
          name={TeamProperties.TeamId}
          onBlur={() => setFieldTouched(TeamProperties.TeamId)}
          helperText={errors[TeamProperties.TeamId]}
          error={
            touched[TeamProperties.TeamId] &&
            typeof errors[TeamProperties.TeamId] === "string"
          }
          value={values[TeamProperties.TeamId]}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </FormSpacer>
      <FormSpacer>
        <TextField
          color={contractColor}
          label="Buy In Amount (Ether)"
          disabled // why would they need to increase this right now?
          onBlur={() => setFieldTouched(TeamProperties.BuyInAmount)}
          onChange={handleChange}
          type="number"
          name={TeamProperties.BuyInAmount}
          value={values[TeamProperties.BuyInAmount]}
          error={
            touched[TeamProperties.BuyInAmount] &&
            typeof errors[TeamProperties.BuyInAmount] === "string"
          }
          helperText={errors[TeamProperties.BuyInAmount]}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </FormSpacer>
      {props.status !== undefined && (
        <Typography color="error">
          {props.status.message || "Please try again."}
        </Typography>
      )}
      <FormSpacer>
        <Button
          type="submit"
          variant="contained"
          color={contractColor}
          disabled={isSubmitting}
        >
          Add Team
        </Button>
      </FormSpacer>
    </form>
  );
}

export default withFormik<TeamForm, TeamFormValues>({
  mapPropsToValues: (props) => {
    return {
      [TeamProperties.TeamId]: props.initialTeamId || 0,
      [TeamProperties.BuyInAmount]: props.initialBuyInAmount || 0,
    };
  },
  validationSchema: ({ initialBuyInAmount }: TeamForm) => {
    return object().shape({
      [TeamProperties.TeamId]: number().required("Required"),
      [TeamProperties.BuyInAmount]: number()
        .required("Required")
        .positive("Must be an integer")
        .min(initialBuyInAmount || 0, "Not enough ether"),
    });
  },
  handleSubmit,
})(RenderTeamForm);
