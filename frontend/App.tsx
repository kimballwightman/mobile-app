import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import the LoginScreen we created
import LoginScreen from './src/screens/auth/LoginScreen';
// Import the navigation reference
import { navigationRef } from './src/navigation/navigationRef';

// Define our stack navigator types
type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

type OnboardingStackParamList = {
  DefineGoal: undefined;
  ConnectToAppleHealth: undefined;
  UserInfo: undefined;
  WorkoutsPerWeek: undefined;
  BodyFat: undefined;
  NutritionalGoals: undefined;
  Budget: undefined;
  Allergies: undefined;
  CompleteOnboarding: undefined;
};

type RootStackParamList = {
  Auth: undefined;
  Onboarding: undefined;
  Main: undefined;
};

type MainTabParamList = {
  Dashboard: undefined;
  Plan: undefined;
  Explore: undefined;
  Pantry: undefined;
};

// Create our navigators
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

// Placeholder components for our screens
// Using the LoginScreen we created instead of the placeholder
// const LoginScreen = () => (
//   <View style={styles.screenContainer}><Text>Login Screen</Text></View>
// );

const SignupScreen = () => (
  <View style={styles.screenContainer}><Text>Signup Screen</Text></View>
);

const ForgotPasswordScreen = () => (
  <View style={styles.screenContainer}><Text>Forgot Password Screen</Text></View>
);

// Onboarding screens
const DefineGoalScreen = () => (
  <View style={styles.screenContainer}><Text>Define Goal Screen</Text></View>
);

const ConnectToAppleHealthScreen = () => (
  <View style={styles.screenContainer}><Text>Connect to Apple Health Screen</Text></View>
);

const UserInfoScreen = () => (
  <View style={styles.screenContainer}><Text>User Info Screen</Text></View>
);

const WorkoutsPerWeekScreen = () => (
  <View style={styles.screenContainer}><Text>Workouts Per Week Screen</Text></View>
);

const BodyFatScreen = () => (
  <View style={styles.screenContainer}><Text>Body Fat Screen</Text></View>
);

const NutritionalGoalsScreen = () => (
  <View style={styles.screenContainer}><Text>Nutritional Goals Screen</Text></View>
);

const BudgetScreen = () => (
  <View style={styles.screenContainer}><Text>Budget Screen</Text></View>
);

const AllergiesScreen = () => (
  <View style={styles.screenContainer}><Text>Allergies Screen</Text></View>
);

const CompleteOnboardingScreen = () => (
  <View style={styles.screenContainer}><Text>Complete Onboarding Screen</Text></View>
);

// Main tab screens
const DashboardScreen = () => (
  <View style={styles.screenContainer}><Text>Dashboard Screen</Text></View>
);

const PlanScreen = () => (
  <View style={styles.screenContainer}><Text>Plan Screen (Meal Planning)</Text></View>
);

const ExploreScreen = () => (
  <View style={styles.screenContainer}><Text>Explore Screen (Meal Discovery)</Text></View>
);

const PantryScreen = () => (
  <View style={styles.screenContainer}><Text>Pantry Screen</Text></View>
);

// Auth Navigator
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Signup" component={SignupScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </AuthStack.Navigator>
);

// Onboarding Navigator
const OnboardingNavigator = () => (
  <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
    <OnboardingStack.Screen name="DefineGoal" component={DefineGoalScreen} />
    <OnboardingStack.Screen name="ConnectToAppleHealth" component={ConnectToAppleHealthScreen} />
    <OnboardingStack.Screen name="UserInfo" component={UserInfoScreen} />
    <OnboardingStack.Screen name="WorkoutsPerWeek" component={WorkoutsPerWeekScreen} />
    <OnboardingStack.Screen name="BodyFat" component={BodyFatScreen} />
    <OnboardingStack.Screen name="NutritionalGoals" component={NutritionalGoalsScreen} />
    <OnboardingStack.Screen name="Budget" component={BudgetScreen} />
    <OnboardingStack.Screen name="Allergies" component={AllergiesScreen} />
    <OnboardingStack.Screen name="CompleteOnboarding" component={CompleteOnboardingScreen} />
  </OnboardingStack.Navigator>
);

// Main Tab Navigator
const MainNavigator = () => (
  <MainTab.Navigator screenOptions={{ headerShown: false }}>
    <MainTab.Screen name="Dashboard" component={DashboardScreen} />
    <MainTab.Screen name="Plan" component={PlanScreen} />
    <MainTab.Screen name="Explore" component={ExploreScreen} />
    <MainTab.Screen name="Pantry" component={PantryScreen} />
  </MainTab.Navigator>
);

// Main App
const App = () => {
  // We'll simulate not being authenticated initially
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  
  // Normally this would come from a token check or auth service
  // For demo purposes we'll just use a delay to simulate an auth check
  useEffect(() => {
    // This is just for demonstration - you would check for auth tokens here
    setTimeout(() => {
      setIsAuthenticated(false);  // Set to true to bypass auth screens
      setIsOnboarded(false);     // Set to true to bypass onboarding
    }, 1000);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <RootStack.Screen name="Auth" component={AuthNavigator} />
          ) : !isOnboarded ? (
            <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
          ) : (
            <RootStack.Screen name="Main" component={MainNavigator} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  screenContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fff'
  },
});

export default App;















// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   /*
//    * To keep the template simple and small we're adding padding to prevent view
//    * from rendering under the System UI.
//    * For bigger apps the reccomendation is to use `react-native-safe-area-context`:
//    * https://github.com/AppAndFlow/react-native-safe-area-context
//    *
//    * You can read more about it here:
//    * https://github.com/react-native-community/discussions-and-proposals/discussions/827
//    */
//   const safePadding = '5%';

//   return (
//     <View style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         style={backgroundStyle}>
//         <View style={{paddingRight: safePadding}}>
//           <Header/>
//         </View>
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//             paddingHorizontal: safePadding,
//             paddingBottom: safePadding,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
