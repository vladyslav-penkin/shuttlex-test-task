import { FC, memo } from 'react';
import { FormControl, FormControlError, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText, Input, InputField, InputIcon } from '@gluestack-ui/themed';

type InputType = 'text' | 'password' | undefined;

interface FormInputProps {
  label: string;
  type?: InputType;
  placeholder: string;
  value: string;
  isInvalid: boolean;
  helperText: string;
  errorText: string;
  onChangeText: (text: string) => void;
}

export const FormInput: FC<FormInputProps> = memo(({
  label,
  type = 'text',
  placeholder,
  value,
  isInvalid,
  helperText,
  errorText,
  onChangeText,
}) => {
  return (
    <FormControl w="100%" isInvalid={isInvalid}>
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input borderRadius={10} backgroundColor="$secondary200">
        <InputField
          type={type}
          autoCapitalize="none"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          color="$secondary950"
        />
      </Input>
      <FormControlError>
        <FormControlErrorText>{errorText}</FormControlErrorText>
      </FormControlError>
      <FormControlHelper>
        <FormControlHelperText>{helperText}</FormControlHelperText>
      </FormControlHelper>
    </FormControl>
  );
});
