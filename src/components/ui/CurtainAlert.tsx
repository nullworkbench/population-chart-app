// -------------------------------------
//
// コンポーネントの親要素のサイズに合わせて要素を隠し、メッセージを表示します。
// 親要素のpositionがrelativeである必要があります。
//
// -------------------------------------

type Props = {
  isShow: boolean;
  backgroundColor?: string;
  children: React.ReactNode;
};

import styled from "styled-components";

const CurtainAlert: React.FC<Props> = (props) => {
  return (
    <Div
      className={props.isShow ? "show" : ""}
      style={{ backgroundColor: props.backgroundColor ?? undefined }}
    >
      {props.children}
    </Div>
  );
};

export default CurtainAlert;

const Div = styled.div`
  // flex
  display: flex;
  justify-content: center;
  align-items: center;
  // position
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  // size
  width: 100%;
  height: 103%;
  // style
  background: #f1f1f1;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;

  // transition
  transition: opacity 0.4s, visibility 0.4s;
  opacity: 0;
  visibility: hidden;
  &.show {
    opacity: 1;
    visibility: visible;
  }
`;
