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

                <section id="pg-game" style={{display: 'none'}}>
                    <div className="header-ctn"></div>
                    <div className="sub-header-ctn"></div>
                    <PGButtonCircle buttonName="Yes" className="game-btn yes-btn" />
                    <PGButtonCircle buttonName="No" className="game-btn no-btn" />
                    <div className="password-holder"></div>
                </section>
            </section>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('pg-app')
);

