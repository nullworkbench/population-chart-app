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
      <div onClick={() => toggleIsOpen()}>Accordion Button</div>
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

const AccordionWrapper = styled.div``;

const AccordionContentWrapper = styled.div`
  height: 0;
  overflow: hidden;
  transition: height 0.4s;
`;
const AccordionContent = styled.div``;
