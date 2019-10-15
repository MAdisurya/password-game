class PGGame extends React.Component
{
    constructor(props)
    {
        super(props);

        this.maxPoints = 6;

        this.passwordList = new PGPasswordList();

        this.state = {
            roundCounter: 0,
            password: "",
            currentTeamTurn: 0
        };

        this.setRandomPassword = this.setRandomPassword.bind(this);
        this.setCurrentTeamTurn = this.setCurrentTeamTurn.bind(this);
        this.nextTeamTurn = this.nextTeamTurn.bind(this);
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
        const randomNumber = 
            Math.floor(Math.random() * (this.passwordList.list.length - 1));

        this.setState({
            password: this.passwordList.list[randomNumber]
        });
    }

    /**
     * Sets the current turn for team using the team name
     * @param {*} teamName - the name of the team
     */
    setCurrentTeamTurn(teamName)
    {
        // Linear search necessary as need to check if team exists
        // with passed teamName
        for (var team in AppManager.gameTeams)
        {
            if (AppManager.gameTeams[team].data.teamName == teamName)
            {
                this.setState({
                    currentTeamTurn: team
                });

                return undefined;
            }
        }

        // If teamName doesn't exist
        throw "The teamName specified does not exist in AppManager.gameTeams";
    }

    /**
     * Cycles through to the next team turn.
     * If at last team in AppManager.gameTeams, turn will go to first team
     */
    nextTeamTurn()
    {
        if (this.state.currentTeamTurn < AppManager.gameTeams.length - 1)
        {
            this.setState((state) => ({
                currentTeamTurn: state.currentTeamTurn + 1
            }));
        }
        else
        {
            this.setState({
                currentTeamTurn: 0
            });
        }
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