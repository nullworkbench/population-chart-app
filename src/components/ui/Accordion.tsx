import styled from "styled-components";
import { useRef, useState } from "react";

const Accordion: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contentWrapperRef = useRef<HTMLDivElement>(null);

  function toggleIsOpen() {
    // トグルでAccordionContentの高さを変える
    const contentWrapper = contentWrapperRef.current;
    if (contentWrapper) {
      if (isOpen) {
        contentWrapper.style.height = "0";
      } else {
        // AccordionContent（子要素）の高さを取得してAccordionContentWrapperに適用する
        const innerHeight =
          contentWrapper.children[0].getBoundingClientRect().height;
        contentWrapper.style.height = `${innerHeight}px`;
      }
    }
    // 開閉状態を切り替える
    setIsOpen(!isOpen);
  }

  return (
    <AccordionWrapper>
      <AccordionButton onClick={() => toggleIsOpen()}>
        <div>Accordion Button</div>
        <AccordionIcon />
      </AccordionButton>
      <AccordionContentWrapper ref={contentWrapperRef}>
        <AccordionContent>
          <span>Accordion Content</span>
          <p>
            contentcontent contentcontent contentcontent contentcont
            entcontentcontentcontentcontent contentcontent contentcontent
          </p>
        </AccordionContent>
      </AccordionContentWrapper>
    </AccordionWrapper>
  );
};

export default Accordion;

const AccordionWrapper = styled.div`
  --borderStyle: 1px solid #e5e5e5;
  border-top: var(--borderStyle);
  border-bottom: var(--borderStyle);
  padding: 0.5rem 0.8rem;
`;

const AccordionButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AccordionIcon = styled.div`
  --w: 0.5rem;
  width: var(--w);
  position: relative;
  margin-right: calc(var(--w) / 2);

  &::before,
  &::after {
    // position
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    // size
    width: calc(var(--w) / 1.2);
    // style
    border-top: 2px solid #777;
  }

  &::before {
    transform: rotate(-45deg);
    left: 50%;
  }
  &::after {
    transform: rotate(45deg);
  }
`;

const AccordionContentWrapper = styled.div`
  height: 0;
  overflow: hidden;
  transition: height 0.4s;
`;
const AccordionContent = styled.div`
  padding-top: 1rem;
`;
