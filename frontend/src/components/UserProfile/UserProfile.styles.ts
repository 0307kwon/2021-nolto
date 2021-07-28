import styled from 'styled-components';

import { PALETTE } from 'constants/palette';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

const UserThumbnail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;

const Image = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const MoreProfileButton = styled.button`
  border: none;
  background: transparent;
  padding-top: 0.25rem;
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  display: flex;
  position: absolute;
  width: fit-content;
  top: 110%;
  margin-right: 1rem;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${PALETTE.PRIMARY_400};
  border-radius: 4px;
  transition: opacity 0.2s ease;
  overflow: hidden;

  * {
    padding: 0.5rem 0.75rem;
  }
`;

const Greeting = styled.div`
  background-color: ${PALETTE.PRIMARY_400};
  color: ${PALETTE.WHITE_400};
`;

const Button = styled.button`
  width: 100%;
  position: relative;
  border: none;
  border-top: 1px solid ${PALETTE.PRIMARY_400};
  background-color: ${PALETTE.WHITE_400};
  font-size: 1rem;
  overflow: hidden;

  &:last-child {
    border-radius: 0 0 4px 4px;
  }

  &:hover::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${PALETTE.BLACK_400};
    opacity: 0.1;
  }
`;

export default { Root, UserThumbnail, Image, MoreProfileButton, Dropdown, Greeting, Button };
