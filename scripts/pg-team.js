class PGTeam
{
    constructor()
    {
        this.data = {
            teamIndex: 0,
            teamName: "",
            points: 0,
            players: [],
            currentPlayerTurn: "",
            currentPasswordGiver: ""
        };

        this.currentPlayerIndex = 1;
        this.passwordGiverIndex = 0;

        this.nextPlayerTurn = this.nextPlayerTurn.bind(this);
    }

    /**
     * Increments currentPlayerIndex and assigns the next player 
     * in players array to currentPlayerTurn
     */
    nextPlayerTurn()
    {
        if (this.currentPlayerIndex < this.data.players.length - 1)
        {
            this.currentPlayerIndex += 1;
        }
        else
        {
            this.currentPlayerIndex = 0;
        }

        this.data.currentPlayerTurn = 
            this.data.players[this.currentPlayerIndex].data.playerName;
    }

    /**
     * Increments passwordGiverIndex and assigns the next password giver
     * from the players array to currentPasswordGiver
     */
    nextPasswordGiverTurn()
    {
        if (this.passwordGiverIndex < this.data.players.length - 1)
        {
            this.passwordGiverIndex += 1;
        }
        else
        {
            this.passwordGiverIndex = 0;
        }

        this.data.currentPasswordGiver =
            this.data.players[this.passwordGiverIndex].data.playerName;
    }

    /**
     * Resets the teams points to zero
     */
    resetPoints()
    {
        this.data.points = 0;
    }
}

class PGTeamSetup extends React.Component
{
    constructor(props)
    {
        super(props);

        this.newTeam = new PGTeam();
        this.newTeam.data.teamName = this.props.teamName;
        
        this.addPlayer = this.addPlayer.bind(this);
        this.removePlayer = this.removePlayer.bind(this);
        this.updatePlayerName = this.updatePlayerName.bind(this);
    }

    componentDidMount()
    {
        this.addPlayer();
        this.addPlayer();

        // Register the team into AppManager
        AppManager.registerTeam(this.newTeam);

        // Re-assign newTeam to point to 
        // recently registered team in AppManager.gameTeams
        try
        {
            this.newTeam = AppManager.gameTeams[AppManager.gameTeams.length - 1];
        }
        catch (err)
        {
            console.log("Failed to re-assign PGTeamSetup.newTeam to AppManager.gameTeam at given index");
            console.log("Error code: " + err);
        }

        this.newTeam.data.teamIndex = AppManager.gameTeams.length - 1;
    }

    /**
     * Callback method for when needing to Update a Player's name in the team array.
     * @param {*} name - the new name for the player
     * @param {*} index - the zero-based index for the player that is getting a name change.
     */
    updatePlayerName(name, index)
    {
        this.newTeam.data.players[index].data.playerName = name;

        if (index == 0)
        {
            this.newTeam.data.currentPasswordGiver = name;
        }
        else if (index == 1)
        {
            this.newTeam.data.currentPlayerTurn = name;
        }
    }

    /**
     * Adds a player to the team array, and re-renders UI by invoking forceUpdate method
     */
    addPlayer()
    {
        const newPlayer = new PGPlayer();
        newPlayer.data.playerName = 
            `Player ${this.newTeam.data.players.length + 1}`;

        // Check if player names are the same
        // If they are the same, then add 1
        // E.g. if Player 2 exists then add 1 to make Player 3
        for (var i = 0; i < this.newTeam.data.players.length; i++)
        {
            const name = this.newTeam.data.players[i].data.playerName;
            const playerIndex = Number(name[name.length - 1]);

            if (newPlayer.data.playerName == name)
            {
                newPlayer.data.playerName = 
                    `Player ${playerIndex + 1}`
            }
        }

        // Assign newTeam.currentPasswordGiver 
        // only if players array is empty
        // Otherwise, assign player turn to second player
        if (this.newTeam.data.players.length < 1)
        {
            this.newTeam.data.currentPasswordGiver = 
                newPlayer.data.playerName;
        }
        else if (this.newTeam.data.players.length == 1)
        {
            this.newTeam.data.currentPlayerTurn =
                newPlayer.data.playerName;
        }

        this.newTeam.data.players.push(newPlayer);

        this.forceUpdate();
    }

    /**
     * Removes a player from the team array, and re-renders the UI by invoking forceUpdate method
     * @param {*} e - the DOM element associated with removing the player e.g. Remove button
     */
    removePlayer(e)
    {   
        this.newTeam.data.players.splice(e.target.value, 1);

        this.forceUpdate();
    }

    render()
    {   
        return (
            <div className="pg-team-setup-ctn">
                <h2 className={"p" + (this.newTeam.data.teamIndex+1) + "-color"}>
                    {this.props.teamName}
                </h2>
                <form>
                    {this.newTeam.data.players.map((playerItem, index) => (
                        <div key={playerItem.data.playerName} className="pg-player-input-ctn">
                            <PGInput 
                                className="pg-player-input" 
                                initialValue={playerItem.data.playerName}
                                indexValue={index} 
                                onChange={this.updatePlayerName} 
                            />
                            <button 
                                type="button"
                                value={index}
                                className="remove-btn"
                                onClick={this.removePlayer}
                            >Remove</button>
                        </div>
                    ))}
                </form>
                <PGButtonCircle buttonName="+" onClick={this.addPlayer} />
            </div>
        );
    }
}

class PGTeamSetupScene extends PGScene
{
    render()
    {
        return (
            <section id={this.props.sceneName} className="fade-transition">
                <div className="team-one-setup-ctn">
                    <PGTeamSetup teamName="TEAM ONE" />
                </div>
                <div className="team-two-setup-ctn">
                    <PGTeamSetup teamName="TEAM TWO" />
                </div>

                <PGButton 
                    buttonName="Next" 
                    className="start-btn"
                    onClick = {() => {
                        PGSceneManager.goToScene("pg-settings");
                    }} 
                />
            </section>
        );
    }
}