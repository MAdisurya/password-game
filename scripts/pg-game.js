class PGGame extends React.Component
{
    constructor(props)
    {
        super(props);

        this.maxPoints = 6;

        this.passwordList = new PGPasswordList();

        this.state = {
            roundCounter: 0,
            failedAttempts: 0,
            password: "",
            currentTeamTurn: 0
        };

        this.setRandomPassword = this.setRandomPassword.bind(this);
        this.setCurrentTeamTurn = this.setCurrentTeamTurn.bind(this);
        this.awardPoints = this.awardPoints.bind(this);
        this.nextTeamTurn = this.nextTeamTurn.bind(this);
        this.nextRound = this.nextRound.bind(this);
        this.nextTurn = this.nextTurn.bind(this);
        this.resetProps = this.resetProps.bind(this);
        this.resetGame = this.resetGame.bind(this);
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
     * Overloaded method that sets the current team turn using team index
     * @param {*} teamIndex - the zero-based index of team in AppManager.gameTeams array
     */
    setCurrentTeamTurn(teamIndex)
    {
        if (teamIndex >= AppManager.gameTeams.length - 1)
        {
            throw "Cannot set currentTeamTurn to passed index because index is out of range";
        }

        this.setState({
            currentTeamTurn: teamIndex
        });
    }

    /**
     * Awards points to the team with passed teamIndex based on how many failed attempts
     * @param {*} teamIndex - the index of the team to find in gameTeams array
     */
    awardPoints(teamIndex)
    {
        var points = this.maxPoints - this.state.failedAttempts;

        AppManager.gameTeams[this.state.currentTeamTurn].data.points += points;
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

    /**
     * Cycles through to the next round of the game
     */
    nextRound()
    {
        this.setState((state) => ({
            roundCounter: state.roundCounter + 1,
            failedAttempts: 0
        }));

        this.nextTeamTurn();
        this.awardPoints();
        this.setRandomPassword();

        console.log(AppManager.gameTeams);
    }

    /**
     * Cycles through to the next turn
     * when password answer given is incorrect.
     */
    nextTurn()
    {
        if (this.state.failedAttempts >= this.maxPoints)
        {
            this.nextRound();
            return undefined;
        }

        this.nextTeamTurn();

        this.setState((state) => ({
            failedAttempts: state.failedAttempts + 1
        }));
    }

    /**
     * Resets necessary properties to start a new round
     */
    resetProps()
    {
        this.setState({
            failedAttempts: 0
        })

        this.setCurrentTeamTurn(0);
    }

    /**
     * Resets the game
     */
    resetGame()
    {
        this.setState({
            roundCounter: 0,
            failedAttempts: 0,
            currentTeamTurn: 0,
        });

        this.setRandomPassword();
    }

    render()
    {
        return (
            <div className="game-ctn">
                <div className="header-ctn"></div>
                <div className="sub-header-ctn"></div>
                <div className="password-holder">{this.state.password}</div>
                <PGButtonCircle 
                    buttonName="Yes" 
                    className="game-btn yes-btn"
                    onClick={this.nextRound} />
                <PGButtonCircle 
                    buttonName="No" 
                    className="game-btn no-btn" 
                    onClick={this.nextTurn} />
            </div>
        );
    }
}