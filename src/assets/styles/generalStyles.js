import { StyleSheet } from 'react-native';

const generalStyles = StyleSheet.create({
  // Container Styles ----------------------------------------

  // Button Styles ----------------------------------------
  button: {
    width: 305,
    height: 51,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonMain: {
    backgroundColor: '#A96BAE',
  },
  buttonWhite: {
    backgroundColor: '#fff',
  },
  // Input Styles ---------------------------------------
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlign: 'start',
  },
});

export default generalStyles;
