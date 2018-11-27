import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import styles from './styles';

export default class Main extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})