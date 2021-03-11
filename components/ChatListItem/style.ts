import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 'auto',
        justifyContent: 'space-between',
        padding: 10
    },
    leftContainer: {
        flexDirection: 'row',
    },
    midContainer: {
        justifyContent: 'space-around'
    },
    avatar: {
        height: 60,
        width: 60,
        marginRight: 15,
        borderRadius: 50
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    lastMessage: {
        fontSize: 16,
        color: 'grey',
        width: 180,
    },
    time: {
        fontSize: 16,
        color: 'grey',
        height: 20,
    }
});

export default styles;