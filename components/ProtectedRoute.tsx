import { useContext, useEffect } from 'react';
import { Redirect } from 'expo-router';
import { AuthContext } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';

export function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/" />;
  }

  return children;
}