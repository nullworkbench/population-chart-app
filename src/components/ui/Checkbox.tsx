import styled from "styled-components";

type Props = {
  checked: boolean;
  label: string;
  handleOnChange: Function;
};

const Checkbox: React.FC<Props> = (prop) => {
  return (
    <Label>
      <Input
        defaultChecked={prop.checked}
        onChange={(e) => prop.handleOnChange(e)}
      />
      <span>{prop.label}</span>
    </Label>
  );
};

export default Checkbox;

const Label = styled.label`
  --w: 7rem;
  --color: #26c485;
  display: block;
  text-align: center;

  & > span {
    display: block;
    width: var(--w);
    padding: 0.5rem 1rem;
    border: 0.1rem solid #26c485;
    border-radius: calc(var(--w) / 2);
    color: var(--color);
  }

  & > input:checked + span {
    color: #fff;
    background: var(--color);
  }
`;

const Input = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;
