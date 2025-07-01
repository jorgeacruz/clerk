import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

interface buttonProps extends TouchableOpacityProps {   
    title: string;
    isloading?: boolean;
    icon: keyof typeof Ionicons.glyphMap;
}

export function Button({ 
            title, 
            isloading = false, 
            icon, 
            ...rest
        }: buttonProps){
    return(
        <TouchableOpacity disabled={isloading} {...rest} activeOpacity={0.7}
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
            backgroundColor: '#000000', 
            padding: 10, 
            borderRadius: 5
            }}>
        {
            isloading ? (
                <ActivityIndicator size="small" color="#0088" style={{marginRight: 8}} />
            ) : (
                <>
                    <Ionicons name={icon} size={24} color="#d3bf08" style={{marginRight: 8}} />
                    <Text style={{color: '#d3bf08', fontSize: 16, fontWeight:'bold'}}>{title}</Text>
                </>
            )
        }    
        </TouchableOpacity>
    )
}