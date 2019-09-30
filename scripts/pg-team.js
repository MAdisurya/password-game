class PGTeam
{
    constructor()
    {
        this.data = {
            players: []
        };
    }
}

class PGTeamList extends React.Component
{
    render()
    {
        return (
            <form>
                {this.props.playerItems.map(playerItem => (
                    <div className="pg-player-input-ctn">
                        <input 
                            className="pg-player-input"
                            defaultValue={playerItem.data.playerName}
                        />
                        <br />
                    </div>
                ))}
            </form>
        );
    }
}

class PGTeamSetup extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            playerItems: []
        };

        this.newTeam = new PGTeam();
        
        this.addPlayer = this.addPlayer.bind(this);
    }

    addPlayer()
    {
        const newPlayer = new PGPlayer();
        newPlayer.data.playerId = this.state.playerCount;
        newPlayer.data.playerName = 
            `Player ${this.state.playerItems.length + 1}`;

        this.newTeam.data.players.concat(newPlayer);

        this.setState(state => ({
            playerItems: state.playerItems.concat(newPlayer)
        }));
    }

    render()
    {   
        return (
            <div className="pg-team-setup-ctn">
                <h2>{this.props.teamName}</h2>
                <PGTeamList playerItems={this.state.playerItems} />
                <PGButtonCircle buttonName="+" onClick={this.addPlayer} />
            </div>
        );
    }
}