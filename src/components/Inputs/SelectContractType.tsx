import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { ContractType } from "../types.model";
import { InputLabel, Typography, useTheme } from "@material-ui/core";

const SelectContractType: React.FC<{
  setValue: (value: ContractType) => void;
  value: ContractType | null;
}> = ({ setValue, value }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = (event.target as HTMLInputElement).value;
    if (val === ContractType.Weekly || val === ContractType.Season) {
      setValue(val);
    }
  };

  const theme = useTheme();

  return (
    <FormControl component="fieldset">
      <InputLabel
        shrink={true}
        color={value === ContractType.Weekly ? "secondary" : "primary"}
        htmlFor="select-contract-type"
      >
        Contract Type
      </InputLabel>
      <RadioGroup
        style={{ marginTop: theme.spacing(2) }}
        id="select-contract-type"
        aria-label="contractType"
        name="contractType"
        value={value}
        onChange={handleChange}
        row
      >
        <FormControlLabel
          labelPlacement="start"
          value={ContractType.Season}
          control={<Radio color="primary" />}
          label={<Typography variant="caption">Season</Typography>}
          style={{ marginLeft: 0 }}
        />
        <FormControlLabel
          labelPlacement="start"
          value={ContractType.Weekly}
          control={<Radio color="secondary" />}
          label={<Typography variant="caption">Weekly</Typography>}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default SelectContractType;
