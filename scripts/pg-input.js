class PGInput extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            value: this.props.value
        }

        this.onValueChanged = this.onValueChanged.bind(this);
    }

    onValueChanged(e)
    {
        this.setState({
            value: e.target.value
        });
    }

    render()
    {
        return (
            <input 
                className={this.props.className}
                value={this.state.value}
                onChange={this.onValueChanged}
            />
        );
    }
}