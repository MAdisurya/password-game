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