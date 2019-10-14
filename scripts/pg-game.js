class PGGame extends React.Component
{
    constructor(props)
    {
        super(props);

        this.passwordList = new PGPasswordList();

        this.state = {
            roundCounter: 0,
            password: "",
            currentTeamTurn: ""
        };
    }

    componentDidMount()
    {
        this.setRandomPassword();
    }

    /**
     * Generates a random password from the passwordList
     * and assigns it to state.password
     */
    setRandomPassword()
    {
        var randomNumber = 
            Math.floor(Math.random() * (this.passwordList.list.length - 1));

        this.setState({
            password: this.passwordList.list[randomNumber]
        });
    }

    render()
    {
        return (
            <div className="game-ctn">
                <div className="header-ctn"></div>
                <div className="sub-header-ctn"></div>
                <div className="password-holder">{this.state.password}</div>
                <PGButtonCircle buttonName="Yes" className="game-btn yes-btn" />
                <PGButtonCircle buttonName="No" className="game-btn no-btn" />
            </div>
        );
    }
}