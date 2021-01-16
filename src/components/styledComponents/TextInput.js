import {TextInput} from 'react-native';
import styled from 'styled-components';
import Theme from '../styledComponents/Theme';
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

const Input = styled(TextInput)(
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

export default Input;
