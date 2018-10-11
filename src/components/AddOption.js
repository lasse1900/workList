import React from 'react';


export default class AddOption extends React.Component {
    state = {
        error: undefined
    };

    handdleAddOption = (e) => {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handdleAddOption(option);

        this.setState(() => ({
            error: error
        }));

        if(!error){
            e.target.elements.option.value= '';
        }
    };

    render() {
        return (
            <div>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.handdleAddOption}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
            </div>
        );
    }
};