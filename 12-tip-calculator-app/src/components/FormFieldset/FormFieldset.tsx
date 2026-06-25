import classNames from 'classnames/bind';

import styles from './FormFieldset.module.scss';

import Button from '@/components/Button';

const cx = classNames.bind(styles);

type FormFieldsetType = {
  selectTip: number;
  inputTip: string;
  onChangeTipBtn: (tip: number) => void;
  onChangeCustomTip: (value: string) => void;
  onBlurCustomTip: () => void;
};

const FormFieldset = (props: FormFieldsetType) => {
  const {
    selectTip,
    inputTip,
    onChangeTipBtn,
    onChangeCustomTip,
    onBlurCustomTip
  } = props;

  const isActiveBtn = (selectTip: number, currentTip: number, inputTip: string) => {
    if (inputTip) {
      return false;
    }

    return selectTip === currentTip;
  };

  return (
    <fieldset className={cx('form-fieldset-container')}>
      <legend className={cx('fieldset-title')}>Select Tip %</legend>
      <div className={cx('fieldset-block')}>
        <Button className={cx('fieldset-btn', { active: isActiveBtn(selectTip, 5, inputTip) })} block={true} onClick={() => onChangeTipBtn(5)}>5%</Button>
        <Button className={cx('fieldset-btn', { active: isActiveBtn(selectTip, 10, inputTip) })} block={true} onClick={() => onChangeTipBtn(10)}>10%</Button>
        <Button className={cx('fieldset-btn', { active: isActiveBtn(selectTip, 15, inputTip) })} block={true} onClick={() => onChangeTipBtn(15)}>15%</Button>
        <Button className={cx('fieldset-btn', { active: isActiveBtn(selectTip, 25, inputTip) })} block={true} onClick={() => onChangeTipBtn(25)}>25%</Button>
        <Button className={cx('fieldset-btn', { active: isActiveBtn(selectTip, 50, inputTip) })} block={true} onClick={() => onChangeTipBtn(50)}>50%</Button>
        <input
          name="selectTip"
          type="number"
          value={inputTip}
          min={0}
          max={100}
          placeholder="Custom"
          onChange={(e) => onChangeCustomTip(e.target.value.trim())}
          onBlur={onBlurCustomTip}
        />
      </div>
    </fieldset>
  );
};

export default FormFieldset;
