// BottomSheet.js
import React, { useState } from 'react';
import { View } from 'react-native';

function BottomSheet({ onClose, children }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="slide"
      onRequestClose={handleClose}
      visible={isOpen}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
        <View style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 16, backgroundColor: 'white' }}>
          {children}
          <TouchableOpacity style={{ alignSelf: 'center' }} onPress={handleClose}>
            <Text style={{ color: '#007AFF', fontWeight: 'bold', marginTop: 16 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default BottomSheet;