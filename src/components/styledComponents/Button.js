import styled from 'styled-components';
import {Button} from 'react-native';
import {
  compose,
  color,
  size,
  flexbox,
  borderRadius,
  space,
  layout,
} from 'styled-system';

const ButtonSty = styled(Button)(
  compose(
    color,
    space,
    size,
    flexbox,
    borderRadius,
    layout,
  ),
);

export default ButtonSty;
