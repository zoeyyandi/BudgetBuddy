const React = require('react-native');
const { StyleSheet } = React;
const constants = {
  actionColor: '#22ddd3'
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1
  },
  budgetlist: {
    flex: 1
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 14,
    paddingBottom: 16
  },
  liContainer: {
    flex: 2
  },
  liText: {
    color: '#333',
    fontSize: 16,
    marginRight: 8
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#ffa300',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 60,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#eee',
    fontSize: 20,
    fontWeight: '500'
  },
  center: {
    textAlign: 'center'
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
    shadowColor: '#164674',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 15,
    shadowOpacity: 1.0
  },
  header: {
    backgroundColor: '#ffa300'
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 16
  }
});

module.exports = styles;
module.exports.constants = constants;
