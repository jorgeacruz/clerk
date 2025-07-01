import { Button } from '@/components/button';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { router } from 'expo-router';

export default function Home() {
  
  // The useUser hook provides access to the current user's information
  const { user } = useUser();
  // Importing the useAuth hook from Clerk to manage authentication
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

 return (
   <View style={styles.container}>
    <Image 
      source={{ uri: user?.imageUrl}} 
      style={{width:120, height:120, borderRadius:60}}
    />
    <Text 
      style={styles.text}>{user?.fullName || user?.emailAddresses[0]?.emailAddress}
    </Text>
    
    <Button icon='exit' title='Sign out' onPress={handleSignOut} />
    <StatusBar hidden={true}/>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});