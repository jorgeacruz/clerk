import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';

// simple import for the Button component
import { Button } from '@/components/button';
import { TiktokButton } from '@/components/button/tiktokButton';
import { GithubButton } from '@/components/button/gitButton';

// import for the Expo Linking module to create redirect URLs
import * as Liking from 'expo-linking'

import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';

// import for the Expo Router to handle navigation
WebBrowser.maybeCompleteAuthSession();

export default function Signing(){

    // Initialize the OAuth hooks for different providers
    const googleOAuth = useOAuth({ strategy: 'oauth_google' });
    const githubOAuth = useOAuth({ strategy: 'oauth_github' });
    const tiktokSigning = useOAuth({ strategy: 'oauth_tiktok' });
    
    // State to manage loading state during sign-in
    const [isLoading, setIsLoading] = useState(false);

    // Functions to handle sign-in for each provider
    async function onGoogleSignIn() {
        try {

            setIsLoading(true);
            const redirectUrl = Liking.createURL('/');

            const oAuthFlow = await googleOAuth.startOAuthFlow({ redirectUrl});  
            if (oAuthFlow.authSessionResult?.type === 'success') {
                if(oAuthFlow.setActive){
                    await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId})
                } else {
                    setIsLoading(false);
                }
            }
            
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }}

        async function onGithubSignIn() {
        try {

            setIsLoading(true);
            const redirectUrl = Liking.createURL('/');

            const oAuthFlow = await githubOAuth.startOAuthFlow({ redirectUrl});  
            if (oAuthFlow.authSessionResult?.type === 'success') {
                if(oAuthFlow.setActive){
                    await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId})
                } else {
                    setIsLoading(false);
                }
            }
            
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }}

        async function linkedinSigning() {
        try {

            setIsLoading(true);
            const redirectUrl = Liking.createURL('/');

            const oAuthFlow = await tiktokSigning.startOAuthFlow({ redirectUrl});  
            if (oAuthFlow.authSessionResult?.type === 'success') {
                if(oAuthFlow.setActive){
                    await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId})
                } else {
                    setIsLoading(false);
                }
            }
            
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }}

    useEffect(() => {
        
        WebBrowser.warmUpAsync();
        // Clean up the WebBrowser session when the component unmounts
        return () => {
            // This will ensure that the WebBrowser session is cleaned up
            WebBrowser.coolDownAsync();
        }
    }, []);

    return(
        <View style={[styles.container,{gap: 20}]}>
            <StatusBar barStyle='light-content' backgroundColor='#3b3838' hidden={true}/>
            <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnG6N_SAABvc99uhpvkvpXpVDZyuX0Nyaeag&s'}} style={{width:120, height:120, marginBottom:30}}/>
            <Text style={styles.title}>Implement authentication fast and securely
                with elegant UI using Clerk.</Text>
           
            <Button 
                icon='logo-google'
                title='Sign in with Google' 
                isloading={isLoading} 
                onPress={onGoogleSignIn}
            />
            <GithubButton 
                icon='logo-github'
                title='Sign in with GitHub' 
                isloading={isLoading} 
                onPress={onGithubSignIn}
            />
           
            <TiktokButton 
                icon='logo-tiktok'
                title='Sign in with TikTok' 
                isloading={isLoading} 
                onPress={linkedinSigning}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 200,
       // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#101010eb',
    },
    text: {
        fontSize: 20,
        color: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        paddingHorizontal: 40,
        textAlign: 'center',
        color: '#fff',
    },
});