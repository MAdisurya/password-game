class PGInput extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            value: this.props.initialValue
        }

        this.onValueChanged = this.onValueChanged.bind(this);
    }

    onValueChanged(e)
    {
        this.setState({
            value: e.target.value
        });

        this.props.onChange(e.target.value, this.props.indexValue);
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