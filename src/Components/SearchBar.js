import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
class SearchBar extends Component {
  static propTypes = {
    searchDeals: PropTypes.func.isRequired,
  };
  state = {searchTerm: ''};

  debouncedSearchDeals = debounce(this.props.searchDeals, 300);
  handleChange = (searchTerm) => {
    this.setState({searchTerm}, () => {
      this.debouncedSearchDeals(this.state.searchTerm);
    });
  };
  render() {
    return (
      <TextInput
        style={styles.input}
        placeholder="Search all deals"
        onChangeText={this.handleChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    height: 40,
    borderWidth: 2,
    margin: 4,
    padding: 3,
  },
});

export default SearchBar;
