import styled from 'styled-components';

import IconButtonComponent from 'components/@common/IconButton/IconButton';
import ArrowIcon from 'assets/carouselArrow.svg';
import Avatar from 'components/@common/Avatar/Avatar';

const HotToyCardsContainer = styled.ul<{ position: number }>`
  grid-row: 1 / 2;
  grid-column: 1 / 8;
  width: 75rem;
  height: 25rem;
  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 600px;
  --items: 5;
  --middle: 3;
  --position: ${({ position }) => position};
`;

const HotToyCardWrapper = styled.li<{ offset: number; position: number }>`
  position: absolute;
  --r: calc(var(--position) - var(--offset));
  --abs: max(calc(var(--r) * -1), var(--r));
  transition: all 0.5s ease;
  transform: rotateY(calc(-10deg * var(--r))) translateX(calc(-300px * var(--r)));
  z-index: calc((var(--position) - var(--abs)));
  --offset: ${({ offset }) => offset};
  cursor: pointer;

  & .card-content {
    backdrop-filter: ${({ offset, position }) => offset === position && 'blur(2px)'};
  }
`;

const VerticalAvatar = styled(Avatar)`
  margin-bottom: 12px;
`;

export const CarouselArrowButton = styled(IconButtonComponent)`
  width: 1.85rem;
  height: 1.85rem;
  padding: 0.55rem;
`;

const CarouselLeft = styled(ArrowIcon)`
  transform: rotate(180deg);
`;

const CarouselRight = styled(ArrowIcon)``;

export default {
  HotToyCardsContainer,
  HotToyCardWrapper,
  VerticalAvatar,
  CarouselLeft,
  CarouselRight,
};
