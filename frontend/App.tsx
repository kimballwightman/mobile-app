import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import auth screens
import LoginScreen from './src/screens/auth/LoginScreen';
import SignupScreen from './src/screens/auth/SignupScreen';
import ForgotPasswordScreen from './src/screens/auth/ForgotPasswordScreen';

// Import main tab screens
import DashboardScreen from './src/screens/dashboard/DashboardScreen';
import ExploreScreen from './src/screens/explore/ExploreScreen';
import PlanScreen from './src/screens/plan/PlanScreen';
import PantryScreen from './src/screens/pantry/PantryScreen';

// Import components
import TabBarIcon from './src/components/TabBarIcon';

// Import the navigation reference
import { navigationRef } from './src/navigation/navigationRef';

// Import theme
import theme from './src/styles/theme';

// Define our stack navigator types
type AuthStackParamList = {
  Login: { animation?: string } | undefined;
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

// Placeholder components for our onboarding screens
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

// Auth Navigator
const AuthNavigator = () => (
  <AuthStack.Navigator 
    screenOptions={{ 
      headerShown: false,
      animation: 'slide_from_right',
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      // This ensures transitions are consistent
      animationTypeForReplace: 'push',
    }}
  >
    <AuthStack.Screen 
      name="Login" 
      component={LoginScreen} 
      options={{
        // No specific animation needed for initial screen
      }}
    />
    <AuthStack.Screen 
      name="Signup" 
      component={SignupScreen} 
    />
    <AuthStack.Screen 
      name="ForgotPassword" 
      component={ForgotPasswordScreen} 
    />
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
  <MainTab.Navigator 
    screenOptions={{ 
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.textSecondary,
      tabBarShowLabel: false, // Hide default labels as we use custom ones in TabBarIcon
    }}
  >
    <MainTab.Screen 
      name="Dashboard" 
      component={DashboardScreen} 
      options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon name="Dashboard" focused={focused} />
        ),
      }}
    />
    <MainTab.Screen 
      name="Plan" 
      component={PlanScreen} 
      options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon name="Plan" focused={focused} />
        ),
      }}
    />
    <MainTab.Screen 
      name="Explore" 
      component={ExploreScreen} 
      options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon name="Explore" focused={focused} />
        ),
      }}
    />
    <MainTab.Screen 
      name="Pantry" 
      component={PantryScreen} 
      options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon name="Pantry" focused={focused} />
        ),
      }}
    />
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
      // For development, set to true to bypass auth screens and see the main app
      setIsAuthenticated(true);  
      setIsOnboarded(true);     
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
  tabBar: {
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutralDark,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 4,
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
