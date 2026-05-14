import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Form.module.scss';

import FormField from '@/components/FormField';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

const initFormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

const Form = () => {
  const [formData, setFormData] = useState(initFormState);
  const [errors, setErrors] = useState(initFormState);

  const isValidEmail = (email: string) => {
    if (!email.trim()) {
      return false;
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email.trim());
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    switch (name) {
      case 'email':
        if (value.trim()) {
          setErrors((prev) => ({
            ...prev,
            [name]: prev?.email === 'Email cannot be empty' ? '' : prev?.email
          }));

          if (isValidEmail(value.trim())) {
            setErrors((prev) => ({
              ...prev,
              [name]: ''
            }));
          }
        }
        break;
      default:
        if (value.trim()) {
          setErrors((prev) => ({
            ...prev,
            [name]: ''
          }));
        }
        break;
    }
  };

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };

    if (!formData?.firstName.trim()) {
      newErrors.firstName = 'First Name cannot be empty';
    }

    if (!formData?.lastName.trim()) {
      newErrors.lastName = 'Last Name cannot be empty';
    }

    if (!formData?.email.trim()) {
      newErrors.email = 'Email cannot be empty';
    } else if (!isValidEmail(formData?.email.trim())) {
      newErrors.email = 'Looks like this is not an email';
    }

    if (!formData?.password.trim()) {
      newErrors.password = 'Password cannot be empty';
    }

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);

    if (hasError) {
      return;
    }

    alert('Submitted successfully!');

    setFormData(initFormState);
    setErrors(initFormState);
  };

  return (
    <form
      className={cx('form-container')}
      noValidate
      action=""
      onSubmit={onSubmit}
    >
      <FormField
        id='firstName'
        type='text'
        placeholder='First Name'
        value={formData?.firstName}
        autoComplete='given-name'
        onChange={onChangeField}
        errorMessage={errors?.firstName}
      />
      <FormField
        id='lastName'
        type='text'
        placeholder='Last Name'
        value={formData?.lastName}
        autoComplete='family-name'
        onChange={onChangeField}
        errorMessage={errors?.lastName}
      />
      <FormField
        id='email'
        type='email'
        placeholder='Email Address'
        value={formData?.email}
        autoComplete='email'
        onChange={onChangeField}
        errorMessage={errors?.email}
      />
      <FormField
        id='password'
        type='password'
        placeholder='Password'
        value={formData?.password}
        autoComplete='new-password'
        onChange={onChangeField}
        errorMessage={errors?.password}
      />
      <Button
        type='submit'
        block={true}
      >
        Claim your free trial
      </Button>
      <p className={cx('terms')}>
        By clicking the button, you are agreeing to our 
        <span>Terms and Services</span>
      </p>
    </form>
  );
};

export default Form;
