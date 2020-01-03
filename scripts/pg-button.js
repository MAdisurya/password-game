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
    render()
    {
        return (
            <div className="pg-checkbox-ctn">
                <div>
                    <h3>{this.props.buttonName}</h3>
                </div>
                <input type="checkbox"></input>
            </div>
        );
    }
}