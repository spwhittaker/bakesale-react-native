import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {priceDisplay} from '../util';
import ajax from '../ajax';
class DealDetail extends Component {
  state = {deal: this.props.initialDealData};
  static propTypes = {
    initialDealData: PropTypes.object.isRequired,
    onBackPress: PropTypes.func.isRequired,
  };

  async componentDidMount() {
    const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);

    this.setState({deal: fullDeal});
  }
  render() {
    const {deal} = this.state;

    return (
      <ScrollView>
        <TouchableOpacity onPress={this.props.onBackPress} style={styles.back}>
          <Text>Back</Text>
        </TouchableOpacity>
        <View>
          <Image source={{uri: deal.media[0]}} style={styles.image} />
          <Text style={styles.title}>{deal.title}</Text>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
              <Text style={styles.text}>{deal.cause.name}</Text>
            </View>

            {deal.user && (
              <View style={styles.user}>
                <Image source={{uri: deal.user.avatar}} style={styles.avatar} />
                <Text>{deal.user.name}</Text>
              </View>
            )}
          </View>
          {deal.description && (
            <View>
              <Text style={styles.description}>{deal.description}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  image: {width: '100%', height: 150},

  title: {
    fontWeight: 'bold',
    padding: 5,
    fontSize: 20,
    backgroundColor: 'pink',
    marginBottom: 5,
  },
  text: {paddingHorizontal: 3, paddingBottom: 1},
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1,
  },
  back: {
    fontSize: 30,
    backgroundColor: 'green',
    padding: 5,

    color: 'white',
    flexShrink: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  backText: {margin: 'auto'},
  description: {fontSize: 20, padding: 10},
  user: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  price: {fontWeight: 'bold'},
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
export default DealDetail;
