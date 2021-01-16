import styled from 'styled-components';
import {View} from 'react-native';
import {
  compose,
  color,
  size,
  flexbox,
  borderRadius,
  space,
  layout,
} from 'styled-system';

const Box = styled(View)(
  compose(
    color,
    space,
    size,
    flexbox,
    borderRadius,
    layout,
  ),
);

export default Box;
