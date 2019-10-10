class PGGame extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            roundCounter: 0,
            password: "",
            currentTeamTurn: ""
        };
    }

    render()
    {
        return (
            <div className="game-ctn">
                <div className="header-ctn"></div>
                <div className="sub-header-ctn"></div>
                <PGButtonCircle buttonName="Yes" className="game-btn yes-btn" />
                <PGButtonCircle buttonName="No" className="game-btn no-btn" />
                <div className="password-holder"></div>
            </div>
        );
    }
}