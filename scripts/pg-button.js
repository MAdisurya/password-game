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
            <div className={this.props.className}>
                <button className={this.className} onClick={this.props.onClick}>
                    <h1>{this.props.buttonName}</h1>
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