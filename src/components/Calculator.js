import React, { useState, useEffect } from 'react';
import Button from './Button';
import { styles } from '../styles/GlobalStyles';
import { View, Text, ScrollView, Modal, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Calculator() {
    const operators = '+-×÷%';
    const [onLoading, setOnLoading] = React.useState(true);
    const [expression, setExpression] = React.useState('');
    const [isResult, setIsResult] = React.useState(false);
    const [historyVisible, setHistoryVisible] = useState(false);
    const [historyArr, setHistoryArr] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Save history to storage
    const storeData = async (history) => {
        try {
            await AsyncStorage.setItem('@history', history);
        } catch (e) {
            console.log(e);
        }
    }
    
    // Get history data from storage
    const getData = async () => {
        try {
            const data = await AsyncStorage.getItem('@history');
            if (data !== null) {
                if (data === '') setHistoryArr([]);
                else {
                    let tempArr = data.split(',');
                    let history = [];
                    while(tempArr.length) history.push(tempArr.splice(0,2));
                    setHistoryArr(history);
                }
            } 
        }   
        catch(e) {
            console.log(e);
        }
    }

    // Save history to storage if any change on historyArr after every rendering. 
    useEffect(() => {
        if (historyArr.length !== 0)
            storeData(historyArr);
    }, [historyArr]);

    // Loading history data from storage when init component.  
    useEffect(() => {
        getData();
    }, []);

    // Handle input expression
    const handleExpression = (btnValue) => {
        setIsResult(false);
        if  (expression.length < 20) {
            // '+/-'
            if (btnValue == '+/-') {
                // empty expression
                if (expression == '') {}
                // if only number 
                else if ( !isNaN(expression) ) {
                    if (expression.slice(0,1) == '-') {
                        setExpression(expression.slice(1)); // remove negative
                    } 
                    else {
                        setExpression('-' + expression); // add negative
                    }
                }
                // if expression
                else {
                    // add negative if already have brackets
                    if (expression.slice(0,1) == '(' && expression.slice(-1) == ')')
                        setExpression('-' + expression); 
                    // add negative and brackets
                    else if (expression.slice(0,2) != '-(' || expression.slice(-1) != ')')
                        setExpression('-(' + expression + ')');
                    // remove negative and brackets
                    else
                        setExpression(expression.slice(2,-1));
                }
            }

            // '()'
            else if (btnValue == '()') {
                if (expression == '') // empty expression
                    setExpression('(');
                else if (expression.slice(-1) == '(') // prev is '('
                    setExpression(expression + '(');
                else if (countChar('(') > countChar(')')) // close brackets   
                    setExpression(expression + ')');
                // prev is number or bracket after fullfilling brackets
                else if (!isNaN(expression.slice(-1)) || expression.slice(-1) == ')' || expression.slice(-1) == '.') 
                    setExpression(expression + '×(');
                else {
                    setExpression(expression + '(');
                }
            }
            
            // else
            else {
                // empty expression
                if (expression == '') {
                    if (btnValue == '.')
                        setExpression('0.');
                    else if (!'×÷%'.includes(btnValue)) 
                        setExpression(expression.slice(0,-1) + btnValue);
                }

                // if prev is operator 
                else if (operators.includes(expression.slice(-1))) {
                    // if operator
                    if (operators.includes(btnValue)) { 
                        if (expression.slice(-1) != btnValue)
                            setExpression(expression.slice(0,-1) + btnValue);
                    }
                     // if '.' 
                    else if (btnValue == '.')
                        setExpression(expression + '0.');
                    else
                        setExpression(expression + btnValue);
                }

                // if prev is close bracket
                else if (expression.slice(-1) == ')') {
                    if (!isNaN(btnValue)) { // if number
                        setExpression('×' + btnValue);
                    }
                    else if (btnValue == '.') {} // if '.' 
                    else
                        setExpression(expression + btnValue);
                }

                // if prev is open bracket 
                else if (expression.slice(-1) == '(') {
                    // if '*/%'
                    if ('×÷%'.includes(btnValue)) {}
                    // if '.' 
                    else if (btnValue == '.') {}
                    else 
                        setExpression(expression + btnValue);
                }

                // if prev is '.'
                else if (expression.slice(-1) == '.') {
                    if (!isNaN(btnValue) || '+-×÷'.includes(btnValue))  // if number or '+-x'
                        setExpression(expression + btnValue);
                }

                // if prev is number
                else {
                    setExpression(expression + btnValue);
                }
            }  
        }
    }

    // Utility func: Count char in expression
    const countChar = (char) => {
        let count = 0;
        for (let i = 0; i < expression.length; i++) {
            if (expression.charAt(i) == char) {
                count++;
            } 
        }
        return count;
    }
    
    const displayExpression = () => {
        return <Text style={isResult ? styles.result : styles.expression}>{expression}</Text>; 
    }

    const clear = () => {
        setExpression('');
        setIsResult(false);
    }

    const handleDelete = () => {
        setExpression(expression.slice(0, -1));
    }
    
    const getResult = () => {
        var encodedExpression = expression.replace(/×/g,'*').replace(/÷/g,'/'); // encode to eval  
        var currentExpression = expression.slice(); // copy expression
        try {
            let result = eval(encodedExpression).toString();
            setHistoryArr([...historyArr, [currentExpression, result]]); // save to history
            setExpression(result);
            setIsResult(true);
        } catch (error) {
            console.log(error);
        }
    }

    // history flat list item
    const Item = ({ expression, result }) => (
        <View style={styles.historyItem}>
          <Text style={styles.historyItemText}>{expression}</Text>
          <Text style= {styles.historyItemText}>= {result}</Text>
        </View>
    );

    // render history flat list items
    const renderItem = ({ item }) => (
        <Item expression={item[0]} result={item[1]} />
    );

    // Search by result
    const searchByResult = (result) => {
        if (result != '') {
            setIsSearching(true);
            setFilteredHistory(historyArr.filter(item => item[1].includes(result)));
        }
        else {
            setIsSearching(false);
        }

    }

    // History view
    const history = () => {
        return (
            <Modal 
                visible={historyVisible}
                transparent={true}
            >
                <KeyboardAvoidingView 
                    style ={styles.historyWrapper}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <TextInput 
                        style={styles.searchBar} 
                        onChangeText={(result) => searchByResult(result)}
                        placeholder="Search by result"
                        placeholderTextColor='rgba(255,255,255,0.5)'
                    />
                    <View style={styles.historyView}> 
                    <FlatList
                        data={isSearching ? filteredHistory : historyArr}
                        renderItem={renderItem}
                    />
                    </View>
                    <View style={{flexDirection: 'row'}}> 
                        <Button title='close' isHistory onPress={() => {setHistoryVisible(!historyVisible); setIsSearching(false);}} />
                        <Button title='Delete' isHistory onPress={() => {setHistoryArr([]); storeData('');}} />
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        );
    }

    return (
        <View style={styles.viewBottom}>
            {history()}
            <View  
                style={{
                    height: 120,
                    width: '100%',
                    justifyContent: 'flex-end',
                    alignSelf: 'center',
                }}
            >
                {displayExpression()}
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}    
            >
                <Button title ='history' isHistory onPress={() => {setHistoryVisible(true)}} />
                <Button title ='⌫' isDelete onPress={() => handleDelete()} />
            </View>
            <View style={styles.row}>
                <Button title='C' isCancel onPress={() => clear()} />
                <Button title='()' onPress={() => handleExpression('()')} />
                <Button title='%' isOperator onPress={() => handleExpression('%')} />
                <Button title='÷' isOperator onPress={() => handleExpression('÷')} />
            </View>

            <View style={styles.row}>
                <Button title='7' onPress={() => handleExpression('7')} />
                <Button title='8' onPress={() => handleExpression('8')} />
                <Button title='9' onPress={() => handleExpression('9')} />
                <Button title='×' isOperator onPress={() => handleExpression('×')} />
            </View>

            <View style={styles.row}>
                <Button title='4' onPress={() => handleExpression('4')} />
                <Button title='5' onPress={() => handleExpression ('5')} />
                <Button title='6' onPress={() => handleExpression('6')} />
                <Button title='-' isOperator onPress={() => handleExpression('-')} />
            </View>

            <View style={styles.row}>
                <Button title='1' onPress={() => handleExpression('1')} />
                <Button title='2' onPress={() => handleExpression('2')} />
                <Button title='3' onPress={() => handleExpression('3')} />
                <Button title='+' isOperator onPress={() => handleExpression('+')} />
            </View>

            <View style={styles.row}>
                <Button title='+/-' onPress={() => handleExpression('+/-')} />
                <Button title='0' onPress={() => handleExpression('0')} />
                <Button title=',' onPress={() => handleExpression('.')} />
                <Button title='=' isEqual onPress={() => getResult()} />
            </View>
        </View>
    );
}