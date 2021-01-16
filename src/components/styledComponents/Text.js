import {Text} from 'react-native';
import styled from 'styled-components';
import {
  color,
  compose,
  typography,
  size,
  space,
  borderRadius,
  shadow,
  flexbox,
} from 'styled-system';

const TextBox = styled(Text)(
  compose(
    typography,
    borderRadius,
    space,
    color,
    size,
    shadow,
    flexbox,
  ),
);

export default TextBox;
