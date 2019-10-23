class AppManager
{
    static gameTeams = [];

    /**
     * Registers a PGTeam into the static AppManager.gameTeams array
     * @param {*} team - the PGTeam to register
     */
    static registerTeam(team)
    {
        this.gameTeams.push(team);
    }
}

class App extends React.Component
{
    render()
    {
        return (
            <section className="main-section">
                <section id="pg-menu">
                    <h1 className="main-title">PASSWORD</h1>

                    <PGButton 
                        buttonName="Play" 
                        className="play-btn"
                        onClick={() => {
                            // Need to replace this with CSS / Less when implemented
                            document.getElementById('pg-menu').style.display = 'none';
                            document.getElementById('pg-team-setup').style.display = 'block';
                        }} 
                    />
                    <PGButton buttonName="Rules" className="rules-btn" />
                    <PGButton buttonName="Credits" className="credits-btn" />
                </section>

                <section id="pg-team-setup" style={{display: 'none'}}>
                    <div className="team-one-setup-ctn">
                        <PGTeamSetup teamName="TEAM ONE" />
                    </div>
                    <div className="team-two-setup-ctn">
                        <PGTeamSetup teamName="TEAM TWO" />
                    </div>

                    <PGButton 
                        buttonName="Start" 
                        className="start-btn"
                        onClick = {() => {
                            // Need to replace with CSS / Less when implemeneted
                            document.getElementById('pg-team-setup').style.display = 'none';
                            document.getElementById('pg-game').style.display = 'block';
                        }} 
                    />
                </section>

                <PGGame />

                {/* <section id="pg-game-over" style={{display: 'none'}}>
                    <PGGameOver />
                </section> */}
            </section>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('pg-app')
);

