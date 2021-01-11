import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import {priceDisplay} from '../util';
class DealItem extends Component {
  static propTypes = {deal: PropTypes.object.isRequired};
  render() {
    const {deal} = this.props;
    return (
      <View style={styles.DealContainer}>
        <Image source={{uri: deal.media[0]}} style={styles.image} />
        <Text style={styles.title}>{deal.title}</Text>
        <Text style={styles.text}>{priceDisplay(deal.price)}</Text>
        <Text style={styles.text}>{deal.cause.name}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  image: {width: '100%', height: 150},
  DealContainer: {
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  title: {fontWeight: 'bold', padding: 2},
  text: {paddingHorizontal: 3, paddingBottom: 1},
});
export default DealItem;
