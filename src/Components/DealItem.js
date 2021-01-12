import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {priceDisplay} from '../util';
class DealItem extends Component {
  static propTypes = {
    deal: PropTypes.object.isRequired,

    onPress: PropTypes.func.isRequired,
  };
  handlePress = () => {
    this.props.onPress(this.props.deal.key);
  };
  render() {
    const {deal} = this.props;
    return (
      <TouchableOpacity style={styles.DealContainer} onPress={this.handlePress}>
        <Image source={{uri: deal.media[0]}} style={styles.image} />
        <Text style={styles.title}>{deal.title}</Text>
        <Text style={styles.text}>{priceDisplay(deal.price)}</Text>
        <Text style={styles.text}>{deal.cause.name}</Text>
      </TouchableOpacity>
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
