import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create ({
    container: {
        flexDirection: "row",
        margin: 10,
        alignItems: 'flex-end',
    },
    mainContainer: {
        flexDirection: "row",
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        marginRight: 10,
        flex: 1,
        alignItems: 'flex-end',
        
    },
    textInput: {
        flex: 1,
        marginHorizontal: 10,
        padding: 4,
    },
    icon: {
        marginHorizontal: 5,
    },
    buttonContainer: {
        margin: 2,
        backgroundColor: Colors.dark.tint,
        borderRadius: 40,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default styles;