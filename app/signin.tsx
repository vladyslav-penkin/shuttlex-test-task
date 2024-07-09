import { FC, useState } from 'react';
import { Box, Heading, Image, Pressable, Text } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FormInput } from '@components/FormInput';
import { BasicButton } from '@components/BasicButton';
import { useAuth } from '@hooks/useAuth';
import { validateSignInForm } from '@utils/validation';
import { EMAIL_HELPER, PASSWORD_HELPER } from '@utils/messages';

const SignInScreen: FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [validationMessages, setValidationMessages] = useState({
    isValid: true,
    email: '',
    password: ''
  });

  const { login } = useAuth();
  const router = useRouter();

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleClear = () => {
    setFormData({
      email: '',
      password: '',
    });
    setValidationMessages({
      isValid: true,
      email: '',
      password: '',
    });
  };

  const handleSubmit = async () => {
    handleClear();
    const validation = validateSignInForm(formData);
    if (validation.isValid) {
      await login(formData.email, formData.password);
    } else {
      setValidationMessages(validation);
    }
  }

  const handleMoveToSignup = () => router.replace('signup');

  return (
    <Box display="flex">
      <StatusBar style="dark" />
      <Box display="flex" alignItems="center" justifyContent="center" h="100%" padding={20} gap={10}>
        <Image w="100%" h="30%" source={require('@assets/images/login.png')} alt="singin" />
        <Heading size="2xl">Sign In</Heading>
        <FormInput
          label="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(value: string) => handleInputChange('email', value)}
          isInvalid={!!validationMessages.email}
          helperText={EMAIL_HELPER}
          errorText={validationMessages.email}
        />
        <FormInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChangeText={(value: string) => handleInputChange('password', value)}
          isInvalid={!!validationMessages.password}
          helperText={PASSWORD_HELPER}
          errorText={validationMessages.password}
        />
        <BasicButton title="Submit" w={250} h={50} onPress={handleSubmit} />
        <Pressable display="flex" flexDirection="row" gap={5} onPress={handleMoveToSignup}>
          <Text>Don't have an account?</Text>
          <Text color="$violet500" fontWeight={700}>Sign Up</Text>
        </Pressable>
      </Box>
    </Box>
  );
};

export default SignInScreen;
