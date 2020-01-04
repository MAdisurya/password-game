class PGButton extends React.Component
{
    constructor(props)
    {
        super(props);

        this.className = "pg-button";
    }

    render()
    {           
        return (
            <div id={this.props.id} className={"pg-button-ctn " + this.props.className}>
                <button className={this.className} onClick={this.props.onClick}>
                    <p>{this.props.buttonName}</p>
                </button>
            </div>
        )
    }
}

class PGButtonCircle extends PGButton
{
    constructor(props)
    {
        super(props);

        this.className += "--circle";
    }
}

class PGCheckbox extends React.Component
{
    constructor(props)
    {
        super(props);

        this.checked = (this.props.checked == undefined) ?
            false : this.props.checked;

        this.state = {
            isChecked: this.checked
        }

        this.toggleCheck = this.toggleCheck.bind(this);
    }

    /**
     * Helper method that toggles this.state.isChecked
     */
    toggleCheck()
    {
        this.setState({
            isChecked: !this.state.isChecked
        });
    }

    render()
    {
        return (
            <div className="pg-checkbox-ctn">
                <div className="pg-label-ctn">
                    <h3>{this.props.buttonName}</h3>
                </div>
                <div className="pg-checkbox">
                    <input 
                        type="checkbox"
                        onChange={this.toggleCheck}
                        checked={this.state.isChecked}
                    />
                </div>
            </div>
        );
    }
}