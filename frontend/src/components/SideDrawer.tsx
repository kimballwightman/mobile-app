import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import theme from '../styles/theme';
import { useAuth } from '../context/AuthContext';

// Define props
interface SideDrawerProps {
  visible: boolean;
  onClose: () => void;
  navigation: any;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const DRAWER_WIDTH = SCREEN_WIDTH * 0.8;

const SideDrawer: React.FC<SideDrawerProps> = ({ visible, onClose, navigation }) => {
  const { logout, user } = useAuth();
  const slideAnim = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigateToScreen = (screenName: string) => {
    onClose();
    navigation.navigate('Settings', { screen: screenName });
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.closeArea}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <View style={styles.profileSection}>
                <View style={styles.profileIcon}>
                  <Text style={styles.profileIconText}>
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </Text>
                </View>
                <Text style={styles.profileName}>
                  {user?.email || 'User'}
                </Text>
              </View>
            </View>

            <ScrollView style={styles.menuItems}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigateToScreen('ProfileAccount')}
              >
                <Text style={styles.menuItemText}>Profile & Account</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigateToScreen('Integrations')}
              >
                <Text style={styles.menuItemText}>Integrations</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigateToScreen('GoalsPreferences')}
              >
                <Text style={styles.menuItemText}>Goals & Preferences</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigateToScreen('NotificationSettings')}
              >
                <Text style={styles.menuItemText}>Notifications</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigateToScreen('PaymentSettings')}
              >
                <Text style={styles.menuItemText}>Payment Methods</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigateToScreen('Onboarding')}
              >
                <Text style={styles.menuItemText}>Restart Onboarding</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity
                style={[styles.menuItem, styles.logoutButton]}
                onPress={handleLogout}
              >
                <Text style={[styles.menuItemText, styles.logoutText]}>
                  Log Out
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeArea: {
    flex: 1,
  },
  drawer: {
    width: DRAWER_WIDTH,
    backgroundColor: theme.colors.surface,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutralDark,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  profileIconText: {
    color: theme.colors.surface,
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.neutralDark,
    marginVertical: theme.spacing.md,
  },
  logoutButton: {
    marginTop: theme.spacing.md,
  },
  logoutText: {
    color: theme.colors.error,
  },
});

export default SideDrawer; 