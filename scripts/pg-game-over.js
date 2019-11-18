class PGGameOver extends PGScene
{
    constructor(props)
    {
        super(props)

        this.state = {
            gameTeams: []
        }
    }

    sceneDidLoad()
    {
        super.sceneDidLoad();

        this.setState({
            gameTeams: AppManager.gameTeams
        });
    }
    
    render()
    {
        return (
            <section id={this.props.sceneName} className="fade-transition">
                <div className="pg-game-over-ctn">
                    {this.state.gameTeams.map((team, index) => (
                        <div key={team.data.teamName} className="pg-game-over-team-ctn pg-winner-ctn">
                            <h2>{index + 1} - {team.data.teamName}</h2>
                            <h3>SCORE: {team.data.points}</h3>
                        </div>
                    ))}
                </div>
                <PGButton 
                    className="pg-replay-btn"
                    buttonName="Play Again"
                    onClick={() => {
                        AppManager.resetTeamPoints();
                        PGSceneManager.goToScene("pg-game");
                    }}
                />
            </section>
        );
    }
}