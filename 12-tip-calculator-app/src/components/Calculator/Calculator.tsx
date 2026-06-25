import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Calculator.module.scss';

import FormField from '@/components/FormField';
import FormFieldset from '@/components/FormFieldset';
import Button from '@/components/Button';

import BillIcon from '@/assets/images/icons/icon-dollar.svg?react';
import PersonIcon from '@/assets/images/icons/icon-person.svg?react';

const cx = classNames.bind(styles);

type FormDataState = {
  bill: string,
  tip: string,
  numOfPeople: string
};

const initFormState = {
  bill: '',
  tip: '',
  numOfPeople: ''
};

const Calculator = () => {
  const [formData, setFormData] = useState<FormDataState>(initFormState);
  const [errors, setErrors] = useState<FormDataState>(initFormState);
  const [selectTip, setSelectTip] = useState<number>(0);
  const [inputTip, setInputTip] = useState<string>('');

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    switch (name) {
      case 'bill':
      case 'numOfPeople':
        if (value.trim() !== '' && parseFloat(value) === 0) {
          setErrors((prev) => ({
            ...prev,
            [name]: 'Can\'t be zero'
          }));
        } else if (parseFloat(value) > 999999999999) {
          setErrors((prev) => ({
            ...prev,
            [name]: 'Maximum allowed 999999999999'
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            [name]: ''
          }));
        }
        break;
    }
  };

  const onChangeTipBtn = (tip: number) => {
    setFormData((prev) => ({
      ...prev,
      tip: tip.toString()
    }));
    setSelectTip(tip);
    setInputTip('');
  };

  const onChangeCustomTip = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      tip: value
    }));
    setSelectTip(parseFloat(value));
    setInputTip(value);
  };

  const onBlurCustomTip = () => {
    if (inputTip === '') return;

    if (parseFloat(inputTip) > 100) {
      setFormData((prev) => ({
        ...prev,
        tip: '100'
      }));
      setSelectTip(100);
      setInputTip('100');
    }
  };

  const onClickResetBtn = () => {
    setFormData(initFormState);
    setErrors(initFormState);
    setSelectTip(0);
    setInputTip('');
  };

  const getCalculationResult = (formData: FormDataState) => {
    const bill = parseFloat(formData?.bill) || 0;
    const tip = parseFloat(formData?.tip) || 0;
    const numOfPeople = parseFloat(formData?.numOfPeople) || 0;

    if (!bill || !numOfPeople
        || bill <= 0 || numOfPeople <= 0
        || Object.values(errors).some(Boolean)
    ) {
      return {
        tipPerPerson: 0,
        totalPerPerson: 0
      };
    }

    return {
      tipPerPerson: bill * (tip / 100) / numOfPeople,
      totalPerPerson: bill * (1 + (tip / 100)) / numOfPeople
    };
  };

  const { tipPerPerson, totalPerPerson } = getCalculationResult(formData);

  return (
    <div className={cx('calculator-container')}>
      <div className={cx('bill-container')}>
        <FormField
          id='bill'
          label='Bill'
          icon={<BillIcon />}
          value={formData?.bill || ''}
          min={0}
          max={999999999999}
          placeholder='0'
          onChange={onChangeField}
          errorMessage={errors?.bill}
        />
        <FormFieldset
          selectTip={selectTip}
          inputTip={inputTip}
          onChangeTipBtn={onChangeTipBtn}
          onChangeCustomTip={onChangeCustomTip}
          onBlurCustomTip={onBlurCustomTip}
        />
        <FormField
          id='numOfPeople'
          label='Number of People'
          icon={<PersonIcon />}
          value={formData?.numOfPeople || ''}
          min={0}
          max={999999999999}
          placeholder='0'
          onChange={onChangeField}
          errorMessage={errors?.numOfPeople}
        />
      </div>
      <div className={cx('result-container')}>
        <div className={cx('result-block')}>
          <div>
            <div>
              <p className={cx('result-title')}>Tip Amount</p>
              <p className={cx('result-unit')}>/ person</p>
            </div>
            <div className={cx('result-amount')}>{`$${tipPerPerson.toFixed(2)}`}</div>
          </div>
          <div>
            <div>
              <p className={cx('result-title')}>Total</p>
              <p className={cx('result-unit')}>/ person</p>
            </div>
            <div className={cx('result-amount')}>{`$${totalPerPerson.toFixed(2)}`}</div>
          </div>
        </div>
        <Button
          className={cx('reset-btn')}
          block={true}
          disabled={tipPerPerson <= 0 && totalPerPerson <= 0 }
          onClick={onClickResetBtn}
        >
          RESET
        </Button>
      </div>
    </div>
  );
};

export default Calculator;
