import { directive, tsImportEqualsDeclaration } from "@babel/types";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import InputNumberButton from "./numberButton";

const buttons = [
  ['AC', 'DEL', '/'],
  ['7','8','9','*'],
  ['4','5','6', '-'],
  ['1','2','3','+'],
  ['0', '.', '=']
];

class App extends Component {

  constructor() {
    super()
    this.initialState = {
      displayValue: '0',
      operator: null,
      firstValue: '',
      secondValue: '',
      nextValue: false
    }
    this.state = this.initialState;
  }

  renderButtons() {
    let layouts = buttons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return <InputNumberButton
                  value={buttonItems}
                  handleOnPress={this.handleInput.bind(this, buttonItems)}
                  key={'btn-' + buttonIndex} />
      });
      return <View style={styles.inputRow} key={'row-'+index}>{rowItem}</View>
    });
    return layouts
  }

  handleInput = (input) =>{
    const { displayValue, operator, firstValue, secondValue, nextValue } = this.state;

    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.setState({
          displayValue: (displayValue === '0') ? input : displayValue + input
        })
        if(!nextValue) {
          this.setState({
            firstValue: firstValue + input
          })
        } else {
          this.setState({
            secondValue: secondValue + input
          })
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState({
          nextValue: true,
          operator: input,
          displayValue: (operator !== null ? displayValue.substr(0, displayValue.length - 1) : displayValue) + input
        })
        break;
      case '.' :
        let dot = displayValue.toString().slice(-1)
        this.setState({
          displayValue: dot !=='.' ? displayValue + input : displayValue
        })
        if(!nextValue) {
          this.setState({
            firstValue: firstValue + input
          })
        } else {
          this.setState({
            secondValue: secondValue + input
          })
        }
        break;

      case '=' :
        let formatOperator = (operator == '*') ? '*' : (operator == '/') ? '/' : operator
        let result = eval(firstValue+formatOperator+secondValue)
        this.setState({
          displayValue: result % 1 === 0 ? result :result.toFixed(3),
          firstValue: result % 1 === 0 ? result :result.toFixed(3),
          secondValue: '',
          operator: null,
          nextValue: false
        })
        break;

      case 'AC' :
        this.setState(this.initialState);
        break;
      case 'DEL' :
        let string = displayValue.toString();
        let deletedString = string.substr(0, string.length - 1);
        let length = string.length;
        this.setState({
          displayValue: length === 1 ? '0' : deletedString,
          firstValue: length === 1 ? '' : deletedString
        })
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {this.state.displayValue}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          {this.renderButtons()}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  resultContainer: {
    flex: 3,
    justifyContent:'center',
    backgroundColor: 'black'
  },
  inputContainer: {
    flex: 5,
    backgroundColor: '#7d7d7f'
  },
  resultText: {
    color: 'white',
    fontSize: 70,
    fontWeight: 'bold',
    padding: 30,
    textAlign: 'right'
  },
  inputRow: {
    flex:2,
    flexDirection: 'row'
  }
});

export default App;