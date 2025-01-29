import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import generalStyles from '../assets/styles/generalStyles';
import instructions1 from '../assets/images/instructions1.png';
import instructions2 from '../assets/images/instructions2.png';
import instructions3 from '../assets/images/instructions3.png';
import { UserContext } from '../context/UserContext';
import { updateUserDocument } from '../utils/firestore';
const InstructionScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { user, setUser } = useContext(UserContext);

  const steps = [
    {
      image: instructions1,
      title: 'Get inspired and create your own unique nail look',
    },
    {
      image: instructions2,
      title: 'See a look you love? try it out on your nails!',
    },
    {
      image: instructions3,
      title: 'Come back to your saved designs anytime you need inspiration',
    },
  ];

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      try {
        await updateUserDocument(user.uid, { hasSeenInstructions: true });
        setUser({ ...user, hasSeenInstructions: true });
        navigation.navigate('Home');
      } catch (error) {
        console.log('Error updating doc: ', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topContainer]}>
        <Image
          source={steps[currentStep].image}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={[styles.bottomContainer, generalStyles.marginTopLG]}>
        <Text style={[generalStyles.title, generalStyles.marginBtmMD]}>
          {steps[currentStep].title}
        </Text>
        <TouchableOpacity
          style={[
            generalStyles.button,
            generalStyles.buttonBlackSM,
            generalStyles.smallestButton,
          ]}
          onPress={handleNext}
        >
          <Text style={generalStyles.buttonText}>
            {currentStep === steps.length - 1 ? "Let's Begin →" : 'Next →'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -20,
  },
  topContainer: {
    flex: 0.5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    flex: 0.5,
    paddingHorizontal: 20,
  },
});

export default InstructionScreen;
