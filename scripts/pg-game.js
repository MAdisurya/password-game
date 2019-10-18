class PGGame extends React.Component
{
    constructor(props)
    {
        super(props);

        this.maxPoints = 6;
        this.penaltyPoints = -4;

        this.passwordList = new PGPasswordList();

        this.state = {
            roundCounter: 0,
            failedAttempts: 0,
            password: "",
            currentTeamTurn: 0,
            currentTeamName: ""
        };

        this.setRandomPassword = this.setRandomPassword.bind(this);
        this.setCurrentTeamTurn = this.setCurrentTeamTurn.bind(this);
        this.awardPoints = this.awardPoints.bind(this);
        this.nextTeamTurn = this.nextTeamTurn.bind(this);
        this.nextRound = this.nextRound.bind(this);
        this.nextTurn = this.nextTurn.bind(this);
        this.onCheat = this.onCheat.bind(this);
        this.resetProps = this.resetProps.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    componentDidMount()
    {
        this.setRandomPassword();

        this.setState({
            currentTeamName: AppManager
                .gameTeams[this.state.currentTeamTurn].data.teamName
        });
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
                    currentTeamTurn: team,
                    currentTeamName: teamName
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
            currentTeamTurn: teamIndex,
            currentTeamName: AppManager
                .gameTeams[teamIndex].data.teamName
        });
    }

    /**
     * Awards points to the team with passed teamIndex based on how many failed attempts
     * @param {*} teamIndex - the index of the team to find in gameTeams array
     * @param {*} pointAmount - The amount of points to award. Default is 0.
     */
    awardPoints(teamIndex, pointAmount = 0)
    {
        var points = (pointAmount == 0) ? 
            this.maxPoints - this.state.failedAttempts :
            pointAmount;

        AppManager.gameTeams[teamIndex].data.points += points;
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
                currentTeamName: AppManager
                    .gameTeams[state.currentTeamTurn + 1].data.teamName,
                currentTeamTurn: state.currentTeamTurn + 1
            }));
        }
        else
        {
            this.setState({
                currentTeamName: AppManager
                    .gameTeams[0].data.teamName,
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

        this.awardPoints(this.state.currentTeamTurn);
        this.nextTeamTurn();
        this.setRandomPassword();

        console.log("nextRound method invoked:");
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
     * Method that handles cheating. Don't cheat.
     */
    onCheat()
    {
        this.awardPoints(this.state.currentTeamTurn, this.penaltyPoints);

        this.setState((state) => ({
            roundCounter: state.roundCounter + 1,
            failedAttempts: 0
        }));

        this.nextTeamTurn();
        this.setRandomPassword();

        console.log("onCheat method invoked:");
        console.log(AppManager.gameTeams);
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
                <div className="header-ctn">
                    <h3>Round {this.state.roundCounter + 1}</h3>
                </div>
                <div className="sub-header-ctn">
                    <h3>{this.state.currentTeamName}</h3>
                </div>
                <div className="password-holder" onClick={this.onCheat}>
                    <h2>"{this.state.password}"</h2>
                </div>
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