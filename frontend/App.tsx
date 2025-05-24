import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import auth context
import { AuthProvider, useAuth } from './src/context/AuthContext';

// Import auth screens
import LoginScreen from './src/screens/auth/LoginScreen';
import SignupScreen from './src/screens/auth/SignupScreen';
import ForgotPasswordScreen from './src/screens/auth/ForgotPasswordScreen';

// Import main tab screens
import DashboardScreen from './src/screens/dashboard/DashboardScreen';
import ExploreScreen from './src/screens/explore/ExploreScreen';
import PlanScreen from './src/screens/plan/PlanScreen';
import PantryScreen from './src/screens/pantry/PantryScreen';

// Import settings screens
import ProfileAccountScreen from './src/screens/settings/ProfileAccountScreen';

// Import components
import TabBarIcon from './src/components/TabBarIcon';

// Import the navigation reference
import { navigationRef } from './src/navigation/navigationRef';

// Import theme
import theme from './src/styles/theme';

// Import onboarding screens
import DefineGoalScreen from './src/screens/onboarding/DefineGoalScreen';
import ConnectToAppleHealthScreen from './src/screens/onboarding/ConnectToAppleHealthScreen';
import UserInfoScreen from './src/screens/onboarding/UserInfoScreen';
import WorkoutsPerWeekScreen from './src/screens/onboarding/WorkoutsPerWeekScreen';
import BodyFatScreen from './src/screens/onboarding/BodyFatScreen';
import NutritionalGoalsScreen from './src/screens/onboarding/NutritionalGoalsScreen';
import BudgetScreen from './src/screens/onboarding/BudgetScreen';
import AllergiesScreen from './src/screens/onboarding/AllergiesScreen';
import CompleteOnboardingScreen from './src/screens/onboarding/CompleteOnboardingScreen';

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

type SettingsStackParamList = {
  ProfileAccount: undefined;
  Integrations: undefined;
  GoalsPreferences: undefined;
  NotificationSettings: undefined;
  PaymentSettings: undefined;
};

type RootStackParamList = {
  Auth: undefined;
  Onboarding: undefined;
  Main: undefined;
  MainTabs: undefined;
  Settings: undefined;
};

type MainTabParamList = {
  Dashboard: undefined;
  Plan: undefined;
  Explore: undefined;
  Pantry: undefined;
  Settings: undefined;
};

// Create our navigators
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

// Placeholder components for settings screens
const IntegrationsScreen = () => (
  <View style={styles.screenContainer}><Text>Integrations Screen</Text></View>
);

const GoalsPreferencesScreen = () => (
  <View style={styles.screenContainer}><Text>Goals & Preferences Screen</Text></View>
);

const NotificationSettingsScreen = () => (
  <View style={styles.screenContainer}><Text>Notification Settings Screen</Text></View>
);

const PaymentSettingsScreen = () => (
  <View style={styles.screenContainer}><Text>Payment Settings Screen</Text></View>
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
const OnboardingStackScreens = () => (
  <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
    <OnboardingStack.Screen name="DefineGoal" component={DefineGoalScreen} />
    <OnboardingStack.Screen
      name="ConnectToAppleHealth"
      component={ConnectToAppleHealthScreen}
    />
    <OnboardingStack.Screen name="UserInfo" component={UserInfoScreen} />
    <OnboardingStack.Screen name="WorkoutsPerWeek" component={WorkoutsPerWeekScreen} />
    <OnboardingStack.Screen name="BodyFat" component={BodyFatScreen} />
    <OnboardingStack.Screen name="NutritionalGoals" component={NutritionalGoalsScreen} />
    <OnboardingStack.Screen name="Budget" component={BudgetScreen} />
    <OnboardingStack.Screen name="Allergies" component={AllergiesScreen} />
    <OnboardingStack.Screen name="CompleteOnboarding" component={CompleteOnboardingScreen} />
  </OnboardingStack.Navigator>
);

// Settings Navigator
const SettingsNavigator = () => (
  <SettingsStack.Navigator 
    screenOptions={{ 
      headerShown: false,
      animation: 'slide_from_right',
      gestureEnabled: true,
      gestureDirection: 'horizontal',
    }}
  >
    <SettingsStack.Screen name="ProfileAccount" component={ProfileAccountScreen} />
    <SettingsStack.Screen name="Integrations" component={IntegrationsScreen} />
    <SettingsStack.Screen name="GoalsPreferences" component={GoalsPreferencesScreen} />
    <SettingsStack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
    <SettingsStack.Screen name="PaymentSettings" component={PaymentSettingsScreen} />
  </SettingsStack.Navigator>
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

// Combined Stack for Main Navigation with Settings
const MainStackWithSettings = () => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="MainTabs" component={MainNavigator} />
    <RootStack.Screen 
      name="Settings" 
      component={SettingsNavigator}
      options={{
        animation: 'slide_from_right',
        presentation: 'card',
      }}
    />
  </RootStack.Navigator>
);

// Main Navigation Component
const AppNavigator = () => {
  const { isAuthenticated, isLoading, isOnboarded } = useAuth();
  
  // Show a loading indicator while authentication state is being determined
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : !isOnboarded ? (
          <RootStack.Screen name="Onboarding" component={OnboardingStackScreens} />
        ) : (
          <RootStack.Screen name="Main" component={MainStackWithSettings} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

// Main App
const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
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
