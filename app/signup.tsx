import { FC, useState } from 'react';
import { Box, Heading, Image, Pressable, Text } from '@gluestack-ui/themed';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { FormInput } from '@components/FormInput';
import { BasicButton } from '@components/BasicButton';
import { useAuth } from '@hooks/useAuth';
import { validateSignUpForm } from '@utils/validation';
import { EMAIL_HELPER, PASSWORD_HELPER, USER_HELPER } from '@utils/messages';

const SignupScreen: FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [validationMessages, setValidationMessages] = useState({
    isValid: true,
    username: '',
    email: '',
    password: ''
  });
  const { register } = useAuth();
  const router = useRouter();

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleClear = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
    });
    setValidationMessages({
      isValid: true,
      username: '',
      email: '',
      password: '',
    });
  };

  const handleSubmit = async () => {
    handleClear();
    const validation = validateSignUpForm(formData);
    if (validation.isValid) {
      await register(formData.email, formData.password, formData.username, '');
    } else {
      setValidationMessages(validation);
    }
  }

  const handleMoveToSignIn = () => router.replace('signin');

  return (
    <Box display="flex">
      <StatusBar style="dark" />
      <Box display="flex" alignItems="center" justifyContent="center" h="100%" padding={20} gap={10}>
        <Image w="100%" h="30%" source={require('@assets/images/signup.png')} alt="singup" />
        <Heading size="2xl">Sign Up</Heading>
        <FormInput
          label="Username"
          placeholder="Enter your username"
          value={formData.username}
          onChangeText={(value: string) => handleInputChange('username', value)}
          isInvalid={!!validationMessages.username}
          helperText={USER_HELPER}
          errorText={validationMessages.username}
        />
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
        <Pressable display="flex" flexDirection="row" gap={5} onPress={handleMoveToSignIn}>
          <Text>Already have an account?</Text>
          <Text color="$violet500" fontWeight={700}>Sign In</Text>
        </Pressable>
      </Box>
    </Box>
  );
};

export default SignupScreen;
