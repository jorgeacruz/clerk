import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { Button } from '@/components/button';
import * as Liking from 'expo-linking'

import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function Signing(){

    const googleOAuth = useOAuth({ strategy: 'oauth_google' });
    //const linkedinOAuth = useOAuth({ strategy: 'oauth_linkedin' });
    const githubOAuth = useOAuth({ strategy: 'oauth_github' });
    const tiktokSigning = useOAuth({ strategy: 'oauth_tiktok' });
    const slackSigning = useOAuth({ strategy: 'oauth_slack' });

    const [isLoading, setIsLoading] = useState(false);

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

            const oAuthFlow = await slackSigning.startOAuthFlow({ redirectUrl});  
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
            <Image source={{uri:'https://miro.medium.com/v2/resize:fit:1400/1*GNPSjvfqSPSHoCMNUk4hPA.png'}} style={{width:165, height:45, marginBottom:30}}/>
            <Button 
                icon='logo-google'
                title='Sign in with Google' 
                isloading={isLoading} 
                onPress={onGoogleSignIn}
            />
            <Button 
                icon='logo-github'
                title='Sign in with GitHub' 
                isloading={isLoading} 
                onPress={onGithubSignIn}
                
            />
            <Button 
                icon='logo-slack'
                title='Sign in with tikTok' 
                isloading={isLoading} 
                onPress={linkedinSigning}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
       // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d3bf08',
    },
    text: {
        fontSize: 20,
        color: '#333',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});