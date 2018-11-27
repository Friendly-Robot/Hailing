import React from 'react';
import {
  AsyncStorage,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ColorWheel } from 'react-native-color-wheel';
import Colorsys from 'colorsys';
import Hailing from '../Hailing';
import debug from '../../utils/debug';
import styles from './styles';

export default class Main extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      color: '',
      hailing: false,
      icon: '',
      rate: 0,
    };
    this.closeHailing = this.closeHailing.bind(this);
    this.openHailing = this.openHailing.bind(this);
  }

  componentDidMount() {
    this.retrieveStorageValues();
  }

  async retrieveStorageValues() {
    try {
      const color = await AsyncStorage.getItem('@Hailing:Color');
      const icon = await AsyncStorage.getItem('@Hailing:Icon');
      const rate = await AsyncStorage.getItem('@Hailing:Rate');
      if (color) {
        this.setState({ color, icon, rate });
      }
    } catch(e) {
      debug.warn('Error in retrieveStorageValues()', e);
    }
  }

  setColor(color) {
    const hex = Colorsys.hsv2Hex(color.h, color.s, color.v);
    this.setState({ color: hex });
  }

  closeHailing() {
    this.setState({ hailing: false });
  }

  openHailing() {
    this.setState({ hailing: true });
    this.setStorageColor();
  }

  setStorageColor() {
    AsyncStorage.setItem('@Hailing:Color', this.state.color);
  }

  render() {
    const {
      color = '#ee0000',
      hailing,
      icon,
      rate,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Hailing</Text>
          <TouchableOpacity
            activeOpacity={.8}
            onPress={this.openHailing}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
        <ColorWheel
          // initialColor={color}
          onColorChange={newColor => this.setColor(newColor)}
          style={{width: Dimensions.get('window').width}}
          thumbStyle={{ height: 30, width: 30, borderRadius: 30}}
        />
        <Hailing
          closeHailing={this.closeHailing}
          color={color}
          icon={icon}
          rate={rate}
          visible={hailing}
        />
      </View>
    )
  }
}

