import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal } from 'react-native';

const OverlayLoader = ({ visible }: { visible: boolean }) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loaderText}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loaderText: {
    color: '#fff',
    marginLeft: 12,
    fontSize: 16,
  },
});

export default OverlayLoader;
