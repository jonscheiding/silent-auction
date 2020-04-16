import styled from 'styled-components';

function getPercentage(ratio) {
  return `${100 / (ratio || 1)}%`;
}

export const AspectContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: ${(props) => getPercentage(props.ratio)};
`;
