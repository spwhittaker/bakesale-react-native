import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';
import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';
import ajax from '../ajax';
class App extends Component {
  titleXPos = new Animated.Value(0);
  state = {deals: [], currentDealId: null, dealsFromSearch: []};

  animateTitle = (direction = 1) => {
    const width = Dimensions.get('window').width - 200;
    Animated.timing(this.titleXPos, {
      toValue: direction * (width / 2),
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start(({finished}) => {
      if (finished) {
        this.animateTitle(-1 * direction);
      }
    });
  };
  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    this.setState({deals});

    this.animateTitle();
  }
  searchDeals = async (searchTerm) => {
    let dealsFromSearch = [];
    if (searchTerm) {
      dealsFromSearch = await ajax.fetchDealsSearchResults(searchTerm);
      this.setState({dealsFromSearch});
    } else {
      this.setState({dealsFromSearch: []});
    }
  };
  clearSearch = () => {
    this.setState({dealsFromSearch: []});
  };
  setCurrentDeal = (dealId) => {
    this.setState({currentDealId: dealId});
  };
  unsetCurrentDeal = () => {
    this.setState({currentDealId: null});
  };
  currentDeal = () => {
    return this.state.deals.find(
      (deal) => deal.key === this.state.currentDealId,
    );
  };

  render() {
    const dealsToDisplay =
      this.state.dealsFromSearch.length > 0
        ? this.state.dealsFromSearch
        : this.state.deals;
    if (this.state.currentDealId) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <DealDetail
            initialDealData={this.currentDeal()}
            onBackPress={this.unsetCurrentDeal}
          />
        </SafeAreaView>
      );
    }
    if (dealsToDisplay.length > 0) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <SearchBar searchDeals={this.searchDeals} />
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
        </SafeAreaView>
      );
    }
    return (
      <Animated.View style={[{left: this.titleXPos}, styles.safeArea]}>
        <View style={styles.headerView}>
          <Text style={styles.header}>Bake Sale</Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  header: {fontSize: 40},
  headerView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  safeArea: {flex: 1},
});

export default App;
