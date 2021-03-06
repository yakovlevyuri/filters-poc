import React, {
  createContext,
  // useState,
  useContext,
  Component,
} from 'react';
import styled, { css } from 'styled-components';

interface CheckboxGroupProps {
  value: string[];
  onChange: (value: string) => void;
}

interface CheckboxGroupInputProps {
  value: string;
  label: string;
}

const CheckboxGroupWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  user-select: none;
  border-radius: 5px;

  & div:nth-child(4n + 1):nth-last-child(-n + 4) {
    border-bottom-left-radius: 5px;
    border-left: 1px solid #efefef;
  }

  & div:last-child {
    border-bottom-right-radius: 5px;
  }

  /* & div:nth-child(4n + 1):nth-last-child(-n + 4),
  & div:nth-child(4n + 1):nth-last-child(-n + 4) ~ div {
    border-bottom: 1px solid #efefef;
  } */
`;

const CheckboxGroupItemWrapper = styled.div`
  ${({ checked }: { checked: boolean }) => css`
    padding: 10px 20px;
    color: ${checked ? '#ff4742' : '#6f6f6f'};
    border-bottom: ${checked ? '4px solid #ff4742' : 'none'};
    cursor: pointer;
    /* align-self: center; */
  `};

  /* border: 1px solid #efefef; */

  border-top: 1px solid #efefef;
  border-right: 1px solid #efefef;

  &:first-child {
    border-top-left-radius: 5px;
    border-left: 1px solid #efefef;
  }

  &:nth-child(4) {
    border-top-right-radius: 5px;
  }

  /* &:nth-child(5) {
    border-bottom-left-radius: 5px;
    border-left: 1px solid #efefef;
  } */

  /* &:last-child {
    border-bottom-right-radius: 5px;
  } */

  &:hover {
    background-color: #f5f5f5;
  }

  &:active {
    background-color: #ededed;
  }
`;

const CheckboxGroupItemLabel = styled.span`
  text-align: center;
  justify-self: center;
  align-self: center;
`;

const Context = createContext({});

const RadioGroupOption = ({ value, label }: CheckboxGroupInputProps) => {
  const RadioContext = useContext(Context);
  const { state, onChange } = RadioContext;

  return (
    <CheckboxGroupItemWrapper
      data-value={value}
      onClick={onChange}
      checked={state.contextValue === value}
    >
      <CheckboxGroupItemLabel>{label || value}</CheckboxGroupItemLabel>
    </CheckboxGroupItemWrapper>
  );
};

class RadioGroup extends Component<CheckboxGroupProps> {
  public static Option = RadioGroupOption;

  public render() {
    const { value, onChange, children } = this.props;

    return (
      <Context.Provider
        value={{
          state: {
            contextValue: value,
          },
          onChange: event =>
            onChange(event.currentTarget.getAttribute('data-value')),
        }}
      >
        <CheckboxGroupWrapper>{children}</CheckboxGroupWrapper>
      </Context.Provider>
    );
  }
}

export default RadioGroup;
