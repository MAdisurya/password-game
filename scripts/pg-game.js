class PGGame extends React.Component
{
    constructor(props)
    {
        super(props);

        this.maxPoints = 6;
        this.maxRounds = 5;
        this.penaltyPoints = -4;

        this.passwordList = new PGPasswordList();

        this.gameOverElement = undefined;

        this.state = {
            roundCounter: 0,
            failedAttempts: 0,
            password: "",
            currentTeamTurn: 0,
            currentTeamName: "",
            currentPlayerTurn: "",
        };

        this.setRandomPassword = this.setRandomPassword.bind(this);
        this.setCurrentTeamTurn = this.setCurrentTeamTurn.bind(this);
        this.awardPoints = this.awardPoints.bind(this);
        this.nextTeamTurn = this.nextTeamTurn.bind(this);
        this.startRound = this.startRound.bind(this);
        this.nextRound = this.nextRound.bind(this);
        this.nextTurn = this.nextTurn.bind(this);
        this.onCheat = this.onCheat.bind(this);
        this.resetProps = this.resetProps.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.endGame = this.endGame.bind(this);
    }

    componentDidMount()
    {
        this.setRandomPassword();

        this.setState({
            currentTeamName: AppManager
                .gameTeams[this.state.currentTeamTurn].data.teamName,
            currentPlayerTurn: AppManager
                .gameTeams[this.state.currentTeamTurn].data.currentPlayerTurn
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
                currentTeamTurn: state.currentTeamTurn + 1,
                currentPlayerTurn: AppManager
                    .gameTeams[state.currentTeamTurn + 1].data.currentPlayerTurn
            }));

            // Change color scheme
            // Need to increment by 2 because state hasn't 
            // been updated at this point in runtime
            AppManager.changeColorScheme(`p${this.state.currentTeamTurn + 2}-color`);
        }
        else
        {
            this.setState({
                currentTeamName: AppManager
                    .gameTeams[0].data.teamName,
                currentTeamTurn: 0,
                currentPlayerTurn: AppManager
                    .gameTeams[0].data.currentPlayerTurn
            });

            // Change color scheme
            AppManager.changeColorScheme(`p1-color`);
        }
    }

    /**
     * Starts the game round
     */
    startRound()
    {
        // Need to replace - change text of game subheader instead of hiding/unhiding
        document.getElementById("new-password-btn").style.visibility = "hidden";
        document.getElementById("pg-game-sub-header").style.visibility = "visible";
        document.getElementById("pg-game-btn-wrapper")
            .classList.add("slide-horizontal-end");

        // Change color scheme to current team color
        AppManager.changeColorScheme(`p${this.state.currentTeamTurn + 1}-color`);
    }

    /**
     * Ends the game round
     */
    endRound()
    {
        // Need to replace - change text of game subheader instead of hiding/unhiding
        document.getElementById("new-password-btn").style.visibility = "visible";
        document.getElementById("pg-game-sub-header").style.visibility = "hidden";
        document.getElementById("pg-game-btn-wrapper")
            .classList.remove("slide-horizontal-end");

        // Change color scheme to default
        AppManager.defaultColorScheme();
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
        
        for (var i = 0; i < AppManager.gameTeams.length; i++)
        {
            AppManager.gameTeams[i].nextPlayerTurn();
        }

        this.awardPoints(this.state.currentTeamTurn);
        this.nextTeamTurn();
        this.setRandomPassword();
        this.endRound();

        console.log("nextRound method invoked:");
        console.log(AppManager.gameTeams);

        if (this.state.roundCounter >= this.maxRounds - 1)
        {
            this.endGame();
        }
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

    endGame()
    {
        console.log("endGame method invoked");

        this.resetGame();

        // Sort gameTeams here
        AppManager.gameTeams = 
            AppManager.reverseMergeSortTeams(AppManager.gameTeams);

        this.gameOverElement = <PGGameOver />;

        this.forceUpdate();

        document.getElementById('pg-game-ctn').classList.remove("fade-transition-show");
        document.getElementById('pg-game-over').classList.add("fade-transition-show");
    }

    render()
    {
        return (
            <section id="pg-game" className="fade-transition">
                <section id="pg-game-ctn" className="fade-transition fade-transition-show">
                    <div className="header-ctn">
                        <h3>ROUND {this.state.roundCounter + 1}</h3>
                    </div>
                    <div className="pg-password-holder">
                        <div id="pg-game-sub-header-ctn" className="sub-header-ctn">
                            <h3 id="pg-game-sub-header">
                                {this.state.currentTeamName}: {this.state.currentPlayerTurn}
                            </h3>
                        </div>
                        <h2 onClick={this.onCheat}>"{this.state.password}"</h2>
                        <PGButton
                            buttonName="New Password"
                            id="new-password-btn"
                            className="pg-small-btn-ctn new-password-btn"
                            onClick={this.setRandomPassword} />
                    </div>
                    <div id="pg-game-btn-wrapper" className="pg-game-btn-wrapper slide-horizontal-start">
                        <div className="pg-game-btn-ctn-outer">
                            <div className="pg-button-ctn">
                                <PGButton
                                    buttonName="Start"
                                    className="start-btn"
                                    onClick={this.startRound} />
                            </div>
                        </div>
                        <div className="pg-game-btn-ctn-outer">
                            <div className="pg-game-btn-ctn">
                                <PGButtonCircle 
                                    buttonName="Yes" 
                                    className="pg-game-btn yes-btn"
                                    onClick={this.nextRound} />
                                <PGButtonCircle 
                                    buttonName="No" 
                                    className="pg-game-btn no-btn" 
                                    onClick={this.nextTurn} />
                            </div>
                        </div>
                    </div>
                </section>
                
                <section id="pg-game-over" className="fade-transition">
                    {this.gameOverElement}
                </section>
            </section>
        );
    }
}