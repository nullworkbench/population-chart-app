import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  openDefault?: boolean;
};

const Accordion: React.FC<Props> = (prop) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (prop.openDefault == true) {
      toggleIsOpen();
    }
    // mounted時に実行したいのでルールを無効化
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {/* 開閉ボタン */}
      <AccordionButton onClick={() => toggleIsOpen()}>
        <div>{prop.title}</div>
        <AccordionIcon className={isOpen ? "isOpen" : ""} />
      </AccordionButton>
      {/* 伸縮して表示が切り替わるコンテンツ */}
      <AccordionContentWrapper ref={contentWrapperRef}>
        <AccordionContent>{prop.children}</AccordionContent>
      </AccordionContentWrapper>
    </AccordionWrapper>
  );
};

export default Accordion;

// CSS Transitionの時間
const transitionDuration = "0.4s";

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
  transform-origin: center;
  transform: translateX(-100%);
  transition: transform ${transitionDuration};

  &.isOpen {
    // margin-right: 0;
    transform: translateX(-60%) rotate(180deg);
  }

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
  transition: height ${transitionDuration};
`;
const AccordionContent = styled.div`
  padding-top: 1rem;
`;
