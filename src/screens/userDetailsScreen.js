import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { createUserDocument } from '../utils/firestore'; // Function to save user data to Firestore
import { COUNTRIES, LANGUAGES } from '../utils/constants';
import { UserContext } from '../context/UserContext';
import generalStyles from '../assets/styles/generalStyles';
import DropDownPicker from 'react-native-dropdown-picker';
const UserDetailsScreen = ({ route, navigation }) => {
  // const { name, email, password } = route.params; // Retrieve data from the previous screen
  const [type, setType] = useState('personal'); // Default to "personal"
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');
  const { setUser } = useContext(UserContext);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countryValue, setCountryValue] = useState(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [languageValue, setLanguageValue] = useState(null);
  const [countries, setCountries] = useState(
    COUNTRIES.map((country) => ({
      label: country,
      value: country,
    }))
  );

  const [languages, setLanguages] = useState(
    LANGUAGES.map((language) => ({
      label: language,
      value: language,
    }))
  );
  const handleSignUp = async () => {
    if (!country || !language) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      // Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      const user = userCredential.user;

      // Save additional data to Firestore
      await createUserDocument(userId, { name, type, country, language });

      alert('Signed up successfully!');
      setUser(user);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setCountryOpen(false);
        setLanguageOpen(false);
      }}
    >
      <View style={styles.container}>
        <Text style={generalStyles.title}>Sign Up</Text>
        <Text
          style={[
            generalStyles.title,
            generalStyles.marginTopMD,
            generalStyles.marginBtmSM,
            styles.titleSection,
          ]}
        >
          Are You
        </Text>
        <View
          style={[
            generalStyles.buttonContainer,
            styles.optionContainer,
            generalStyles.marginBtmMD,
          ]}
        >
          <TouchableOpacity
            style={[
              generalStyles.button,
              generalStyles.smallestButton,
              styles.option,
              type === 'professional' && styles.optionSelected,
            ]}
            onPress={() => {
              setType('professional');
              setCountryOpen(false);
              setLanguageOpen(false);
            }}
          >
            <Text
              style={[
                styles.optionText,
                type === 'professional' && styles.optionTextSelected,
              ]}
            >
              Professional
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              generalStyles.button,
              generalStyles.smallestButton,
              styles.option,
              type === 'personal' && styles.optionSelected,
            ]}
            onPress={() => {
              setType('personal');
              setCountryOpen(false);
              setLanguageOpen(false);
            }}
          >
            <Text
              style={[
                styles.optionText,
                type === 'personal' && styles.optionTextSelected,
              ]}
            >
              Personal User
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={[
            generalStyles.title,
            styles.titleSection,
            generalStyles.marginBtmSM,
          ]}
        >
          Country
        </Text>
        <DropDownPicker
          open={countryOpen}
          value={countryValue}
          items={countries}
          setOpen={(open) => {
            setCountryOpen(open);
            if (open) {
              setLanguageOpen(false);
            }
          }}
          setValue={setCountryValue}
          setItems={setCountries}
          placeholder="Select your country"
          style={[styles.dropdown, generalStyles.marginBtmSM]}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.dropdownText}
          containerStyle={[styles.dropdownWrapper, { zIndex: 1000 }]}
          closeOnBackPressed={true}
          closeOnBlur={true}
        />
        <Text
          style={[
            generalStyles.title,
            styles.titleSection,
            generalStyles.marginBtmSM,
          ]}
        >
          Language
        </Text>
        <DropDownPicker
          open={languageOpen}
          value={languageValue}
          items={languages}
          setOpen={(open) => {
            setLanguageOpen(open);
            if (open) {
              setCountryOpen(false);
            }
          }}
          setValue={setLanguageValue}
          setItems={setLanguages}
          placeholder="Select your language"
          style={[styles.dropdown, generalStyles.marginBtmLG]}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.dropdownText}
          containerStyle={[styles.dropdownWrapper, { zIndex: 999 }]}
          closeOnBackPressed={true}
          closeOnBlur={true}
        />
        <TouchableOpacity
          style={[
            generalStyles.button,
            generalStyles.smallestButton,
            generalStyles.buttonMain,
          ]}
          onPress={() => {
            setCountryOpen(false);
            setLanguageOpen(false);
            handleSignUp();
          }}
        >
          <Text style={generalStyles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleSection: {
    textAlign: 'start',
  },
  option: {
    borderWidth: 1,
    borderColor: '#A96BAE',
    color: '#A96BAE',
  },
  optionContainer: {
    gap: 10,
  },
  optionSelected: {
    borderColor: '#A96BAE',
    backgroundColor: '#A96BAE',
  },
  optionText: {
    color: '#A96BAE',
    fontSize: 16,
  },
  optionTextSelected: {
    color: '#fff',
  },

  dropdown: {
    width: '100%',
    height: 51,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#ccc',
    paddingStart: 20,
  },
  dropdownText: {
    color: '#868e96',
  },
  dropdownContainer: {
    borderColor: '#ccc',
    borderRadius: 25,
  },
  dropdownWrapper: {
    marginBottom: 15,
    width: '100%',
    alignSelf: 'center',
  },
});

export default UserDetailsScreen;
