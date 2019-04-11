import React, { Component } from 'react';
import {
    Text,
    Dimensions
} from 'react-native';
import Modal from 'react-native-modalbox'
import Button from 'react-native-button'
import { TextInput } from 'react-native-gesture-handler';

var screen = Dimensions.get('window');

export default class SwitchesModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            switchName: '',
            switchLocation: 's'
        }
    }

    showModal = () => {
        this.refs.myModal.open();
    }

    render() {
        return (
            <Modal
                ref={"myModal"}
                style={{
                    justifyContent: 'center',
                    borderRadius: 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 290
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                    alert("Modal Closed")
                }}

            >
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 40
                    }}
                >New Switch</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 1
                    }}
                    placeholder="Enter the name"
                    onChangeText={(text) => this.setState({ switchName: text })}
                    value={this.state.switchName}
                />
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 1
                    }}
                    placeholder="Enter the switch location"
                    onChangeText={(text) => this.setState({ switchLocation: text })}
                    value={this.state.switchLocation}
                />
                <Button
                    style={{ fontSize: 18, color: 'white' }}
                    containerStyle={{
                        padding: 12,
                        marginLeft: 70,
                        marginRight: 70,
                        height: 40,
                        borderRadius: 6,
                        backgroundColor: '#2080B7'
                    }}

                    onPress={() => {
                        if (this.state.switchLocation.length == 0 || this.setState.switchName == 0) {
                            alert("You must enter Switch name and location")
                            return
                        }
                    }}
                >Save
                    </Button>
            </Modal>
        );
    }
}