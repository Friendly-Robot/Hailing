import React from 'react';
import {
  Modal,
  View,
} from 'react-native';
// import Aicon from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'react-native-elements';
import styles from './styles';

export default class Hailing extends React.PureComponent {
  constructor(props) {
    super(props);
    this.flashInterval;
    this.state = {
      flashColor: props.color, 
      flashRate: props.rate,
    };
  }

  componentDidMount() {
    if (this.props.rate > 0) {
      this.flashInterval = setInterval(() => {
        if (this.state.flashColor !== '#000000') {
          this.setState({ flashColor: '#000000' });
        } else {
          this.setState({ flashColor: this.props.color });
        }
      }, this.props.rate);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.color !== nextProps.color) {
      this.setState({ flashColor: nextProps.color });
    }
  }

  componentWillUnmount() {
    clearInterval(this.flashInterval);
  }

  render() {
    const {
      closeHailing,
      // color,
      icon,
      // rate,
      visible,
    } = this.props;

    const { flashColor } = this.state;

    console.log('COLORS', this.props.color, flashColor)

    return (
      <Modal
        onRequestClose={closeHailing}
        visible={visible}
      >
        <View
          style={[styles.container, !Boolean(icon) && { backgroundColor: flashColor }]}
        >
          {
            Boolean(icon) &&
            <Icon name={icon} style={[styles.icon, { backgroundColor: flashColor }]} />
          }
        </View>
        
      </Modal>
    )
  }
}

