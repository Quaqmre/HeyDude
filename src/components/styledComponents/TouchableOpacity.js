import styled from 'styled-components';
import {TouchableOpacity} from 'react-native';
import {
  compose,
  color,
  size,
  flexbox,
  borderRadius,
  space,
  layout,
} from 'styled-system';

const ButtonBox = styled(TouchableOpacity)(
  compose(
    color,
    space,
    size,
    flexbox,
    borderRadius,
    layout,
  ),
);

export default ButtonBox;
