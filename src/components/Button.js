import { styles } from '../styles/GlobalStyles';
import { TouchableOpacity, Text } from 'react-native';

export default function Button(props) {
    return (
        <TouchableOpacity
            style={
                props.isEqual 
                ? styles.btnEqual
                : props.isDelete
                ? styles.btnDelete
                : props.isHistory
                ? styles.btnHistory
                : props.isCloseHistory
                ? styles.btnCloseHistory
                : styles.btn
            }
            onPress={props.onPress}
        >
            <Text 
                style={
                    props.isOperator
                    ? styles.textOperator
                    : props.isCancel
                    ? styles.textCancel
                    : props.isDelete
                    ? styles.textDelete
                    : props.isHistory
                    ? styles.textHistory
                    : styles.text
                }   
            >
                {props.title}
            </Text>
        </TouchableOpacity>  
    );
}