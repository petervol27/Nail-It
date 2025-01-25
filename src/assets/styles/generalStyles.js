import { StyleSheet } from 'react-native';

const generalStyles = StyleSheet.create({
  // Container Styles ----------------------------------------

  // Spacing Styles ----------------------------------------

  // MARGINS --------------------------
  marginBtmSM: {
    marginBottom: 24,
  },
  marginBtmMD: {
    marginBottom: 42,
  },
  marginBtmLG: {
    marginBottom: 64,
  },
  marginBtmXL: {
    marginBottom: 82,
  },
  marginTopSM: {
    marginTop: 18,
  },
  marginTopMD: {
    marginTop: 42,
  },
  marginTopLG: {
    marginTop: 64,
  },

  // Button Styles ----------------------------------------
  button: {
    width: '100%',
    height: 51,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  smallerButton: {
    width: '50%',
  },
  buttonMain: {
    backgroundColor: '#A96BAE',
  },
  buttonWhite: {
    backgroundColor: '#fff',
  },
  buttonBlack: {
    backgroundColor: '#000',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
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
