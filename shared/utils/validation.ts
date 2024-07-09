export const containsForbiddenChars = (str: string, forbiddenChars: string[]) => {
  return forbiddenChars.some(char => str.includes(char));
};

export const validateProfileUrl = () => {

};

export const validateUsername = (username: string) => {
  const invalidChars = [' ', ',', ';', '<', '>', '(', ')', '[', ']', '\\', '\"', '$', '%', '^', '&', '*'];
  const minLength = 5;
  const maxLength = 20;
  let message = '';

  if (username) {
    if (containsForbiddenChars(username, invalidChars)) {
      message += `Username contains forbidden characters: (${invalidChars.join(' ')}). `;
    }

    if (username.length < minLength || username.length > maxLength) {
      message += `Username length should be between ${minLength} and ${maxLength} characters. `;
    }

  } else {
    message += 'Username is required. ';
  }

  return message;
};

export const validateEmail = (email: string) => {
  const invalidChars = [' ', ',', ';', '<', '>', '(', ')', '[', ']', '\\', '\"', '$', '%', '^', '*'];
  const minLength = 7;
  const maxLength = 60;
  let message = '';

  if (email) {
    if (email.includes('@')) {
      const [localPart, domain] = email.split('@', 2);

      if (!localPart.length || !domain.length) {
        message += 'Email should contain an "@" symbol with text before and after it. ';
      } else {
        const domainParts = domain.split('.');
        const isDomainInvalid = domainParts.length < 2
          || domainParts.some((part: string) => !part.length)
          || domainParts[0].length === 0
          || domainParts[domainParts.length - 1].length === 0;

        if (isDomainInvalid) {
          message += 'Email should contain a "." symbol (not the first or last character). ';
        }
      }

      if (email.length < minLength || email.length > maxLength) {
        message += 'Email length should be between ' + minLength + ' and ' + maxLength + ' characters. ';
      }

      if (containsForbiddenChars(email, invalidChars)) {
        message += `Email contains forbidden characters: (${invalidChars.join(' ')}). `;
      }
    } else {
      message += 'Email should contain an "@" symbol';
    }
  } else {
    message += 'Email is required. ';
  }

  return message;
};

export const validatePassword = (password: string) => {
  const invalidChars = [' ', ',', ';', '<', '>', '(', ')', '[', ']', '\\', '\"', '$', '%', '^', '*'];
  const minLength = 10;
  const maxLength = 20;
  let message = '';

  if (password) {
    if (password !== '' && password !== null && password !== undefined) {
      if (password.length < minLength || password.length > maxLength) {
        message += 'Length should be between ' + minLength + ' and ' + maxLength + ' characters. ';
      }

      if (containsForbiddenChars(password, invalidChars)) {
        message += `Password contains forbidden characters: (${invalidChars.join(' ')}). `;
      }
    }
  } else {
    message += 'Password is required';
  }

  return message;
};

export const validateSignInForm = (formData: { [key: string]: string }) => {
  const errors = {
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
  };

  const isValid = Object.values(errors).every((error) => error === '');

  return {
    isValid,
    ...errors
  };
};

export const validateSignUpForm = (formData: { [key: string]: string }) => {
  const errors = {
    username: validateUsername(formData.username),
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
  };

  const isValid = Object.values(errors).every((error) => error === '');

  return {
    isValid,
    ...errors
  };
};