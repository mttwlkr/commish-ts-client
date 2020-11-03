import React, { useState } from "react";
import {
  ContractType,
  WeeklyContract,
  SeasonContract,
  MaxAmounts,
} from "../types.model";
import {
  IContractFormActions,
  IContractFormValues,
  IContractForm,
} from "./ContractForm.model";
import { FormSpacer } from "../index";
import { withFormik, FormikProps } from "formik";
import {
  FormControl,
  InputLabel,
  Select,
  Button,
  TextField,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { object, number } from "yup";

const handleSubmit = async (
  values: IContractFormValues,
  actions: IContractFormActions
) => {
  const { contractType, factoryContract, accounts, web3 } = actions.props;
  actions.setSubmitting(true);

  const minBuyInWeiString = web3.utils.toWei(
    values[WeeklyContract.MinBuyInWei].toString(),
    "ether"
  );

  if (contractType === ContractType.Season) {
    const percents = [
      Math.round(values[SeasonContract.FirstPercent] * 100),
      Math.round(values[SeasonContract.SecondPercent] * 100),
      Math.round(values[SeasonContract.ThirdPercent] * 100),
      Math.round(values[SeasonContract.FourthPercent] * 100),
    ];

    const percentSum = percents.reduce(
      (acc: number, curr: number) => (acc += curr),
      0
    );

    if (percentSum !== 10000) {
      actions.setStatus({ message: "Must equal 100%" });
      return;
    }

    try {
      await factoryContract.methods
        .createSeasonLeague(
          values[SeasonContract.YahooLeagueId],
          minBuyInWeiString,
          values[SeasonContract.TeamLimit],
          percents
        )
        .send({
          from: accounts[0],
        });
      actions.setStatus(undefined);
      actions.resetForm();
    } catch (error) {
      actions.setStatus(error);
    }
  }

  if (contractType === ContractType.Weekly) {
    try {
      await factoryContract.methods
        .createWeeklyLeague(
          values[WeeklyContract.YahooLeagueId],
          minBuyInWeiString,
          values[WeeklyContract.TeamLimit],
          values[WeeklyContract.TotalWeeks]
        )
        .send({
          from: accounts[0],
        });
      actions.setStatus(undefined);
      actions.resetForm();
    } catch (error) {
      actions.setStatus(error);
    }
  }

  actions.setSubmitting(false);
};

const ContractForm = (
  props: IContractForm & FormikProps<IContractFormValues>
) => {
  const {
    handleChange,
    handleSubmit,
    values,
    contractType,
    errors,
    touched,
    setFieldTouched,
    isSubmitting,
  } = props;
  const [alotOfEthWarning, toggleAlotOfEthWarning] = useState(false);

  const formColor =
    contractType === ContractType.Season ? "primary" : "secondary";

  return (
    <form onSubmit={handleSubmit}>
      <FormSpacer>
        <TextField
          color={formColor}
          onBlur={() => setFieldTouched(WeeklyContract.YahooLeagueId)}
          label="Yahoo League Id"
          onChange={handleChange}
          type="number"
          name={WeeklyContract.YahooLeagueId}
          value={values[WeeklyContract.YahooLeagueId]}
          error={
            touched[WeeklyContract.YahooLeagueId] &&
            typeof errors[WeeklyContract.YahooLeagueId] === "string"
          }
          helperText={
            touched[WeeklyContract.YahooLeagueId] &&
            errors[WeeklyContract.YahooLeagueId]
          }
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </FormSpacer>
      <FormSpacer>
        <TextField
          label="Min Buy In (Ether)"
          onChange={(evt) => {
            const amount = parseInt(evt.target.value, 10);
            if (amount > 10) {
              toggleAlotOfEthWarning(true);
            } else {
              toggleAlotOfEthWarning(false);
            }
            return handleChange(evt);
          }}
          color={formColor}
          type="number"
          onBlur={() => setFieldTouched(WeeklyContract.MinBuyInWei)}
          name={WeeklyContract.MinBuyInWei}
          value={values[WeeklyContract.MinBuyInWei]}
          error={
            touched[WeeklyContract.MinBuyInWei] &&
            typeof errors[WeeklyContract.MinBuyInWei] === "string"
          }
          helperText={
            touched[WeeklyContract.MinBuyInWei] &&
            errors[WeeklyContract.MinBuyInWei]
          }
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        {alotOfEthWarning && (
          <Typography variant="caption" color="error">
            This is a lot of Ether...
          </Typography>
        )}
      </FormSpacer>
      <FormSpacer>
        <TextField
          label="Num Teams"
          type="number"
          color={formColor}
          onChange={handleChange}
          onBlur={() => setFieldTouched(WeeklyContract.TeamLimit)}
          value={values[WeeklyContract.TeamLimit]}
          name={WeeklyContract.TeamLimit}
          error={
            touched[WeeklyContract.TeamLimit] &&
            typeof errors[WeeklyContract.TeamLimit] === "string"
          }
          helperText={
            touched[WeeklyContract.TeamLimit] &&
            errors[WeeklyContract.TeamLimit]
          }
          InputLabelProps={{ shrink: true }}
          inputProps={{
            max: MaxAmounts.TeamLimit,
          }}
          fullWidth
        />
      </FormSpacer>
      {contractType === ContractType.Weekly && (
        <FormSpacer>
          <TextField
            color="secondary"
            label="Num Weeks"
            onChange={handleChange}
            type="number"
            onBlur={() => setFieldTouched(WeeklyContract.TotalWeeks)}
            name={WeeklyContract.TotalWeeks}
            value={values[WeeklyContract.TotalWeeks]}
            error={
              touched[WeeklyContract.TotalWeeks] &&
              typeof errors[WeeklyContract.TotalWeeks] === "string"
            }
            helperText={errors[WeeklyContract.TotalWeeks]}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              max: MaxAmounts.TotalWeeks,
            }}
            fullWidth
          />
        </FormSpacer>
      )}
      {contractType === ContractType.Season && (
        <>
          <FormSpacer>
            <FormControl fullWidth>
              <InputLabel color="primary" id="num-awards">
                Number of Winners to Pay Out
              </InputLabel>
              <Select
                id="num-awards"
                color="primary"
                autoWidth
                name={SeasonContract.NumAwards}
                value={values[SeasonContract.NumAwards]}
                onChange={handleChange}
              >
                {[1, 2, 3, 4].map((val) => {
                  return (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </FormSpacer>
          <FormSpacer>
            <TextField
              color="primary"
              type="number"
              InputLabelProps={{ shrink: true }}
              onBlur={() => setFieldTouched(SeasonContract.FirstPercent)}
              onChange={handleChange}
              name={SeasonContract.FirstPercent}
              label="First Place %"
              value={values[SeasonContract.FirstPercent]}
              error={
                touched[SeasonContract.FirstPercent] &&
                typeof errors[SeasonContract.FirstPercent] === "string"
              }
              helperText={
                touched[SeasonContract.FirstPercent] &&
                errors[SeasonContract.FirstPercent]
              }
              inputProps={{
                max: 100,
                min: 0,
                step: "any",
              }}
              fullWidth
            />
          </FormSpacer>
          {values[SeasonContract.NumAwards] > 1 && (
            <FormSpacer>
              <TextField
                color="primary"
                type="number"
                InputLabelProps={{ shrink: true }}
                onBlur={() => setFieldTouched(SeasonContract.SecondPercent)}
                onChange={handleChange}
                name={SeasonContract.SecondPercent}
                label="Second Place %"
                value={values[SeasonContract.SecondPercent]}
                error={
                  touched[SeasonContract.SecondPercent] &&
                  typeof errors[SeasonContract.SecondPercent] === "string"
                }
                helperText={errors[SeasonContract.SecondPercent]}
                inputProps={{
                  max: 100,
                  min: 0,
                  step: "any",
                }}
                fullWidth
              />
            </FormSpacer>
          )}
          {values[SeasonContract.NumAwards] > 2 && (
            <FormSpacer>
              <TextField
                color="primary"
                type="number"
                InputLabelProps={{ shrink: true }}
                onBlur={() => setFieldTouched(SeasonContract.ThirdPercent)}
                onChange={handleChange}
                name={SeasonContract.ThirdPercent}
                label="Third Place %"
                value={values[SeasonContract.ThirdPercent]}
                error={
                  touched[SeasonContract.ThirdPercent] &&
                  typeof errors[SeasonContract.ThirdPercent] === "string"
                }
                helperText={errors[SeasonContract.ThirdPercent]}
                inputProps={{
                  max: 100,
                  min: 0,
                  step: "any",
                }}
                fullWidth
              />
            </FormSpacer>
          )}
          {values[SeasonContract.NumAwards] > 3 && (
            <FormSpacer>
              <TextField
                color="primary"
                type="number"
                InputLabelProps={{ shrink: true }}
                onBlur={() => setFieldTouched(SeasonContract.FourthPercent)}
                onChange={handleChange}
                name={SeasonContract.FourthPercent}
                label="Fourth Place %"
                value={values[SeasonContract.FourthPercent]}
                error={
                  touched[SeasonContract.FourthPercent] &&
                  typeof errors[SeasonContract.FourthPercent] === "string"
                }
                helperText={errors[SeasonContract.FourthPercent]}
                inputProps={{
                  max: 100,
                  min: 0,
                  step: "any",
                }}
                fullWidth
              />
            </FormSpacer>
          )}
        </>
      )}
      {props.status !== undefined && (
        <Typography color="error">
          {props.status.message || "Please try again."}
        </Typography>
      )}
      <FormSpacer>
        <Button
          type="submit"
          color={contractType === ContractType.Season ? "primary" : "secondary"}
          variant="contained"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </FormSpacer>
    </form>
  );
};

export default withFormik<IContractForm, IContractFormValues>({
  mapPropsToValues: (props) => {
    return {
      [WeeklyContract.YahooLeagueId]: props.initialYahooId || 0,
      [WeeklyContract.MinBuyInWei]: props.initialMinBuyInWei || 0,
      [WeeklyContract.TeamLimit]: props.initialTeamLimit || 0,
      [WeeklyContract.TotalWeeks]: props.initialTotalWeeks || 0,
      [SeasonContract.NumAwards]: props.initialNumAwards || 1,
      [SeasonContract.FirstPercent]: props.initialFirstPercent || 100,
      [SeasonContract.SecondPercent]: props.initialSecondPercent || 0,
      [SeasonContract.ThirdPercent]: props.initialThirdPercent || 0,
      [SeasonContract.FourthPercent]: props.initialFourthPercent || 0,
    };
  },
  validationSchema: ({ contractType }: IContractForm) => {
    return object().shape({
      [WeeklyContract.YahooLeagueId]: number()
        .required("Required")
        .positive()
        .integer("Your league id does not have a decimal"),
      [WeeklyContract.MinBuyInWei]: number()
        .required("Required")
        .positive(),
      [WeeklyContract.TeamLimit]: number()
        .required("Required")
        .positive()
        .max(20, "Your league is not that big"),
      [WeeklyContract.TotalWeeks]:
        contractType === ContractType.Weekly
          ? number()
              .required()
              .positive()
              .integer()
              .max(16, "It's a 16 week season...")
          : number(),
      [SeasonContract.FirstPercent]:
        contractType === ContractType.Season
          ? number()
              .required()
              .positive()
              .max(100, "They can't have more than 100% of pot")
          : number(),
    });
  },
  handleSubmit,
})(ContractForm);
