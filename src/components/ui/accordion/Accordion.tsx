// -------------------------------------
//
// AccordionItemのラッパー
//
// -------------------------------------

import styled from "styled-components";

const Accordion: React.FC = ({ children }) => {
  return <AccordionWrapper>{children}</AccordionWrapper>;
};

export default Accordion;

const AccordionWrapper = styled.div`
  & > .AccordionItem {
    --borderStyle: 1px solid #e5e5e5;
    border-bottom: var(--borderStyle);

    &:nth-of-type(1) {
      border-top: var(--borderStyle);
    }
    &:nth-of-type(odd) {
    }
  }
`;
