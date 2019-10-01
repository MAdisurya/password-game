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
    }

    componentDidMount()
    {
        this.addPlayer();
        this.addPlayer();
    }

    addPlayer()
    {
        const newPlayer = new PGPlayer();
        newPlayer.data.playerId = this.newTeam.data.players.length;
        newPlayer.data.playerName = 
            `Player ${this.newTeam.data.players.length + 1}`;

        this.newTeam.data.players.push(newPlayer);

        this.forceUpdate();
    }

    render()
    {   
        return (
            <div className="pg-team-setup-ctn">
                <h2>{this.props.teamName}</h2>
                <form>
                {this.newTeam.data.players.map(playerItem => (
                    <div className="pg-player-input-ctn">
                        <input 
                            className="pg-player-input"
                            defaultValue={playerItem.data.playerName}
                        />
                        <a 
                            href="#"
                            className="remove-btn"
                        >Remove</a>
                    </div>
                ))}
            </form>
                <PGButtonCircle buttonName="+" onClick={this.addPlayer} />
            </div>
        );
    }
}