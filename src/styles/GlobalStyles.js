import { StyleSheet } from 'react-native';
import { colors } from './Colors';

export const styles = StyleSheet.create({
    btn: {
        width: 72,
        height: 72,
        backgroundColor: colors.grey,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
    },

    btnEqual: {
        width: 72,
        height: 72,
        backgroundColor: colors.green,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
    },

    btnDelete: {
        width: 64,
        height: 32,
        backgroundColor: colors.grey,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
    },

    btnHistory: {
        width: 64,
        height: 32,
        backgroundColor: colors.grey,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
    },

    text: {
        fontSize: 32,
        color: colors.white,
    },

    textOperator: {
        fontSize: 32,
        color: colors.green,
    },

    textCancel: {
        fontSize: 32,
        color: colors.orange,
    },

    textDelete: {
        fontSize: 20,
        color: colors.orange,
    },

    textHistory: {
        fontSize: 15,
        color: colors.white,
    },

    row: {
        maxWidth: '100%',
        flexDirection: 'row',
    },

    viewBottom: {
        position: 'absolute',
        bottom: 50,
    },

    expression: {
        fontSize: 32,
        color: colors.white,
        fontWeight: '200',
        alignSelf: 'flex-end',
        margin: 10,
    },

    result: {
        fontSize: 32,
        color: colors.green,
        fontWeight: '200',
        alignSelf: 'flex-end',
        margin: 10,
    },

    historyWrapper: {
        width: 300,
        height: 500,
        backgroundColor: colors.black,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: colors.green,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        position: "absolute",
        borderRadius: 20,
        bottom: '20%',
    },

    historyView: {
        width: '85%',
        height: '70%',
        alignSelf:'center',
        backgroundColor: colors.black,
    },

    historyItem: {
        backgroundColor: colors.pink,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },

    historyItemText: {
        fontSize: 20,
    },
    
    searchBar: {
        height: 40,
        width: 230,
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 10,
        padding: 10,
        marginBottom: 5,
        marginHorizontal: 16,
        color: colors.white,
    }
});