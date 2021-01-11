import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import DealItem from './DealItem';
import PropTypes from 'prop-types';
class DealList extends Component {
  static propTypes = {
    deals: PropTypes.array.isRequired,
  };
  render() {
    return (
      <View style={styles.list}>
        {/* {this.props.deals.map((deal) => {
          return <Text key={deal.key}>{deal.title}</Text>;
        })} */}
        <FlatList
          data={this.props.deals}
          renderItem={({item}) => <DealItem deal={item}>{item.title}</DealItem>}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  list: {backgroundColor: '#eee', flex: 1, width: '100%', paddingTop: 50},
});
export default DealList;
