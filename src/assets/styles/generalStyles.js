import { StyleSheet } from 'react-native';

const generalStyles = StyleSheet.create({
  // Container Styles ----------------------------------------

  // Spacing Styles ----------------------------------------

  // MARGINS --------------------------
  // BOTTOM
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
  // TOP
  marginTopSM: {
    marginTop: 18,
  },
  marginTopMD: {
    marginTop: 42,
  },
  marginTopLG: {
    marginTop: 64,
  },
  // START
  marginStrtSM: {
    marginStart: 4,
  },
  marginStrtMD: {
    marginStart: 10,
  },
  marginStrtLG: {
    marginStart: 20,
  },
  marginStrtXL: {
    marginStart: 30,
  },
  // END

  // Button Styles ----------------------------------------
  button: {
    width: '100%',
    height: 51,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  smallestButton: {
    width: '50%',
  },
  smallerButton: {
    width: '90%',
  },
  buttonMain: {
    backgroundColor: '#C85D7C',
  },
  buttonWhite: {
    backgroundColor: '#fff',
  },
  buttonBlack: {
    backgroundColor: '#000',
    height: 48,
    width: '90%',
  },

  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  buttonTextSM: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonFollowing: {
    backgroundColor: '#834189',
    width: '30%',
    height: 41,
  },
  buttonFollow: { backgroundColor: '#000', width: '30%', height: 41 },

  // Text Styles ---------------------------------------
  // Inputs
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlign: 'start',
    alignSelf: 'center',
    width: '90%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 10,
    height: 50,
    borderColor: 'black',
    borderRadius: 25,
    paddingHorizontal: 10,
    textAlign: 'start',
    alignSelf: 'center',
    width: '90%',
    gap: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    padding: 0,
  },
  // Text
  title: {
    fontSize: 32,
    fontWeight: 300,
    textAlign: 'center',
  },
  titleSection: {
    textAlign: 'start',
  },
  titleHeader: {
    fontWeight: 300,
    fontSize: 28,
  },
  titleHeaderSmall: { fontSize: 24 },
});

export default generalStyles;
