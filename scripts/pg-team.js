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
    }

    componentDidMount()
    {
        this.addPlayer();
        this.addPlayer();
    }

    addPlayer()
    {
        const newPlayer = new PGPlayer();
        newPlayer.data.playerName = 
            `Player ${this.newTeam.data.players.length + 1}`;

        this.newTeam.data.players.push(newPlayer);

        this.forceUpdate();
    }

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
                    <div className="pg-player-input-ctn">
                        <PGInput className="pg-player-input" value={playerItem.data.playerName} />
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