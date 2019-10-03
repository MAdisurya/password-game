class PGTeam
{
    constructor()
    {
        this.data = {
            players: []
        };
    }
}

class PGTeamSetup extends React.Component
{
    constructor(props)
    {
        super(props);

        this.newTeam = new PGTeam();
        
        this.addPlayer = this.addPlayer.bind(this);
        this.removePlayer = this.removePlayer.bind(this);
        this.updatePlayerName = this.updatePlayerName.bind(this);
    }

    componentDidMount()
    {
        this.addPlayer();
        this.addPlayer();
    }

    /**
     * Callback method for when needing to Update a Player's name in the team array.
     * @param {*} name - the new name for the player
     * @param {*} index - the zero-based index for the player that is getting a name change.
     */
    updatePlayerName(name, index)
    {
        this.newTeam.data.players[index].playerName = name;
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
                <h2>{this.props.teamName}</h2>
                <form>
                    {this.newTeam.data.players.map((playerItem, index) => (
                        <div key={playerItem.data.playerName} className="pg-player-input-ctn">
                            <p>{playerItem.data.playerName}</p>
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