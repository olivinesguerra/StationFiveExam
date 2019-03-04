import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default class App extends React.Component {


  constructor(props){
    super(props)

    this.state = {
      data: [
        // first group of radio-buttons
        [
          { id: '101', value: 'Vegetarian' },
          { id: '102', value: 'Nut allergy' },
          { id: '103', value: 'Halal' }
        ],
        // second group of radio-buttons
        [
          { id: '201', value: 'Cashew chicken' },
          { id: '202', value: 'Sweet and sour pork' },
          { id: '203', value: 'Stir fried Tofu' },
          { id: '204', value: 'Vegetable fried rice' },
          { id: '205', value: 'Pad Thai' },
          { id: '206', value: 'Massaman beef' },
        ],
        // third group of radio-buttons
        [
          { id: '301', value: 'Peanut sauce' },
          { id: '302', value: 'Oyster sauce' },
          { id: '303', value: 'Vegetable spring rolls' },
          { id: '304', value: 'Steamed rice' },
        ],
      ],
      selectedItem: '',
      restriction : {
        // 'Vegetarian' is NOT compatible with 'Cashew chicken', 'Sweet and sour pork', 'Massaman beef', 'Oyster sauce'
        101: ['201', '202', '206', '302'], 
        // 'Nut allergy' is NOT compatible with 'Cashew chicken', 'Peanut sauce',
        102: ['201', '301'], 
        // 'Halal' is NOT compatible with 'Sweet and sour pork',
        103: ['202'], 
        // 'Vegetable fried rice' is NOT compatible with 'Steamed rice' (you don't need more rice... carb overload),
        204: ['304'],
        // 'Pad thai' is NOT compatible with 'Steamed rice' (Pad thai comes with noodles),
        205: ['304'],
      },
      selectedSubItems: []
    };
  }

  onChecklistItem = id => () => {
    console.log('onChecklistItem');

    const { data , selectedSubItems, selectedItem , restriction} = this.state;

    if (data[0].filter(e => e.id === id).length > 0) {
      this.setState({selectedItem : id,selectedSubItems:[]});
    }else{

      if (selectedItem !== "") {
        if(restriction[selectedItem].indexOf(id) === -1){
          const tempSelected = selectedSubItems;
          if(tempSelected.indexOf(id) === -1) {
            tempSelected.push(id);
          }else{
            tempSelected.splice(tempSelected.indexOf(id), 1);
          }
          this.setState({selectedSubItems : tempSelected});
        }
      }
    }
  }

  renderCheckBoxes = () => {
    const { data , enableOther, selectedItem, selectedSubItems} = this.state;
    return data.map( cb => {
       return (<View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginTop: 30}}>
          {
            cb.map(subCB => (
              <CheckBox
                key={subCB.id}
                title={subCB.value}
                checked={
                  selectedItem === subCB.id ? true : selectedSubItems.indexOf(subCB.id) !== -1 ? true : false
                }
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                containerStyle={{ backgroundColor: 'white', borderColor: 'transparent' }}
                wrapperStyle={{ backgroundColor: 'white',}}
                textStyle={{ color: "black" }}
                onPress={this.onChecklistItem(subCB.id)}
              />
            ))
          }
      </View>)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          { this.renderCheckBoxes() }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
