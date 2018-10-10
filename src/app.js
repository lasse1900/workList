
class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: [],
        };
    }

    handleDeleteOptions() {
        this.setState(() => {
            return {
                options: []
            };
        });
    }

    handlePick() {
        console.log('handlePick');
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }

    handleAddOption(option) {
        if(!option) {
            return 'Enter valid value to add';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        } 

        this.setState((prevState) => {
            return {
                options: prevState.options.concat([option])
            };
        });
    }

    render() {
        const title = 'Shopping list';
        const subtitle = 'Select the items from your shopping list';

        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <Action  
                hasOptions={this.state.options.length > 0}
                handlePick={this.handlePick}
                />
                <Options 
                options={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions}
                />
                <AddOption 
                handdleAddOption={this.handleAddOption}
                />
            </div>
        );
    }
}

class Header extends React.Component{
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        );
    }
}

class Action extends React.Component {
    render() {
        return (
            <div>
                <button 
                onClick={this.props.handlePick}
                disabled={!this.props.hasOptions}
                >
                What should I buy?</button>
            </div>

        );
    }
}
  
class Options extends React.Component {
    render() {
        return (
            <div>
            <button onClick={this.props.handleDeleteOptions}>Remove all</button>
                {
                    this.props.options.map((option)=> <Option key={option} optionText = {option}  />)
                }
            </div>
        );
    }
}

class Option extends React.Component {
    render() {
        return (
            <div>
                Option: {this.props.optionText}
            </div>
        );
    }
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handdleAddOption = this.handdleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    handdleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handdleAddOption(option);

        this.setState (() => {
            return {
                error: error
            };
        });
    }

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
}



ReactDOM.render(<IndecisionApp />, document.getElementById('app'));